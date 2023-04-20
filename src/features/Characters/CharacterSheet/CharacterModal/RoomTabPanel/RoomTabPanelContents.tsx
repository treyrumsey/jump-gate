import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button, VStack } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "~/App";
import { useAuthContext } from "~/context/AuthProvider";
import SignIn from "~/features/Authentication/SignIn/SignIn";

const RoomTab = () => {
  const [user] = useAuthState(auth);
  const { getValues, setValue } = useFormContext();
  const { currentlyJoinedRoomId } = useAuthContext();

  const navigate = useNavigate();

  const watchIsJoined: boolean = useWatch({
    name: "isJoined",
    defaultValue: getValues("isJoined"),
  });

  const handleToggleJoined = () => {
    setValue("isJoined", !watchIsJoined);
  };

  if (!user) return <SignIn />;

  return (
    <VStack>
      {currentlyJoinedRoomId ? (
        <Button onClick={handleToggleJoined}>
          {watchIsJoined
            ? `Add to room ${currentlyJoinedRoomId}`
            : `Remove from room ${currentlyJoinedRoomId}`}
        </Button>
      ) : (
        <Button onClick={() => navigate("/profile")}>Join Room</Button>
      )}
    </VStack>
  );
};

export default RoomTab;
