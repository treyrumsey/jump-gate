import React, { createContext, useContext, useEffect, useState } from "react";

import { User } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import ShortUniqueId from "short-unique-id";

import { auth, db } from "~/App";

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

type AuthContextType = {
  currentlyJoinedRoomId?: string;
  userRoomId?: string;
  setCurrentlyJoinedRoomId: (currentlyJoinedRoomId?: string) => void;
  setUserRoomId: (userRoomId?: string) => void;
};

const AuthContext = createContext<AuthContextType>({
  currentlyJoinedRoomId: undefined,
  userRoomId: undefined,
  setCurrentlyJoinedRoomId: () => null,
  setUserRoomId: () => null,
});

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentlyJoinedRoomId, setCurrentlyJoinedRoomId] = useState<
    string | undefined
  >();
  const [userRoomId, setUserRoomId] = useState<string | undefined>();

  const [user] = useAuthState(auth);

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
    <AuthContext.Provider
      value={{
        currentlyJoinedRoomId,
        setCurrentlyJoinedRoomId,
        userRoomId,
        setUserRoomId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export default AuthProvider;
