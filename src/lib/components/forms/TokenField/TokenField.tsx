import {
  Avatar,
  AvatarGroup,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface TokenFieldProps {
  positiveName: string;
  negativeName: string;
  show?: boolean;
}

const TokenField = ({
  positiveName,
  negativeName,
  show = true,
}: TokenFieldProps) => {
  const tokenName = `tokens.${positiveName + negativeName}`;
  const { register, setValue } = useFormContext();
  const [tokenValue, setTokenValue] = useState(0);

  const gainPositiveToken = () => {
    if (tokenValue === 3) return;

    const value = tokenValue + 1;

    setTokenValue(value);
    setValue(tokenName, value);
  };

  const gainNegativeToken = () => {
    if (tokenValue === -3) return;

    const value = tokenValue - 1;
    setTokenValue(value);
    setValue(tokenName, value);
  };

  const spendToken = () => {
    if (tokenValue > 0) {
      const value = tokenValue - 1;

      setTokenValue(value);
      setValue(tokenName, value);
    }

    if (tokenValue < 0) {
      const value = tokenValue + 1;

      setTokenValue(value);
      setValue(tokenName, value);
    }
  };

  const renderPositiveTokens = () => {
    const tokenList = [];
    for (let i = tokenValue; i > 0; i--) {
      tokenList.push(
        <Avatar name={positiveName} key={`${positiveName}.${i}`} bg="#183E6F" />
      );
    }
    return tokenList;
  };

  const renderNegativeTokens = () => {
    const tokenList = [];
    for (let i = tokenValue; i < 0; i++) {
      tokenList.push(
        <Avatar name={negativeName} key={`${negativeName}.${i}`} bg="#6E120B" />
      );
    }
    return tokenList;
  };

  return (
    <FormControl className="msc-TokenField" display={show ? "grid" : "none"}>
      <Button
        className="msc-TokenField__button is-positive"
        title={`Gain ${positiveName} token`}
        aria-label={`Gain ${positiveName} token`}
        size="sm"
        onClick={gainPositiveToken}
      >
        {positiveName}
      </Button>
      <button
        className="msc-TokenField__tokens"
        disabled={tokenValue === 0}
        type="button"
        onClick={spendToken}
      >
        <AvatarGroup
          className="msc-TokenField__group is-positive"
          max={3}
          size="sm"
        >
          {renderPositiveTokens()}
        </AvatarGroup>
        <AvatarGroup
          className="msc-TokenField__group is-negative"
          max={3}
          size="sm"
        >
          {renderNegativeTokens()}
        </AvatarGroup>
      </button>
      <Button
        className="msc-TokenField__button is-negative"
        title={`Gain ${negativeName} token`}
        aria-label={`Gain ${negativeName} token`}
        size="sm"
        onClick={gainNegativeToken}
      >
        {negativeName}
      </Button>
      <Input id={tokenName} display="none" {...register(tokenName)} />
    </FormControl>
  );
};

export default TokenField;
