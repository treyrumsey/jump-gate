import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import MarkdownView from "lib/components/typography/MarkdownView/MarkdownView";
import { WeaponTrait } from "models/Weapon.model";
import React from "react";
import { useFormContext } from "react-hook-form";

const TraitButton = ({ name, description }: WeaponTrait) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="msc-WeaponFieldGroup__trait-button" size="xs">
          {name}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="msc-WeaponFieldGroup__trait-popover-content"
        backdropFilter="blur(11px)"
        bg="rgba(30, 30, 30, 0.8)"
        boxShadow="dark-lg"
      >
        <PopoverArrow backdropFilter="blur(10px)" bg="rgba(30, 30, 30, 0.8)" />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold" fontSize="md" fontFamily="Oxanium">
          {name}
        </PopoverHeader>
        <PopoverBody>
          <MarkdownView>{description}</MarkdownView>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface TraitProps {
  isEditing?: boolean;
  traitId: string;
}

const Trait = ({ isEditing, traitId }: TraitProps) => {
  const { getValues } = useFormContext();

  const name = getValues(`${traitId}.name`);
  const description = getValues(`${traitId}.description`);

  return (
    <Stack
      className="msc-WeaponFieldGroup__trait"
      spacing="3"
      direction="row"
      alignItems="center"
    >
      <Text
        fontFamily="Oxanium"
        fontSize="xs"
        fontWeight="bold"
        paddingLeft="3"
      >
        Trait:
      </Text>
      {isEditing ? (
        <Skeleton />
      ) : (
        <TraitButton name={name} description={description} />
      )}
    </Stack>
  );
};

export default Trait;
