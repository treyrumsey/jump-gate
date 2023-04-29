import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Grid,
  Heading,
  Text,
  UseToastOptions,
  useToast,
} from "@chakra-ui/react";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";

import { auth } from "~/App";
import CustomIcon, { CustomIcons } from "~/components/icons/CustomIcon";

const authenticationErrorToastOptions: UseToastOptions = {
  title: "Authentication Error",
  description:
    "Something went wrong while authenticating with Google. Please try again.",
  status: "error",
  duration: 5000,
  isClosable: true,
};

const authenticationSuccessToastOptions: UseToastOptions = {
  title: "Signed in",
  description: "You have been successfully signed in to Jump Gate.",
  status: "success",
  duration: 5000,
  isClosable: true,
};

const Home = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const toast = useToast();

  const navigateToAuthenticatedRoute = async (route: string) => {
    if (!user) {
      const credentials = await signInWithGoogle();
      if (!credentials) {
        toast(authenticationErrorToastOptions);
        return;
      } else toast(authenticationSuccessToastOptions);
    }
    navigate(route);
  };

  const handleSignIn = () => {
    if (user) return;
    signInWithGoogle().then((credentials) =>
      toast(
        credentials
          ? authenticationSuccessToastOptions
          : authenticationErrorToastOptions
      )
    );
  };

  const handleSignOut = () => {
    if (!user) return;
    signOut().then((success) =>
      toast(
        success
          ? {
              title: "Signed out",
              description:
                "You have been successfully signed out from Jump Gate.",
              status: "success",
              duration: 5000,
              isClosable: true,
            }
          : {
              title: "Error",
              description:
                "Something went wrong while signing out from Jump Gate. Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
            }
      )
    );
  };

  const buttonTextStyles = {
    fontSize: "xl",
    fontFamily: "Oxanium",
    marginTop: "0.5rem",
  };

  const buttonStyles = {
    className: "jg-Home__button augmented",
    "data-augmented-ui": "tl-clip tr-round br-clip bl-round border",
    height: "100%",
    display: "block",
  };

  return (
    <Grid className="jg-Home" padding="1rem 0" position="relative">
      <Box justifySelf="center" textAlign="center" gridArea="header">
        <Heading
          fontFamily="Oxanium"
          fontSize="3rem"
          paddingBottom="1rem"
          lineHeight="1.2"
        >
          Jump Gate
        </Heading>
      </Box>
      <Button
        gridArea="characters"
        {...buttonStyles}
        onClick={() => navigate("/characters")}
      >
        <CustomIcon
          icon={CustomIcons.Characters}
          fill="rgba(255, 255, 255, 0.9)"
          size="96px"
        />
        <Text {...buttonTextStyles}>Characters</Text>
      </Button>
      <Button
        gridArea="games"
        {...buttonStyles}
        onClick={() => navigateToAuthenticatedRoute("/games")}
      >
        <CustomIcon
          icon={CustomIcons.World}
          fill="rgba(255, 255, 255, 0.9)"
          size="96px"
        />
        <Text {...buttonTextStyles}>Games</Text>
      </Button>
      <Button
        gridArea="auth"
        {...buttonStyles}
        onClick={() => (user ? handleSignOut() : handleSignIn())}
      >
        <CustomIcon
          icon={CustomIcons.Profile}
          fill="rgba(255, 255, 255, 0.9)"
          size="96px"
        />
        <Text {...buttonTextStyles}>{user ? "Sign Out" : "Sign In"}</Text>
      </Button>
      <Box justifySelf="center" textAlign="center" gridArea="footer">
        <Text paddingTop="1rem">
          A companion app for the Mythic Space
          <br /> tabletop role-playing game
        </Text>
        <br />
        <Text fontSize="xs">© 2023 Trey Rumsey</Text>
      </Box>
    </Grid>
  );
};

export default Home;
