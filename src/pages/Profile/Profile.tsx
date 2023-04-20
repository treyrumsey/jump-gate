import React from "react";

import { HStack, Box, Avatar, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "~/App";
import SignIn from "~/features/Authentication/SignIn/SignIn";

const Profile = () => {
  const [user] = useAuthState(auth);

  const photoURL = user?.photoURL ?? undefined;

  return (
    <Box className="jg-Profile" display="flex" flexDirection="column" gap="2">
      {user && (
        <HStack spacing="4">
          <Avatar referrerPolicy="origin" src={photoURL} />
          <Text size="lg">{user.email ?? "Anonymous User"}</Text>
        </HStack>
      )}
      <SignIn />
    </Box>
  );
};

export default Profile;
