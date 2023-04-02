import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FacetType } from "models/Facet.model";
import React, { Fragment } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import UpgradeEditor from "webapp/modules/JumpGateCharacters/CharacterSheet/Facets/Upgrades/UpgradeEditor/UpgradeEditor";
import UpgradeViewer from "webapp/modules/JumpGateCharacters/CharacterSheet/Facets/Upgrades/UpgradeViewer/UpgradeViewer";

interface UpgradesProps {
  facetIndex: number;
  isEditing: boolean;
  type: FacetType;
}

export const Upgrades = ({ facetIndex, type, isEditing }: UpgradesProps) => {
  const { control } = useFormContext();
  const facetName = useWatch({
    control,
    name: `${type}s[${facetIndex}].name`,
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
        const upgradeNameId = buildFieldId(index, "upgrade");
        const descriptionId = buildFieldId(index, "description");
        return (
          <Fragment key={`${buildFieldId(index, field.id)}`}>
            <div className="jg-divider" />
            <UpgradeEditor
              upgradeNameId={upgradeNameId}
              descriptionId={descriptionId}
              isEditing={isEditing}
              onDelete={() => remove(index)}
            />
            {!isEditing && (
              <UpgradeViewer
                upgradeNameId={upgradeNameId}
                descriptionId={descriptionId}
              />
            )}
          </Fragment>
        );
      })}
      {isEditing && (
        <Button
          className={"jg-UpgradeField__add-upgrade is-positive"}
          leftIcon={<AddIcon />}
          my="7px"
          size="sm"
          onClick={() => {
            append({ upgrade: "", description: "" });
          }}
        >
          {`Upgrade ${facetName}`}
        </Button>
      )}
    </>
  );
};
