import { Avatar, AvatarGroup, FormControl, Input } from "@chakra-ui/react";
import TokenFieldButton from "lib/components/forms/TokenField/TokenFieldButton/TokenFieldButton";
import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export enum TokenType {
  Positive = "Positive",
  Negative = "Negative",
}

interface UniqueTokenFieldProps {
  description: React.ReactNode;
  max: number;
  name: string;
  show?: boolean;
  tokenId: string;
  type: TokenType;
}

const UniqueTokenField = ({
  description,
  max,
  name,
  show,
  tokenId,
  type,
}: UniqueTokenFieldProps) => {
  const { register, setValue, getValues } = useFormContext();
  const [tokenValue, setTokenValue] = useState<number>(
    parseInt(getValues(tokenId)) ?? 0
  );

  const tokenWatch = useWatch({ name: tokenId });

  useEffect(() => {
    setTokenValue(tokenWatch);
  }, [tokenWatch]);

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
      width="auto"
    >
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
          spacing="-1.5rem"
        >
          {renderTokens()}
        </AvatarGroup>
      </button>
      <TokenFieldButton
        name={name}
        description={description}
        gainToken={gainToken}
        className={`jg-UniqueTokenField__button ${buttonClass}`}
      />
      <Input id={tokenId} display="none" {...register(tokenId)} />
    </FormControl>
  );
};

export default UniqueTokenField;
