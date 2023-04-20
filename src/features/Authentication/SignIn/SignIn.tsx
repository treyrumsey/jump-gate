import React, { useEffect } from "react";

import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import ShortUniqueId from "short-unique-id";

import { auth, db } from "~/App";
import { useAuthContext } from "~/context/AuthProvider";

const GAME_ROOM_ID_GENERATOR = new ShortUniqueId({
  dictionary: "alphanum_upper",
  length: 6,
});

const getOrInitializeUserRoomId = async (user: User) => {
  if (user) {
    const userRoomIdPath = "users/" + user.uid + "/userRoomId";
    const snapshot = await get(ref(db, userRoomIdPath));
    if (snapshot.exists()) {
      return snapshot.val() as string;
    } else {
      const newUserRoomId = GAME_ROOM_ID_GENERATOR.randomUUID();
      console.log(newUserRoomId);
      await set(ref(db, userRoomIdPath), newUserRoomId);
      const roomsPath = "rooms/" + newUserRoomId;
      await set(ref(db, roomsPath), { ownerId: user.uid });
      return newUserRoomId;
    }
  }
};

const tryJoinRoom = async (user: User) => {
  if (user) {
    const currentlyJoinedRoomIdPath =
      "users/" + user.uid + "/currentlyJoinedRoomId";
    const snapshot = await get(ref(db, currentlyJoinedRoomIdPath));
    if (snapshot.exists()) {
      const roomsPath = "rooms/" + snapshot.val();
      const roomSnapshot = await get(ref(db, roomsPath));
      if (roomSnapshot.exists()) {
        return snapshot.val() as string;
      }
    }
    await set(ref(db, currentlyJoinedRoomIdPath), null);
    return undefined;
  }
};

const SignIn = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);
  const { setCurrentlyJoinedRoomId, setUserRoomId } = useAuthContext();

  useEffect(() => {
    if (user) {
      getOrInitializeUserRoomId(user).then((userRoomId) => {
        setUserRoomId(userRoomId);
      });
      tryJoinRoom(user).then((currentlyJoinedRoomId) => {
        setCurrentlyJoinedRoomId(currentlyJoinedRoomId);
      });
    }
  }, [user, setUserRoomId, setCurrentlyJoinedRoomId]);

  return (
    <Button
      leftIcon={<StarIcon />}
      onClick={() => (user ? undefined : signInWithGoogle())}
      size="sm"
    >
      Sign in with Google
    </Button>
  );
};

export default SignIn;
