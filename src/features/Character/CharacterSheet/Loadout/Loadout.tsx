import React from "react";
import { useFormContext } from "react-hook-form";

import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import TagList from "~/components/forms/TagList/TagList";
import LoadoutEditor from "~/features/Character/CharacterSheet/Loadout/LoadoutEditor/LoadoutEditor";
import Weapons from "~/features/Character/CharacterSheet/Loadout/Weapons/Weapons";
import { LoadoutType } from "~/models/Loadout.model";

interface LoadoutProps {
  type: LoadoutType;
  show?: boolean;
}

const Loadout = ({ type, show }: LoadoutProps) => {
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
          {isOpen ? <Skeleton height="6rem" /> : <Weapons type={type} />}

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
