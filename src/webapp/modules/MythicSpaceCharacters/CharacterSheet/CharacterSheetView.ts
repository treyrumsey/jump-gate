import { createContext, Dispatch, SetStateAction } from "react";

interface CharacterSheetViewContextInterface {
  isCombatView: boolean;
  setCombatView: Dispatch<SetStateAction<boolean>>;
}

export const CharacterSheetViewContext =
  createContext<CharacterSheetViewContextInterface>({
    isCombatView: false,
    setCombatView: () => null,
  });
