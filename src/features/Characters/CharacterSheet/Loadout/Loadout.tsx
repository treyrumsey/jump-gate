import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";


import TagList from "~/components/forms/TagList/TagList";
import WeaponFieldGroup from "~/components/forms/WeaponFieldGroup/WeaponFieldGroup";
import LoadoutEditor from "~/features/Characters/CharacterSheet/Loadout/LoadoutEditor/LoadoutEditor";
import { LoadoutType } from "~/models/Loadout.model";

interface LoadoutProps {
  type: LoadoutType;
  show?: boolean;
}

const Loadout = ({ type, show }: LoadoutProps) => {
  const { fields: weapons } = useFieldArray({
    name: `loadouts.${type}.weapons`,
  });
  const { getValues } = useFormContext();

  const gearId = `loadouts.${type}.gear`;
  const hasGear = getValues(gearId)?.length > 0;

  const armorModsId = `loadouts.${type}.armorMods`;
  const hasArmorMods = getValues(armorModsId)?.length > 0;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      data-augmented-ui="tl-clip tr-round br-clip bl-round border"
      className="jg-Loadout augmented"
      display={show ? undefined : "none"}
    >
      <Card className="jg-Loadout__card">
        <CardHeader>
          <ButtonGroup
            className="jg-Loadout__edit-toggle-group"
            isAttached
            paddingInlineStart="32px"
          >
            <Text className="jg-Loadout__title" fontSize="lg">
              Loadout
            </Text>
            <IconButton
              icon={<EditIcon />}
              className="jg-Loadout__edit-toggle is-positive"
              onClick={onOpen}
              aria-label={`Edit ${type} Loadout`}
              size="sm"
            />
          </ButtonGroup>
        </CardHeader>
        <CardBody padding="0">
          <Stack width="100%" gap="0.875rem">
            {weapons.map((field, index) => (
              <WeaponFieldGroup
                key={field.id}
                index={index}
                loadoutType={type}
              />
            ))}
          </Stack>

          {(hasGear || hasArmorMods) && (
            <Stack spacing="2" direction="row">
              {hasArmorMods && (
                <TagList
                  colorScheme="telegram"
                  isEditing={isOpen}
                  listId={armorModsId}
                  listName="Armor Mods"
                />
              )}

              {hasGear && (
                <TagList
                  colorScheme="green"
                  isEditing={isOpen}
                  listId={gearId}
                  listName="Gear"
                />
              )}
            </Stack>
          )}
        </CardBody>
      </Card>
      <LoadoutEditor isOpen={isOpen} onClose={onClose} type={type} />
    </Box>
  );
};

export default Loadout;
