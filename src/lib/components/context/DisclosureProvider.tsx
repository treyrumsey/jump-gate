import { useDisclosure } from "@chakra-ui/react";
import React, { createContext, useContext } from "react";

type DisclosureContextType = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const DisclosureContext = createContext<DisclosureContextType>({
  isOpen: false,
  onClose: () => null,
  onOpen: () => null,
});

type DisclosureProviderProps = {
  children: React.ReactNode;
};

const DisclosureProvider = ({ children }: DisclosureProviderProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <DisclosureContext.Provider value={{ isOpen, onClose, onOpen }}>
      {children}
    </DisclosureContext.Provider>
  );
};

export const useDisclosureContext = () => {
  const context = useContext(DisclosureContext);

  if (!context) {
    throw new Error(
      `useDisclosureContext must be used within a DisclosureProvider`
    );
  }

  return context;
};

export default DisclosureProvider;
