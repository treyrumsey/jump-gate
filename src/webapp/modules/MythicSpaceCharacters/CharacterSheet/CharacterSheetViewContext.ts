import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface CharacterSheetViewContextInterface {
  isCombatView: boolean;
  setCombatView: Dispatch<SetStateAction<boolean>>;
}

export const CharacterSheetViewContext =
  createContext<CharacterSheetViewContextInterface>({
    isCombatView: false,
    setCombatView: () => null,
  });

export const useCharacterSheetViewContext = () => {
  const context = useContext(CharacterSheetViewContext);

  if (!context) {
    throw new Error(
      `useCharacterSheetViewContext must be used within a CharacterSheetViewProvider`
    );
  }

  return context;
};
