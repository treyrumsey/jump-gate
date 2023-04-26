import React from "react";
import { useForm } from "react-hook-form";

import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { useGamesContext } from "~/context/GamesProvider";

interface CreateGameFormValues {
  gameName: string;
  ownerName: string;
}

export const CreateGame = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createGame } = useGamesContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateGameFormValues>();

  async function submitHandler(data: CreateGameFormValues) {
    try {
      await createGame(data.gameName, data.ownerName);
      onClose();
      reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Button className="is-positive" leftIcon={<AddIcon />} onClick={onOpen}>
        New Game
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="jg-CreateGame__modal-content augmented"
          data-augmented-ui="tl-clip tr-round br-clip bl-round border"
        >
          <ModalHeader>Create New Game</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(submitHandler)}>
            <ModalBody display="flex" flexDirection="column" gap="4" pb="4">
              <FormControl isInvalid={!!errors.gameName}>
                <FormLabel htmlFor="gameName">Game Name</FormLabel>
                <Input
                  id="gameName"
                  type="text"
                  {...register("gameName", { required: true })}
                />
                <FormErrorMessage>
                  {errors.gameName && "Game Name is required"}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.ownerName}>
                <FormLabel htmlFor="ownerName">Display Name</FormLabel>
                <Input
                  id="ownerName"
                  type="text"
                  {...register("ownerName", { required: true })}
                />
                <FormErrorMessage>
                  {errors.ownerName && "Display Name is required"}
                </FormErrorMessage>
              </FormControl>
              <ButtonGroup width="100%">
                <Button
                  marginStart="auto"
                  className="is-positive"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Create
                </Button>
              </ButtonGroup>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
