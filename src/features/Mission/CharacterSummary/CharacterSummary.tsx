import React from "react";

import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";

import { CustomIcons } from "~/components/icons/CustomIcon";
import { usePlayModeContext } from "~/context/PlayModeProvider";
import { StatusItem } from "~/features/Mission/CharacterSummary/StatusItem/StatusItem";
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
  const { isCombatMode } = usePlayModeContext();

  const attributes = [
    { name: AttributeName.Physique, value: summary.attributes.Physique.value },
    { name: AttributeName.Reflex, value: summary.attributes.Reflex.value },
    {
      name: AttributeName.Discipline,
      value: summary.attributes.Discipline.value,
    },
    { name: AttributeName.Wits, value: summary.attributes.Wits.value },
  ];

  const currentMP = isCombatMode
    ? summary.status.combat.mp.current
    : summary.status.casual.mp.current;
  const maxMP = isCombatMode
    ? summary.status.combat.mp.max
    : summary.status.casual.mp.max;

  return (
    <Card
      className="jg-CharacterSummary augmented"
      data-augmented-ui="tl-clip tr-round br-clip bl-round border"
    >
      <CardBody
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap=".5rem"
        padding=".75rem"
      >
        <Text size="lg">{playerName}</Text>
        <Text size="lg">{summary.name}</Text>
        <Text size="lg">{summary.species}</Text>
        <Flex wrap="wrap" gap=".15rem">
          <StatusItem
            icon={CustomIcons.Shield}
            name="Shields"
            max={
              isCombatMode
                ? summary.status.combat.shields.max
                : summary.status.casual.shields.max
            }
            value={
              isCombatMode
                ? summary.status.combat.shields.current
                : summary.status.casual.shields.current
            }
          />
          <StatusItem
            icon={CustomIcons.Armor}
            name="Armor"
            max={
              isCombatMode
                ? summary.status.combat.armor.max
                : summary.status.casual.armor.max
            }
            value={
              isCombatMode
                ? summary.status.combat.armor.current
                : summary.status.casual.armor.current
            }
          />
          <StatusItem
            icon={
              summary.status.stress.current === summary.status.stress.max
                ? CustomIcons.Break
                : CustomIcons.Stress
            }
            name="Stress"
            max={summary.status.stress.max}
            redAtMax
            value={summary.status.stress.current}
          />
          <StatusItem
            icon={CustomIcons.CardboardBox}
            name="Supply"
            max={summary.status.supplies.max}
            value={summary.status.supplies.current}
          />
          {maxMP > 0 && (
            <StatusItem
              icon={CustomIcons.ConcentricCrescents}
              name="MP"
              max={maxMP}
              value={currentMP}
            />
          )}
        </Flex>
        <Box
          display="grid"
          gap=".5rem"
          gridAutoFlow="column"
          gridTemplateColumns="min-content"
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
              width="60px"
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
      </CardBody>
    </Card>
  );
};

export default CharacterSummary;
