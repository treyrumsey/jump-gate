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
import WeaponFieldGroup from "lib/components/forms/WeaponFieldGroup/WeaponFieldGroup";
import { getWeaponLabel } from "lib/utilities/WeaponUtilities";
import { LoadoutType } from "models/Loadout.model";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import LoadoutEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/LoadoutEditor";

interface LoadoutProps {
  type: LoadoutType;
  show?: boolean;
}

const Loadout = ({ type, show }: LoadoutProps) => {
  const { control } = useFormContext();
  const { fields: weaponFields } = useFieldArray({
    control,
    name: `loadouts.${type}.weapons`,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.table(weaponFields);

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
              className="msc-Loadout__edit-toggl is-positive"
              onClick={onOpen}
              aria-label={`Edit Combat Loadout`}
              size="sm"
            />
          </ButtonGroup>
        </CardHeader>
        <CardBody padding="0">
          {weaponFields.map((field, index) => (
            <WeaponFieldGroup key={field.id} index={index} loadoutType={type} />
          ))}
          {/* <WeaponFieldGroup
            label="Primary Weapon"
            index={0}
            loadoutType={LoadoutType.Combat}
          />
          <WeaponFieldGroup
            label="Secondary Weapon"
            index={1}
            loadoutType={LoadoutType.Combat}
          /> */}
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

export default Loadout;
