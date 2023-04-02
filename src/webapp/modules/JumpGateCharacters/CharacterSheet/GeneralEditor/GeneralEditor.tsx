import {
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useDisclosureContext } from "lib/components/context/DisclosureProvider";
import { NumberField } from "lib/components/forms/NumberField/NumberField";
import React from "react";
import { useFormContext } from "react-hook-form";

const GeneralEditor = () => {
  const { isOpen, onClose } = useDisclosureContext();
  const { control, getValues } = useFormContext();

  const statuses = ["shields", "armor", "stress", "supplies", "mp"];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="jg-GeneralEditor">
        <ModalHeader textAlign="center" position="relative" paddingBottom="0">
          Maximum Status Values
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="jg-GeneralEditor__modal-body">
          <Card>
            <CardBody display="flex" gap="1rem" flexWrap="wrap">
              {statuses.map((status) => (
                <FormControl
                  className="jg-GeneralEditor__max-status"
                  key={status}
                  variant="floating"
                  width="10rem"
                >
                  <NumberField
                    id={`status.${status}.max`}
                    name={`status.${status}.max`}
                    rules={{ min: 0 }}
                    defaultValue={getValues(`status.${status}.max`)}
                    control={control}
                    size="lg"
                  />
                  <FormLabel
                    htmlFor={`status.${status}.max`}
                    textTransform="capitalize"
                  >{`Max ${status}`}</FormLabel>
                </FormControl>
              ))}
            </CardBody>
          </Card>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GeneralEditor;
