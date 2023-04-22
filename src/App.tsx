import * as React from "react";
import { RouterProvider } from "react-router-dom";

import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { useRegisterSW } from "virtual:pwa-register/react";

import SafariUnsupportedAlert from "~/components/ui/SafariUnsupportedAlert/SafariUnsupportedAlert";
import { initializeMetaTags } from "~/lib/utilities/MetaTagUtilites";
import getAppRouter from "~/pages/AppRouter";
import { theme } from "~/theme";

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
export const db = getDatabase(firebaseApp);

function App() {
  useRegisterSW();

  React.useEffect(() => {
    initializeMetaTags();
  }, []);

  const iOSCanInstall =
    "standalone" in window.navigator && window.navigator.standalone === false;

  return (
    <ChakraProvider data-theme="dark" theme={theme}>
      <ForceDarkMode>
        <>
          {iOSCanInstall ? (
            <SafariUnsupportedAlert />
          ) : (
            <RouterProvider router={getAppRouter()} />
          )}
        </>
      </ForceDarkMode>
    </ChakraProvider>
  );
}

function ForceDarkMode(props: { children: JSX.Element }) {
  const { colorMode, toggleColorMode } = useColorMode();

  React.useEffect(() => {
    if (colorMode === "dark") return;
    toggleColorMode();
  }, [colorMode, toggleColorMode]);

  return props.children;
}

export default App;
