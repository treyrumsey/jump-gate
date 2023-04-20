import React from "react";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

import CharacterSummaryTokens from "~/features/Mission/CharacterSummary/SummaryTokens/SummaryTokens";
import { AttributeName } from "~/models/Attribute.model";
import { CharacterSummaryModel } from "~/models/CharacterSummary.model";

type CharacterSummaryProps = {
  index: number;
  playerName: string;
  summary: CharacterSummaryModel;
};

const CharacterSummary = ({
  index,
  playerName,
  summary,
}: CharacterSummaryProps) => {
  const attributes = [
    { name: AttributeName.Physique, value: summary.attributes.Physique.value },
    { name: AttributeName.Reflex, value: summary.attributes.Reflex.value },
    {
      name: AttributeName.Discipline,
      value: summary.attributes.Discipline.value,
    },
    { name: AttributeName.Wits, value: summary.attributes.Wits.value },
  ];

  return (
    <VStack className="jg-CharacterSummary" gap=".75rem">
      <Text size="lg">{playerName}</Text>
      <FormControl variant="floating">
        <Input id={`character-name-${index}`} readOnly value={summary.name} />
        <FormLabel htmlFor={`character-name-${index}`}>Name</FormLabel>
      </FormControl>
      <FormControl variant="floating">
        <Input id={`species-${index}`} readOnly value={summary.species} />
        <FormLabel htmlFor={`species-${index}`}>Species</FormLabel>
      </FormControl>
      <Box display="grid" gap=".5rem" gridAutoFlow="column">
        {attributes.map(({ name, value }) => (
          <Box
            key={`${name}-${index}`}
            className="augmented"
            data-augmented-ui="tl-clip tr-round br-clip bl-round border"
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection="column"
            width="68px"
            height="68px"
          >
            <Text
              size="lg"
              fontFamily="Oxanium"
              fontSize="1.8rem"
              lineHeight="2.1rem"
              marginLeft="auto"
              marginRight="auto"
              textAlign="center"
            >
              {value}
            </Text>
            <Text
              fontFamily="Oxanium"
              fontSize="13px"
              fontWeight="semibold"
              margin="0"
              textAlign="center"
            >
              {name}
            </Text>
          </Box>
        ))}
      </Box>
      <CharacterSummaryTokens tokens={summary.tokens} />
    </VStack>
  );
};

export default CharacterSummary;
