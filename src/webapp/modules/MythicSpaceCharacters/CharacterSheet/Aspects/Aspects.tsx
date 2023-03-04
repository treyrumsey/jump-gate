import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Collapse,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import {
  UpgradeField,
  UpgradeType,
} from "lib/components/forms/UpgradeField/UpgradeField";
import { useFieldArray, useFormContext } from "react-hook-form";

interface AspectsProps {
  key: number;
  aspect: string;
  dynamic?: boolean;
}

export const Aspects = ({ aspect, dynamic }: AspectsProps) => {
  const { isOpen, onToggle } = useDisclosure();

  const { register, control } = useFormContext();

  const { fields, append } = useFieldArray({
    control,
    name: "aspects",
  });

  return (
    <Box py={1} className="msc-Aspects">
      <ButtonGroup isAttached>
        <Button className="msc-Aspects__toggle" onClick={onToggle}>
          Aspects
        </Button>
        <Button className="msc-Aspects__edit-toggle" onClick={() => {}}>
          Edit
        </Button>
      </ButtonGroup>

      <Collapse className="msc-Aspects__collapse" in={isOpen} animateOpacity>
        <div className="msc-Aspects__aspects">
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
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
                <UpgradeField nestIndex={index} type={UpgradeType.Aspects} />
              </div>
            );
          })}
        </div>
        <IconButton
          icon={<AddIcon />}
          title="Add new Aspect"
          aria-label="Add new Aspect"
          onClick={() => {
            append({ aspect: "", ability: "", description: "", upgrades: [] });
          }}
        />
      </Collapse>
    </Box>
  );
};
