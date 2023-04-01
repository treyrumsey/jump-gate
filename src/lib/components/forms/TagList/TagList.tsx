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
import { Tag } from "models/Tag";
import React from "react";
import { useFormContext } from "react-hook-form";

const TagButton = ({ name, type, description }: Tag) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button className="msc-TagList__tag-button" size="xs">
          {name}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="msc-TagList__tag-button-popover-content"
        backdropFilter="blur(4px)"
        bg="rgba(30, 30, 30, 0.8)"
        boxShadow="dark-lg"
      >
        <PopoverArrow backdropFilter="blur(4px)" bg="rgba(30, 30, 30, 0.8)" />
        <PopoverCloseButton />
        <PopoverHeader fontWeight="bold" fontSize="md" fontFamily="Oxanium">
          {name}
        </PopoverHeader>
        <PopoverBody>
          {type ? (
            <Text fontWeight="bold" fontSize="sm">
              {`[${type}]`}
            </Text>
          ) : null}

          <MarkdownView>{description}</MarkdownView>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface TagListProps {
  isEditing?: boolean;
  listId: string;
  listName: string;
}

const TagList = <T extends Tag>({
  isEditing,
  listId,
  listName,
}: TagListProps) => {
  const { getValues } = useFormContext();
  const tagValues: T[] | T = getValues(listId);

  const tags = Array.isArray(tagValues) ? tagValues : [tagValues];

  return (
    <Stack
      className="msc-TagList"
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
          {`${listName}:`}
        </Text>
        {isEditing ? (
          <Skeleton height="1rem" width="100%" />
        ) : (
          tags.map((tag, index) => <TagButton key={index} {...tag} />)
        )}
      </>
    </Stack>
  );
};

export default TagList;
