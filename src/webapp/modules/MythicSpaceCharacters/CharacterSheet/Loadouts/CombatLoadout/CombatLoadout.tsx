import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import GearFieldGroup from "lib/components/forms/GearFieldGroup/GearFieldGroup";
import WeaponFieldGroup from "lib/components/forms/WeaponFieldGroup/WeaponFieldGroup";
import { LoadoutType } from "models/Loadout.model";
import React from "react";
import { useCharacterSheetViewContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheetViewContext";
import LoadoutEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadouts/LoadoutEditor/LoadoutEditor";

const CombatLoadout = () => {
  const { isCombatView } = useCharacterSheetViewContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      className={"msc-CombatLoadout"}
      display={isCombatView ? undefined : "none"}
    >
      <Card className="msc-CombatLoadout__card">
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
              className="msc-Loadout__edit-toggl is-positive"
              onClick={onOpen}
              aria-label={`Edit Combat Loadout`}
              size="sm"
            />
          </ButtonGroup>
        </CardHeader>
        <CardBody>
          <WeaponFieldGroup
            label="Primary Weapon"
            index={0}
            loadoutType={LoadoutType.Combat}
          />
          <WeaponFieldGroup
            label="Secondary Weapon"
            index={1}
            loadoutType={LoadoutType.Combat}
          />
          {/* <GearFieldGroup
            index={0}
            label="Gear Slot 1"
            loadoutType={LoadoutType.Combat}
          />
          <GearFieldGroup
            index={1}
            label="Gear Slot 2"
            loadoutType={LoadoutType.Combat}
          /> */}
        </CardBody>
      </Card>
      <LoadoutEditor
        isOpen={isOpen}
        onClose={onClose}
        type={LoadoutType.Combat}
      />
    </Box>
  );
};

export default CombatLoadout;
