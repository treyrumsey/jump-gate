import { EditIcon } from "@chakra-ui/icons";
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import MarkdownView from "lib/components/typography/MarkdownView/MarkdownView";
import { Experience } from "models/Experience.model";
import React from "react";
import { useFormContext } from "react-hook-form";
import ExperiencesEditor from "webapp/modules/JumpGateCharacters/CharacterSheet/Experiences/ExperiencesEditor";
import { usePlayModeContext } from "webapp/modules/JumpGateCharacters/CharacterSheet/PlayModeProvider";

const Experiences = () => {
  const { isCombatMode } = usePlayModeContext();
  const { getValues } = useFormContext();

  const experiences: Experience[] = getValues("experiences");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="jg-Experiences" display={isCombatMode ? "none" : undefined}>
      <Card className="jg-Experiences__card">
        <CardHeader>
          <ButtonGroup className="jg-Experiences__edit-toggle-group">
            <Text className="jg-Experiences__title" fontSize="lg">
              Experiences
            </Text>
            <IconButton
              icon={<EditIcon />}
              className="jg-Experiences__edit-toggle is-positive"
              onClick={onOpen}
              aria-label={`Edit Experiences`}
              size="sm"
            />
          </ButtonGroup>
        </CardHeader>
        <CardBody>
          {experiences.map((experience, index) => {
            return (
              <Box className="jg-Experiences__experience" key={index}>
                <Heading size="sm">{experience.name}</Heading>
                <MarkdownView>{experience.description}</MarkdownView>
              </Box>
            );
          })}
        </CardBody>
      </Card>

      <ExperiencesEditor isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Experiences;
