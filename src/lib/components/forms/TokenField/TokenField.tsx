import { Avatar, AvatarGroup, FormControl, Input } from "@chakra-ui/react";
import TokenFieldButton from "lib/components/forms/TokenField/TokenFieldButton/TokenFieldButton";
import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface TokenFieldProps {
  isUncapped?: boolean;
  positiveName: string;
  positiveDescription: React.ReactNode;
  negativeName: string;
  negativeDescription: React.ReactNode;
  show?: boolean;
}

const TokenField = ({
  isUncapped,
  positiveName,
  positiveDescription,
  negativeName,
  negativeDescription,
  show = true,
}: TokenFieldProps) => {
  const tokenName = `tokens.${positiveName + negativeName}`;
  const { register, setValue, getValues } = useFormContext();
  const [tokenValue, setTokenValue] = useState<number>(
    getValues(tokenName) ?? 0
  );

  const max = isUncapped ? 30 : 3;
  const min = isUncapped ? -30 : -3;

  const tokenWatch = useWatch({ name: tokenName });

  useEffect(() => {
    setTokenValue(tokenWatch);
  }, [tokenWatch]);

  const gainPositiveToken = () => {
    if (tokenValue === max) return;

    const value = tokenValue + 1;

    setTokenValue(value);
    setValue(tokenName, value);
  };

  const gainNegativeToken = () => {
    if (tokenValue === min) return;

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
      const name = isUncapped ? tokenValue.toString() : positiveName;
      tokenList.push(
        <Avatar
          key={`${positiveName}.${i}`}
          bg="#183E6F"
          getInitials={isUncapped ? (name) => name : undefined}
          name={name}
        />
      );
    }
    return tokenList;
  };

  const renderNegativeTokens = () => {
    const tokenList = [];
    for (let i = tokenValue; i < 0; i++) {
      const name = isUncapped ? Math.abs(tokenValue).toString() : negativeName;
      tokenList.push(
        <Avatar
          key={`${negativeName}.${i}`}
          bg="#6E120B"
          getInitials={isUncapped ? (name) => name : undefined}
          name={name}
        />
      );
    }
    return tokenList;
  };

  return (
    <FormControl className="jg-TokenField" display={show ? "grid" : "none"}>
      <TokenFieldButton
        className="jg-TokenField__button is-positive"
        name={positiveName}
        description={positiveDescription}
        gainToken={gainPositiveToken}
      />
      <button
        className="jg-TokenField__tokens"
        disabled={tokenValue === 0}
        type="button"
        onClick={spendToken}
      >
        <AvatarGroup
          className="jg-TokenField__group is-positive"
          max={3}
          size="sm"
          spacing="-1.5rem"
        >
          {renderPositiveTokens()}
        </AvatarGroup>
        <AvatarGroup
          className="jg-TokenField__group is-negative"
          max={3}
          size="sm"
          spacing="-1.5rem"
        >
          {renderNegativeTokens()}
        </AvatarGroup>
      </button>
      <TokenFieldButton
        className="jg-TokenField__button is-negative"
        name={negativeName}
        description={negativeDescription}
        gainToken={gainNegativeToken}
      />
      <Input id={tokenName} display="none" {...register(tokenName)} />
    </FormControl>
  );
};

export default TokenField;
