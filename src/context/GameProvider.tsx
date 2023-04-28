import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { onValue, ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "~/App";
import { GameModel, buildGame } from "~/models/Game.model";

type GameContextType = {
  gameId: string;
  game: GameModel;
};

const GameContext = createContext<GameContextType>({
  gameId: "",
  game: buildGame(),
});

type GameProviderProps = {
  children: React.ReactNode;
};

const GameProvider = ({ children }: GameProviderProps) => {
  const [user] = useAuthState(auth);
  const { id: gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<GameModel>(buildGame());

  useEffect(() => {
    if (!user) return;
    const ownerRef = ref(db, `games/${gameId}/owner`);
    const unsubscribeOwner = onValue(ownerRef, (snapshot) => {
      if (!snapshot.exists()) {
        navigate("/error");
      }
    });

    return () => {
      unsubscribeOwner();
    };
  }, [gameId, navigate, user]);

  useEffect(() => {
    if (!user) return;
    const unsubscribeGame = onValue(ref(db, `games/${gameId}`), (snapshot) => {
      const snapshotGame: GameModel = snapshot.val();
      setGame((prev) => ({ ...prev, ...snapshotGame }));
    });

    return () => {
      unsubscribeGame();
    };
  }, [gameId, user]);

  return (
    <GameContext.Provider
      value={{
        gameId: gameId ?? "",
        game,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

export default GameProvider;
