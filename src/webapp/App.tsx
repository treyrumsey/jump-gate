import * as React from "react";

import { ChakraProvider, useColorMode } from "@chakra-ui/react";

import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import MythicSpaceCharacters from "webapp/modules/MythicSpaceCharacters/MythicSpaceCharacters";
import { theme } from "theme";
import { useEffect } from "react";
import SignIn from "webapp/modules/SignIn/SignIn";

const firebaseConfig = {
  apiKey: "AIzaSyCy_9N-vn08k2ZmYolMdgmF_xwDPd1dqkU",
  authDomain: "mythic-space-characters.firebaseapp.com",
  projectId: "mythic-space-characters",
  storageBucket: "mythic-space-characters.appspot.com",
  messagingSenderId: "67611856867",
  appId: "1:67611856867:web:4f38e437075ea13f8f1ad6",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

function App() {
  const [user] = useAuthState(auth);
  console.log(user?.uid ?? "no user found");

  return (
    <ChakraProvider data-theme="dark" theme={theme}>
      <ForceDarkMode>
        <section>{user ? <MythicSpaceCharacters /> : <SignIn />}</section>
      </ForceDarkMode>
    </ChakraProvider>
  );
}

function ForceDarkMode(props: { children: JSX.Element }) {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (colorMode === "dark") return;
    toggleColorMode();
  }, [colorMode, toggleColorMode]);

  return props.children;
}

export default App;
