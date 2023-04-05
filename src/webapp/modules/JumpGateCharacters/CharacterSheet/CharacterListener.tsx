import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";

const CharacterListener = () => {
  const formWatch = useWatch();

  useEffect(() => {
    localStorage.setItem("character", JSON.stringify(formWatch));
  }, [formWatch]);

  return <Box display="none"></Box>;
};

export default CharacterListener;
