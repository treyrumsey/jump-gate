import { DeleteIcon } from "@chakra-ui/icons";
import {
  FormControl,
  InputGroup,
  Input,
  FormLabel,
  InputRightElement,
  IconButton,
  Textarea,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface UpgradeEditorProps {
  upgradeNameId: string;
  descriptionId: string;
  isEditing: boolean;
  onDelete: () => void;
}

const UpgradeEditor = ({
  upgradeNameId,
  descriptionId,
  isEditing,
  onDelete,
}: UpgradeEditorProps) => {
  const { register } = useFormContext();

  return (
    <Box className="msc-UpgradeField" display={isEditing ? undefined : "none"}>
      <FormControl
        variant="floating"
        className="msc-UpgradeField__name-form-control"
      >
        <InputGroup>
          <Input
            id={upgradeNameId}
            placeholder="Upgrade"
            {...register(upgradeNameId)}
          />
          <FormLabel htmlFor={upgradeNameId}>Upgrade</FormLabel>
          {isEditing && (
            <InputRightElement>
              <IconButton
                className="msc-UpgradeField__delete-button"
                icon={<DeleteIcon />}
                title={"Delete upgrade"}
                aria-label={"Delete upgrade"}
                onClick={onDelete}
              />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
      <Textarea
        id={descriptionId}
        placeholder="Description"
        rows={5}
        {...register(descriptionId)}
      />
    </Box>
  );
};

export default UpgradeEditor;
