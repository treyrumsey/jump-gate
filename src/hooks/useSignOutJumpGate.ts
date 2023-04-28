import { useSignOut } from "react-firebase-hooks/auth";

import { auth } from "~/App";

export const useSignOutJumpGate = () => {
  const [signOut] = useSignOut(auth);

  const signOutJumpGate = async () => {
    await signOut();
  };

  return signOutJumpGate;
};
