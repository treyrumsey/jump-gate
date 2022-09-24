import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface AspectFieldProps {
  key: number;
  aspect: string;
}

export const AspectField = ({ key, aspect }: AspectFieldProps) => {
  const { register, control } = useFormContext();

  return <Box py={1} className="msc-AspectField"></Box>;
};
