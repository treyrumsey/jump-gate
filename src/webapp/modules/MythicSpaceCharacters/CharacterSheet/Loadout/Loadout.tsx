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
import { LoadoutType } from "models/Loadout.model";
import React from "react";
import { useFieldArray } from "react-hook-form";
import LoadoutEditor from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/LoadoutEditor";

interface LoadoutProps {
  type: LoadoutType;
  show?: boolean;
}

const Loadout = ({ type, show }: LoadoutProps) => {
  const { fields: weapons } = useFieldArray({
    name: `loadouts.${type}.weapons`,
  });

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
          {weapons.map((field, index) => (
            <WeaponFieldGroup key={field.id} index={index} loadoutType={type} />
          ))}
        </CardBody>
      </Card>
      <LoadoutEditor isOpen={isOpen} onClose={onClose} type={type} />
    </Box>
  );
};

export default Loadout;
