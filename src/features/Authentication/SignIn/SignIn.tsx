import React from "react";

import { StarIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";

import { auth } from "~/App";

const SignIn = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

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
