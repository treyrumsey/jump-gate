import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";

const CharacterListener = () => {
  const formWatch = useWatch();

  useEffect(() => {
    if (formWatch)
      localStorage.setItem(formWatch.id, JSON.stringify(formWatch));
  }, [formWatch]);

  return <Box display="none"></Box>;
};

export default CharacterListener;
