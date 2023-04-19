import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "webapp/App";
import { useAuthContext } from "webapp/modules/context/AuthProvider";

export const useSignOutJumpGate = () => {
  const [signOut] = useSignOut(auth);
  const { setCurrentlyJoinedRoomId, setUserRoomId } = useAuthContext();

  const signOutJumpGate = async () => {
    await signOut();
    setCurrentlyJoinedRoomId(undefined);
    setUserRoomId(undefined);
  };

  return signOutJumpGate;
};
