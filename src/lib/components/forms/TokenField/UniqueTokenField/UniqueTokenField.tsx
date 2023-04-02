import {
  Avatar,
  AvatarGroup,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export enum TokenType {
  Positive = "Positive",
  Negative = "Negative",
}

interface UniqueTokenFieldProps {
  max: number;
  name: string;
  show?: boolean;
  tokenId: string;
  type: TokenType;
}

const UniqueTokenField = ({
  max,
  name,
  show,
  tokenId,
  type,
}: UniqueTokenFieldProps) => {
  const { register, setValue, getValues } = useFormContext();
  const [tokenValue, setTokenValue] = useState<number>(getValues(tokenId) ?? 0);

  const gainToken = () => {
    if (tokenValue === max) return;

    const value = tokenValue + 1;

    setTokenValue(value);
    setValue(tokenId, value);
  };

  const spendToken = () => {
    if (tokenValue === 0) return;

    const value = tokenValue - 1;

    setTokenValue(value);
    setValue(tokenId, value);
  };

  const tokenColor = type === TokenType.Positive ? "#183E6F" : "#6E120B";

  const renderTokens = () => {
    const tokenList = [];
    for (let i = tokenValue; i > 0; i--) {
      tokenList.push(
        <Avatar name={name} key={`${name}.${i}`} bg={tokenColor} />
      );
    }
    return tokenList;
  };

  const buttonClass =
    type === TokenType.Positive ? "is-positive" : "is-negative";

  return (
    <FormControl
      className="jg-UniqueTokenField"
      display={show ? "grid" : "none"}
    >
      <Button
        aria-label={`Gain ${name} token`}
        className={`jg-UniqueTokenField__button ${buttonClass}`}
        size="sm"
        title={`Gain ${name} token`}
        onClick={gainToken}
      >
        {name}
      </Button>
      <button
        className="jg-UniqueTokenField__tokens"
        disabled={tokenValue === 0}
        type="button"
        onClick={spendToken}
      >
        <AvatarGroup
          className={`jg-UniqueTokenField__group ${buttonClass}`}
          max={max}
          size="sm"
        >
          {renderTokens()}
        </AvatarGroup>
      </button>
      <Input id={tokenId} display="none" {...register(tokenId)} />
    </FormControl>
  );
};

export default UniqueTokenField;
