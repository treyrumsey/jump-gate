import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "webapp/App";

const SignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <>
      <button onClick={() => signInWithGoogle()}>Sign in with Google</button>
    </>
  );
};

export default SignIn;
