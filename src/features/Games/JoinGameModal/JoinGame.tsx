import React from "react";
import { useForm } from "react-hook-form";

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

interface JoinGameFormValues {
  gameId: string;
  displayName: string;
}

export const JoinGame = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { joinGame } = useGamesContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<JoinGameFormValues>();

  async function submitHandler(data: JoinGameFormValues) {
    try {
      await joinGame(data.gameId, data.displayName);
      onClose();
      reset();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Button onClick={onOpen}>Join Game</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          className="jg-JoinGame__modal-content augmented"
          data-augmented-ui="tl-clip tr-round br-clip bl-round border"
        >
          <ModalHeader>Join Game</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(submitHandler)}>
            <ModalBody display="flex" flexDirection="column" gap="4" pb="4">
              <FormControl isInvalid={!!errors.gameId} mb={4}>
                <FormLabel htmlFor="gameId">Game ID</FormLabel>
                <Input
                  id="gameId"
                  type="text"
                  {...register("gameId", { required: true })}
                />
                <FormErrorMessage>
                  {errors.gameId && "Game ID is required"}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                variant="floating"
                isInvalid={!!errors.displayName}
                mb={4}
              >
                <Input
                  id="displayName"
                  type="text"
                  {...register("displayName", { required: true })}
                />
                <FormLabel htmlFor="displayName">Display Name</FormLabel>
                <FormErrorMessage>
                  {errors.displayName && "Display Name is required"}
                </FormErrorMessage>
              </FormControl>
              <ButtonGroup width="100%">
                <Button
                  className="is-positive"
                  type="submit"
                  isLoading={isSubmitting}
                  marginStart="auto"
                >
                  Join
                </Button>
              </ButtonGroup>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
