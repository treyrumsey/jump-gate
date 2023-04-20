import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Text } from "@chakra-ui/react";
import {
  useAuthState,
  useSignInWithGoogle,
  useSignOut,
} from "react-firebase-hooks/auth";

import { auth } from "~/App";
import CustomIcon, { CustomIcons } from "~/components/icons/CustomIcon";

const Home = () => {
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const navigate = useNavigate();

  const navigateToAuthenticatedRoute = async (route: string) => {
    if (!user) {
      const credentials = await signInWithGoogle();
      if (!credentials) return;
    }
    navigate(route);
  };

  const buttonTextStyles = {
    fontSize: "xl",
    fontFamily: "Oxanium",
    marginTop: "0.5rem",
  };

  const buttonStyles = {
    className: "jg-Home__button augmented",
    "data-augmented-ui": "tl-clip tr-round br-clip bl-round",
    height: "100%",
    display: "block",
  };

  return (
    <Box className="jg-Home">
      <Button {...buttonStyles} onClick={() => navigate("/characters")}>
        <CustomIcon
          icon={CustomIcons.Characters}
          fill="rgba(255, 255, 255, 0.9)"
          size="96px"
        />
        <Text {...buttonTextStyles}>Characters</Text>
      </Button>
      <Button
        {...buttonStyles}
        onClick={() => navigateToAuthenticatedRoute("/room")}
      >
        <CustomIcon
          icon={CustomIcons.World}
          fill="rgba(255, 255, 255, 0.9)"
          size="96px"
        />
        <Text {...buttonTextStyles}>GM</Text>
      </Button>
      <Button
        {...buttonStyles}
        onClick={() => navigateToAuthenticatedRoute("/profile")}
      >
        <CustomIcon
          icon={CustomIcons.Profile}
          fill="rgba(255, 255, 255, 0.9)"
          size="96px"
        />
        <Text {...buttonTextStyles}>Profile</Text>
      </Button>
      {user && <Button onClick={() => signOut()}>Sign Out</Button>}
    </Box>
  );
};

export default Home;
