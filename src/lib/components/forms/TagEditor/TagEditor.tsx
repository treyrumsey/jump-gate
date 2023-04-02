import { DeleteIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";

interface TagEditorProps {
  tagId: string;
  tagName: string;
  tagTypeOptions?: string[];
  onDelete: () => void;
}

const TagEditor = ({
  tagId,
  tagName,
  tagTypeOptions,
  onDelete,
}: TagEditorProps) => {
  const { register } = useFormContext();

  const nameId = `${tagId}.name`;
  const typeId = `${tagId}.type`;
  const descriptionId = `${tagId}.description`;

  const typeOptions = tagTypeOptions?.map((type) => (
    <option key={type} value={type}>
      {type}
    </option>
  ));
  const hasType = tagTypeOptions !== undefined;

  return (
    <Stack direction="column" spacing="3" className="jg-TagEditor__tag">
      <InputGroup size="sm">
        <FormControl
          variant="floating"
          className="jg-TagEditor__name-form-control"
        >
          <Input
            id={nameId}
            placeholder={tagName}
            size="sm"
            {...register(nameId)}
          />
          <FormLabel htmlFor={nameId}>{tagName}</FormLabel>
        </FormControl>
        {hasType && (
          <FormControl variant="floating" maxWidth="9rem">
            <Select
              id={typeId}
              placeholder=" "
              {...register(typeId)}
              size="sm"
              borderRadius="0"
            >
              {typeOptions}
            </Select>
            <FormLabel htmlFor={typeId} size="sm">
              Type
            </FormLabel>
          </FormControl>
        )}
        <IconButton
          className="jg-TagEditor__delete-button"
          icon={<DeleteIcon />}
          title={`Delete ${tagName}`}
          aria-label={`Delete ${tagName}`}
          onClick={onDelete}
          size="sm"
        />
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

export default TagEditor;
