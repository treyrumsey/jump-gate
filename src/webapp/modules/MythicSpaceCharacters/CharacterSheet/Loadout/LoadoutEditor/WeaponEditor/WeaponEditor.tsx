import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import { WeaponModType } from "models/Weapon.model";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface ModEditorProps {
  modId: string;
  onDelete: () => void;
}

const ModEditor = ({ modId, onDelete }: ModEditorProps) => {
  const { register } = useFormContext();

  const nameId = `${modId}.name`;
  const typeId = `${modId}.type`;
  const descriptionId = `${modId}.description`;

  const typeOptions = Object.values(WeaponModType).map((value) => (
    <option key={value} value={value}>
      {value}
    </option>
  ));

  return (
    <Stack direction="column" spacing="3" className="msc-WeaponEditor__mod">
      <InputGroup size="sm">
        <FormControl
          variant="floating"
          className="msc-WeaponEditor__name-form-control"
        >
          <Input
            id={nameId}
            placeholder="Mod"
            size="sm"
            {...register(nameId)}
          />
          <FormLabel htmlFor={nameId}>Mod</FormLabel>
          <InputRightElement>
            <IconButton
              className="msc-WeaponEditor__delete-button"
              icon={<DeleteIcon />}
              title={"Delete mod"}
              aria-label={"Delete mod"}
              onClick={onDelete}
              size="sm"
            />
          </InputRightElement>
        </FormControl>
        <FormControl variant="floating">
          <Select id={typeId} placeholder=" " {...register(typeId)} size="sm">
            {typeOptions}
          </Select>
          <FormLabel htmlFor={typeId} size="sm">
            Type
          </FormLabel>
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

interface WeaponEditorProps {
  weaponId: string;
}

const WeaponEditor = ({ weaponId }: WeaponEditorProps) => {
  const buildFieldId = (fieldName: string) => `${weaponId}.${fieldName}`;
  const modsFieldArrayId = buildFieldId("mods");

  const { control, register, getValues } = useFormContext();

  const {
    fields: modFields,
    append: appendMod,
    remove: removeMod,
  } = useFieldArray({
    control,
    name: modsFieldArrayId,
  });

  const weaponName = getValues(`${weaponId}.name`);

  return (
    <Card padding="4">
      <CardHeader padding="0" display="flex">
        <Heading size="md" fontFamily="Oxanium" marginRight="auto">
          {weaponName}
        </Heading>
      </CardHeader>

      <FormControl variant="floating" marginTop="1rem" marginBottom="1rem">
        <NumberField
          id={`${weaponId}.ammo.max`}
          name={`${weaponId}.ammo.max`}
          rules={{ min: 1, max: 100 }}
          defaultValue={0}
          control={control}
          size="sm"
        />
        <FormLabel htmlFor={`${weaponId}.ammo.max`}>Max Ammo</FormLabel>
      </FormControl>

      <div className="msc-WeaponEditor__mods">
        <Heading size="sm" fontFamily="Oxanium" marginRight="auto">
          Mods
        </Heading>
        {modFields.map((field, index) => (
          <ModEditor
            key={field.id}
            modId={`${modsFieldArrayId}[${index}]`}
            onDelete={() => removeMod(index)}
          />
        ))}
        <Button
          className="is-positive"
          leftIcon={<AddIcon />}
          size="xs"
          width="100%"
          onClick={() =>
            appendMod({ name: "", type: undefined, description: "" })
          }
        >
          Add Mod
        </Button>
      </div>

      <div className="msc-WeaponEditor__traits"></div>
    </Card>
  );
};

export default WeaponEditor;
