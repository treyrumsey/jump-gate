import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import { Blue, Red } from "lib/components/typography/MarkdownColorOverrides";
import Markdown from "markdown-to-jsx";
import { FacetType } from "models/Facet.model";
import React, { Fragment } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";

interface UpgradeProps {
  buildFieldId: (fieldName: string) => string;
  isEditing: boolean;
  onDelete: () => void;
}

const Upgrade = ({ buildFieldId, isEditing, onDelete }: UpgradeProps) => {
  const { getValues, register } = useFormContext();

  const upgradeId = buildFieldId("upgrade");
  const descriptionId = buildFieldId("description");

  const upgrade = getValues(upgradeId);
  const description = getValues(descriptionId);

  return (
    <>
      <Box
        className="msc-UpgradeField"
        display={isEditing ? undefined : "none"}
      >
        <FormControl
          variant="floating"
          className="msc-UpgradeField__name-form-control"
        >
          <InputGroup>
            <Input
              id={upgradeId}
              placeholder="Upgrade"
              {...register(upgradeId)}
            />
            <FormLabel htmlFor={upgradeId}>Upgrade</FormLabel>
            {isEditing && (
              <InputRightElement>
                <IconButton
                  className="msc-UpgradeField__delete-button"
                  icon={<DeleteIcon />}
                  title={"Delete upgrade"}
                  aria-label={"Delete upgrade"}
                  onClick={onDelete}
                />
              </InputRightElement>
            )}
          </InputGroup>
        </FormControl>
        <Textarea
          id={descriptionId}
          placeholder="Description"
          {...register(descriptionId)}
        />
      </Box>
      {!isEditing && (
        <div className="msc-UpgradeField">
          <Heading size="sm">{upgrade}</Heading>
          <Markdown
            options={{
              wrapper: "section",
              forceWrapper: true,
              overrides: {
                Red: {
                  component: Red,
                },
                Blue: {
                  component: Blue,
                },
              },
            }}
          >
            {description}
          </Markdown>
        </div>
      )}
    </>
  );
};
interface UpgradesProps {
  facetIndex: number;
  isEditing: boolean;
  type: FacetType;
}

export const Upgrades = ({ facetIndex, type, isEditing }: UpgradesProps) => {
  const { control } = useFormContext();
  const facetName = useWatch({
    control,
    name: `${type}s[${facetIndex}].${type}`,
    defaultValue: `${type} ${facetIndex + 1}`,
  });

  const fieldArrayName = `${type}s[${facetIndex}].upgrades`;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  const buildFieldId = (index: number, field: string) =>
    `${fieldArrayName}[${index}].${field}`;

  return (
    <>
      {fields.map((field, index) => {
        return (
          <Fragment key={`${buildFieldId(index, field.id)}`}>
            <div className="msc-divider" />
            <Upgrade
              buildFieldId={(fieldName: string) =>
                buildFieldId(index, fieldName)
              }
              isEditing={isEditing}
              onDelete={() => remove(index)}
            />
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
          {/* {`Upgrade ${
            facetName?.length > 0 ? facetName : `${type} ${nestIndex + 1}`
          }`} */}
          {`Upgrade ${facetName}`}
          {/* Upgrade */}
        </Button>
      )}
    </>
  );
};
