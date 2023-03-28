import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useWeaponEditorContext } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/Loadout/LoadoutEditor/WeaponEditor/WeaponEditorProvider";

const TraitEditor = () => {
  const { weaponId } = useWeaponEditorContext();
  const { register, setValue } = useFormContext();

  const traitId = `${weaponId}.trait`;
  const nameId = `${traitId}.name`;
  const descriptionId = `${traitId}.description`;

  const traitWatch = useWatch({ name: traitId });

  return traitWatch === undefined ? (
    <Button
      leftIcon={<AddIcon />}
      onClick={() => setValue(nameId, undefined)}
      size="xs"
    >
      Add Trait
    </Button>
  ) : (
    <Stack direction="column" spacing="3" className="msc-WeaponEditor__trait">
      <Heading
        size="sm"
        fontFamily="Oxanium"
        marginRight="auto"
        marginBottom="1"
      >
        Trait
      </Heading>
      <InputGroup size="sm">
        <FormControl
          variant="floating"
          className="msc-WeaponEditor__name-form-control"
        >
          <Input
            id={nameId}
            placeholder="Trait"
            size="sm"
            {...register(nameId)}
          />
          <FormLabel htmlFor={nameId}>Trait</FormLabel>
          <InputRightElement>
            <IconButton
              className="msc-WeaponEditor__delete-button"
              icon={<DeleteIcon />}
              title={"Delete trait"}
              aria-label={"Delete trait"}
              onClick={() => {
                setValue(nameId, undefined);
                setValue(descriptionId, undefined);
                setValue(traitId, undefined);
              }}
              size="sm"
            />
          </InputRightElement>
        </FormControl>
      </InputGroup>

      <Textarea
        id={descriptionId}
        placeholder="Description"
        rows={3}
        size="sm"
        {...register(descriptionId)}
      />
    </Stack>
  );
};

export default TraitEditor;
