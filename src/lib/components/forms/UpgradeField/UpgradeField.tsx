import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
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
  isEditing: boolean;
}

export const UpgradeField = ({
  nestIndex,
  type,
  isEditing,
}: UpgradeFieldProps) => {
  const { control, register, watch } = useFormContext();

  const upgradeParentName = watch(
    `${type.toString()}[${nestIndex}].${type
      .toString()
      .substring(0, type.length - 1)}`
  );
  const fieldArrayName = `${type.toString()}[${nestIndex}].upgrades`;
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });
  return (
    <>
      {fields.map((field, index) => {
        return (
          <>
            <div className="msc-divider" key={`${field.id}-divider`}></div>
            <div className="msc-UpgradeField" key={field.id}>
              <FormControl
                variant="floating"
                className="msc-UpgradeField__name-form-control"
              >
                <InputGroup>
                  <Input
                    id={`${fieldArrayName}[${index}].upgrade`}
                    placeholder="Upgrade"
                    {...register(`${fieldArrayName}[${index}].upgrade`)}
                  />
                  <FormLabel htmlFor={`${fieldArrayName}[${index}].upgrade`}>
                    Upgrade
                  </FormLabel>
                  {isEditing && (
                    <InputRightElement>
                      <IconButton
                        className="msc-UpgradeField__delete-button"
                        icon={<DeleteIcon />}
                        title={"Delete upgrade"}
                        aria-label={"Delete upgrade"}
                        onClick={() => remove(index)}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
              </FormControl>
              <Textarea
                id={`${fieldArrayName}[${index}].description`}
                placeholder="Description"
                {...register(`${fieldArrayName}[${index}].description`)}
              />
            </div>
          </>
        );
      })}
      {isEditing && (
        <Button
          className={"msc-UpgradeField__add-upgrade is-positive"}
          leftIcon={<AddIcon />}
          my="7px"
          size="sm"
          onClick={() => {
            append({ upgrade: "", description: "" });
          }}
        >
          {`Upgrade ${
            upgradeParentName.length > 0
              ? upgradeParentName
              : `Aspect ${nestIndex + 1}`
          }`}
        </Button>
      )}
    </>
  );
};
