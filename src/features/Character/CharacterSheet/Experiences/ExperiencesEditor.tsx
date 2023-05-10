import React from "react";
import { useFieldArray } from "react-hook-form";

import { AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@chakra-ui/react";

import TagEditor from "~/components/forms/TagEditor/TagEditor";

type ExperiencesEditorProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ExperiencesEditor = ({ isOpen, onClose }: ExperiencesEditorProps) => {
  const { fields, append, remove } = useFieldArray({ name: "experiences" });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        className="jg-Experiences__modal-content augmented"
        data-augmented-ui="tl-clip tr-round br-clip bl-round border"
      >
        <ModalHeader textAlign="center" position="relative" paddingBottom="0">
          Experiences
        </ModalHeader>
        <ModalBody className="jg-Experiences__modal-body">
          {fields.map((field, index) => (
            <TagEditor
              key={field.id}
              tagId={`experiences[${index}]`}
              tagName="Experience"
              onDelete={() => remove(index)}
            />
          ))}
          <Button
            className="is-positive"
            leftIcon={<AddIcon />}
            size="sm"
            onClick={() => append({ name: "", description: "" })}
          >
            Add Experience
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExperiencesEditor;
