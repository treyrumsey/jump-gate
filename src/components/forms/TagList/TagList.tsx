import React from "react";
import { useFormContext } from "react-hook-form";

import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import classNames from "classnames";

import MarkdownView from "~/components/typography/MarkdownView/MarkdownView";
import { Tag } from "~/models/Tag.model";

const TagButton = ({
  name,
  type,
  description,
  colorScheme,
}: Tag & { colorScheme?: string }) => {
  const buttonClasses = classNames("jg-TagList__tag-button", {
    "is-default-color": !colorScheme,
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button className={buttonClasses} size="xs" colorScheme={colorScheme}>
          {name}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          className="jg-TagList__tag-button-popover-content"
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
      </Portal>
    </Popover>
  );
};

interface TagListProps {
  colorScheme?: string;
  isEditing?: boolean;
  listId: string;
  listName: string;
}

const TagList = <T extends Tag>({
  colorScheme,
  isEditing,
  listId,
  listName,
}: TagListProps) => {
  const { getValues } = useFormContext();
  const tagValues: T[] | T = getValues(listId);

  const tags = Array.isArray(tagValues) ? tagValues : [tagValues];

  return (
    <Stack
      className="jg-TagList"
      spacing={3}
      rowGap=".5rem"
      direction="row"
      align="center"
    >
      <>
        <Text fontSize="xs" fontWeight="bold" paddingLeft="3">
          {`${listName}:`}
        </Text>
        {isEditing ? (
          <Skeleton height="1rem" width="100%" />
        ) : (
          tags.map((tag, index) => (
            <TagButton key={index} {...tag} colorScheme={colorScheme} />
          ))
        )}
      </>
    </Stack>
  );
};

export default TagList;
