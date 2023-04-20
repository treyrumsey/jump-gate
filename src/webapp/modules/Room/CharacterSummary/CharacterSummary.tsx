import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AttributeName } from "models/Attribute.model";
import { CharacterSummaryModel } from "models/CharacterSummary.model";
import React from "react";

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
      <Box
        display="grid"
        gap="1rem"
        gridTemplateColumns="1fr 1fr"
        gridTemplateRows="1fr 1fr"
      >
        {attributes.map(({ name, value }) => (
          <Box
            key={`${name}-${index}`}
            className="augmented"
            data-augmented-ui="tl-clip tr-round br-clip bl-round border"
            alignItems="center"
            justifyContent="center"
            display="flex"
            flexDirection="column"
            width="78px"
            height="78px"
          >
            <Text
              size="lg"
              fontFamily="Oxanium"
              fontSize="2.2rem"
              lineHeight="2.3rem"
              marginLeft="auto"
              marginRight="auto"
              textAlign="center"
            >
              {value}
            </Text>
            <Text
              fontFamily="Oxanium"
              fontSize="14px"
              fontWeight="semibold"
              margin="0"
              textAlign="center"
            >
              {name}
            </Text>
          </Box>
        ))}
      </Box>
    </VStack>
  );
};

export default CharacterSummary;
