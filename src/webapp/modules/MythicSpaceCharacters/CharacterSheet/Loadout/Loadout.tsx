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
import TagList from "lib/components/forms/TagList/TagList";
import WeaponFieldGroup from "lib/components/forms/WeaponFieldGroup/WeaponFieldGroup";
import { LoadoutType } from "models/Loadout.model";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import LoadoutEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/LoadoutEditor";

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
    <Box className={"msc-Loadout"} display={show ? undefined : "none"}>
      <Card className="msc-Loadout__card">
        <CardHeader>
          <ButtonGroup
            className="msc-Loadout__edit-toggle-group"
            isAttached
            paddingInlineStart="32px"
          >
            <Text className="msc-Loadout__title" fontSize="lg">
              Loadout
            </Text>
            <IconButton
              icon={<EditIcon />}
              className="msc-Loadout__edit-toggle is-positive"
              onClick={onOpen}
              aria-label={`Edit Combat Loadout`}
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
                  isEditing={isOpen}
                  listId={armorModsId}
                  listName="Armor Mods"
                />
              )}

              {hasGear && (
                <TagList isEditing={isOpen} listId={gearId} listName="Gear" />
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
