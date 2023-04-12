import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

const defaultMaximums = new Map([
  [
    1,
    {
      casual: {
        shields: 4,
        armor: 2,
      },
      combat: {
        shields: 8,
        armor: 4,
      },
    },
  ],
  [
    2,
    {
      casual: {
        shields: 5,
        armor: 3,
      },
      combat: {
        shields: 10,
        armor: 6,
      },
    },
  ],
  [
    3,
    {
      casual: {
        shields: 6,
        armor: 4,
      },
      combat: {
        shields: 12,
        armor: 8,
      },
    },
  ],
]);

const Options = () => {
  const { control, getValues, setValue } = useFormContext();

  const armoryTier = useWatch({
    name: "tiers.armory",
    defaultValue: 1,
  });
  const armoryTierValue = parseInt(armoryTier, 10);

  useEffect(() => {
    setValue(
      "status.casual.shields.max",
      defaultMaximums.get(armoryTierValue)?.casual.shields
    );
    setValue(
      "status.casual.armor.max",
      defaultMaximums.get(armoryTierValue)?.casual.armor
    );
    setValue(
      "status.combat.shields.max",
      defaultMaximums.get(armoryTierValue)?.combat.shields
    );
    setValue(
      "status.combat.armor.max",
      defaultMaximums.get(armoryTierValue)?.combat.armor
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [armoryTierValue]);

  const statuses = ["casual.mp", "combat.mp", "stress", "supplies"];

  const renderMaxField = (status: string) => {
    return (
      <FormControl
        className="jg-CharacterModal__max-status"
        key={status}
        variant="floating"
        width="12rem"
      >
        <NumberField
          id={`status.${status}.max`}
          name={`status.${status}.max`}
          rules={{ min: 0 }}
          defaultValue={getValues(`status.${status}.max`)}
          control={control}
          size="lg"
        />
        <FormLabel
          htmlFor={`status.${status}.max`}
          textTransform="capitalize"
        >{`Max ${status.replace(".", " ").replace(" mp", " MP")}`}</FormLabel>
      </FormControl>
    );
  };

  return (
    <Box>
      <FormControl variant="floating">
        <NumberField
          id="tiers.armory"
          name="tiers.armory"
          defaultValue={1}
          rules={{ min: 1, max: 3 }}
          control={control}
        />
        <FormLabel htmlFor="tiers.armory">Armory Tier</FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <NumberField
          id="tiers.arsenal"
          name="tiers.arsenal"
          defaultValue={1}
          rules={{ min: 1, max: 3 }}
          control={control}
        />
        <FormLabel htmlFor="tiers.arsenal">Armory Tier</FormLabel>
      </FormControl>
      <Box display="flex" gap="1rem" flexWrap="wrap" justifyContent="center">
        {statuses.map((status) => renderMaxField(status))}
      </Box>
    </Box>
  );
};

export default Options;
