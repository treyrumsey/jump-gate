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
import { WeaponMod } from "models/Weapon.model";
import React from "react";
import { useFormContext } from "react-hook-form";

const ModButton = ({ name, type, description }: WeaponMod) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="msc-WeaponFieldGroup__mod-button" size="xs">
          {name}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="msc-WeaponFieldGroup__mod-popover-content"
        bg="var(--msc-blue)"
        boxShadow="dark-lg"
      >
        <PopoverArrow bg="var(--msc-blue)" />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold" fontSize="md" fontFamily="Oxanium">
          {name}
        </PopoverHeader>
        <PopoverBody>
          <Text fontWeight="bold" fontSize="sm">
            {`[${type}]`}
          </Text>
          <MarkdownView>{description}</MarkdownView>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface ModListProps {
  modsId: string;
  isEditing: boolean;
}

const ModList = ({ modsId, isEditing }: ModListProps) => {
  const { getValues } = useFormContext();
  // const { fields } = useFieldArray({ control, name: modsId });

  // const watchMods: WeaponMod[] = useWatch({ control, name: modsId });
  const mods: WeaponMod[] = getValues(modsId);

  return (
    <Stack
      className="msc-WeaponFieldGroup__mods"
      width="100%"
      spacing={3}
      direction="row"
      align="center"
    >
      <>
        <Text
          fontFamily="Oxanium"
          fontSize="xs"
          fontWeight="bold"
          paddingLeft="3"
        >
          Mods:
        </Text>
        {isEditing ? (
          <Skeleton height="1rem" width="100%" />
        ) : (
          mods.map((mod, index) => <ModButton key={index} {...mod} />)
        )}
      </>
    </Stack>
  );
};

export default ModList;
