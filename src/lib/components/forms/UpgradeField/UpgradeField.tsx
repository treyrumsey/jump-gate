import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export enum UpgradeType {
  Aspects = "aspects",
  Tactics = "tactics",
}

interface UpgradeFieldProps {
  nestIndex: number;
  type: UpgradeType;
}

export const UpgradeField = ({ nestIndex, type }: UpgradeFieldProps) => {
  const { control, register } = useFormContext();

  const fieldArrayName = `${type.toString()}[${nestIndex}].upgrades`;
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  return (
    <Box py={1} className="msc-UpgradeField">
      <ul className="msc-UpgradeField__upgrades">
        {fields.map((field, index) => {
          return (
            <li key={field.id}>
              <FormControl variant="floating">
                <Input
                  id={`${fieldArrayName}[${index}].upgrade`}
                  placeholder="Upgrade"
                  {...register(`${fieldArrayName}[${index}].upgrade`)}
                />
                <FormLabel htmlFor={`${fieldArrayName}[${index}].upgrade`}>
                  Upgrade
                </FormLabel>
              </FormControl>
              <Textarea
                id={`${fieldArrayName}[${index}].description`}
                placeholder="Description"
                {...register(`${fieldArrayName}[${index}].description`)}
              />
              <IconButton
                icon={<DeleteIcon />}
                title={"Delete upgrade"}
                aria-label={"Delete upgrade"}
                onClick={() => remove(index)}
              />
            </li>
          );
        })}
      </ul>
      <IconButton
        icon={<AddIcon />}
        title={`Add upgrade to Aspect ${nestIndex + 1}`}
        aria-label={`Add upgrade to Aspect ${nestIndex + 1}`}
        onClick={() => {
          append({ upgrade: "", description: "" });
        }}
      />
    </Box>
  );
};
