import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { FacetType } from "models/Facet.model";
import React, { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface UpgradesProps {
  nestIndex: number;
  type: FacetType;
  isEditing: boolean;
}

export const Upgrades = ({ nestIndex, type, isEditing }: UpgradesProps) => {
  const { control, register, watch } = useFormContext();

  const fieldArrayName = `${type}s[${nestIndex}].upgrades`;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  const getFieldPath = (index: number, field: string) =>
    `${fieldArrayName}[${index}].${field}`;

  const facetName = watch(`${type}s[${nestIndex}].${type}`);
  return (
    <>
      {fields.map((field, index) => {
        return (
          <Fragment key={`${getFieldPath(index, field.id)}`}>
            <div className="msc-divider" />
            <div className="msc-UpgradeField">
              <FormControl
                variant="floating"
                className="msc-UpgradeField__name-form-control"
              >
                <InputGroup>
                  <Input
                    id={getFieldPath(index, "upgrade")}
                    placeholder="Upgrade"
                    {...register(getFieldPath(index, "upgrade"))}
                  />
                  <FormLabel htmlFor={getFieldPath(index, "upgrade")}>
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
          </Fragment>
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
            facetName?.length > 0 ? facetName : `${type} ${nestIndex + 1}`
          }`}
          {/* Upgrade */}
        </Button>
      )}
    </>
  );
};
