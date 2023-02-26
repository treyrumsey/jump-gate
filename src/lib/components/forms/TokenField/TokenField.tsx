import { AddIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarGroup,
  Box,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface TokenFieldProps {
  positiveName: string;
  negativeName: string;
}

const TokenField = ({ positiveName, negativeName }: TokenFieldProps) => {
  const [value, setValue] = useState(0);

  const gainPositiveToken = () => {
    if (value === 3) return;

    setValue(value + 1);
  };

  const gainNegativeToken = () => {
    if (value === -3) return;

    setValue(value - 1);
  };

  const renderPositiveTokens = () => {
    const tokenList = [];
    for (let i = value; i > 0; i--) {
      tokenList.push(<Avatar name={positiveName} bg="#183E6F" />);
    }
    return tokenList;
  };

  const renderNegativeTokens = () => {
    const tokenList = [];
    for (let i = value; i < 0; i++) {
      tokenList.push(<Avatar name={negativeName} bg="#6E120B" />);
    }
    return tokenList;
  };

  return (
    <FormControl className="msc-TokenField">
      <Box className="msc-TokenField__positive-tokens">
        <FormLabel className="msc-TokenField__label is-positive">
          {positiveName}
        </FormLabel>
        <IconButton
          icon={<AddIcon />}
          title={`Gain ${positiveName} token`}
          aria-label={`Gain ${positiveName} token`}
          size="sm"
          onClick={gainPositiveToken}
        />
        <AvatarGroup max={3} size="sm" me={2}>
          {renderPositiveTokens()}
        </AvatarGroup>
      </Box>
      <Box className="msc-TokenField__negative-tokens">
        <AvatarGroup max={3} size="sm" ms={2}>
          {renderNegativeTokens()}
        </AvatarGroup>
        <IconButton
          icon={<AddIcon />}
          title={`Gain ${negativeName} token`}
          aria-label={`Gain ${negativeName} token`}
          size="sm"
          onClick={gainNegativeToken}
        />
        <FormLabel className="msc-TokenField__label is-negative">
          {negativeName}
        </FormLabel>
      </Box>
    </FormControl>
  );
};

export default TokenField;
