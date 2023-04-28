import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type PlayModeContextType = {
  isCombatMode: boolean;
  setCombatMode: Dispatch<SetStateAction<boolean>>;
};

export const PlayModeContext = createContext<PlayModeContextType>({
  isCombatMode: false,
  setCombatMode: () => null,
});

type PlayModeProviderProps = PlayModeContextType & {
  children: React.ReactNode;
};

const PlayModeProvider = ({
  children,
  isCombatMode,
  setCombatMode,
}: PlayModeProviderProps) => {
  return (
    <PlayModeContext.Provider value={{ isCombatMode, setCombatMode }}>
      {children}
    </PlayModeContext.Provider>
  );
};

export const usePlayModeContext = () => {
  const context = useContext(PlayModeContext);

  if (!context) {
    throw new Error(
      `usePlayModeContext must be used within a PlayModeProvider`
    );
  }

  return context;
};

export default PlayModeProvider;
