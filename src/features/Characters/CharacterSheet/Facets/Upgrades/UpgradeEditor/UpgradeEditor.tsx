import React from "react";
import { useFormContext } from "react-hook-form";

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
    <Box className="jg-UpgradeField" display={isEditing ? undefined : "none"}>
      <FormControl
        variant="floating"
        className="jg-UpgradeField__name-form-control"
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
                className="jg-UpgradeField__delete-button"
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
