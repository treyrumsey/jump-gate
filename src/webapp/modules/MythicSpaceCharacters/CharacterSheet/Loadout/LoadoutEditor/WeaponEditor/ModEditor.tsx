import { DeleteIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { WeaponModType } from "models/Weapon.model";
import React from "react";
import { useFormContext } from "react-hook-form";

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
        <FormControl variant="floating" width="12rem">
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

export default ModEditor;
