import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Collapse,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
  StackDivider,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  UpgradeField,
  UpgradeType,
} from "lib/components/forms/UpgradeField/UpgradeField";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

interface AspectsProps {
  key: number;
  aspect: string;
  dynamic?: boolean;
}

export const Aspects = ({ aspect, dynamic }: AspectsProps) => {
  const { register, control } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: "aspects",
  });
  const { isOpen, onToggle } = useDisclosure();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEditMode = () => {
    if (!isEditing && !isOpen) {
      onToggle();
    }

    setIsEditing((prev) => !prev);
  };

  return (
    <Box py={1} className="msc-Aspects">
      <ButtonGroup className="msc-Aspects__toggle-group" isAttached>
        <Button className="msc-Aspects__toggle" onClick={onToggle}>
          Aspects
        </Button>
        <IconButton
          icon={<EditIcon />}
          className="msc-Aspects__edit-toggle is-positive"
          onClick={toggleEditMode}
          aria-label={"Add or Remove Aspects"}
        />
      </ButtonGroup>
      <Collapse className="msc-Aspects__collapse" in={isOpen} animateOpacity>
        {isEditing && (
          <Box mt="3">
            <Button
              className="msc-Aspects__add-aspect is-positive"
              leftIcon={<AddIcon />}
              size="sm"
              onClick={() => {
                append({
                  aspect: "",
                  ability: "",
                  description: "",
                  upgrades: [],
                });
              }}
            >
              Add New Aspect
            </Button>
          </Box>
        )}
        <div className="msc-Aspects__aspects">
          {fields.map((field, index) => {
            return (
              <Card className="msc-Aspects__aspect-group" key={field.id}>
                <Box>
                  <FormControl variant="floating">
                    <Input
                      id={`aspects[${index}].aspect`}
                      placeholder="Aspect"
                      {...register(`aspects[${index}].aspect`)}
                    />
                    <FormLabel htmlFor={`aspects[${index}].aspect`}>
                      Aspect
                    </FormLabel>
                  </FormControl>
                  <FormControl variant="floating">
                    <Input
                      id={`aspects[${index}].ability`}
                      placeholder="Ability"
                      {...register(`aspects[${index}].ability`)}
                    />
                    <FormLabel htmlFor={`aspects[${index}].ability`}>
                      Ability
                    </FormLabel>
                  </FormControl>
                  <Textarea
                    id={`aspects[${index}].description`}
                    placeholder="Ability description"
                    {...register(`aspects[${index}].description`)}
                  />
                </Box>
                <UpgradeField
                  nestIndex={index}
                  type={UpgradeType.Aspects}
                  isEditing={isEditing}
                />
              </Card>
            );
          })}
        </div>
      </Collapse>
    </Box>
  );
};
