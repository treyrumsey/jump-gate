import * as React from "react";
import { RouterProvider } from "react-router-dom";

import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { useRegisterSW } from "virtual:pwa-register/react";

import DisclosureProvider from "~/components/context/DisclosureProvider";
import SafariUnsupportedAlert from "~/components/ui/SafariUnsupportedAlert/SafariUnsupportedAlert";
import { initializeMetaTags } from "~/lib/utilities/MetaTagUtilites";
import getAppRouter from "~/pages/AppRouter";
import { theme } from "~/theme";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
            <DisclosureProvider>
              <RouterProvider router={getAppRouter()} />
            </DisclosureProvider>
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
