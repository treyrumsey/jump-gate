import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "webapp/App";
import SignIn from "webapp/modules/SignIn/SignIn";

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
