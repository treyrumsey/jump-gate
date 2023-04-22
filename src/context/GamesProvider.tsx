import React, { createContext, useContext, useEffect, useState } from "react";

import { get, onValue, ref, remove, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import ShortUniqueId from "short-unique-id";

import { auth, db } from "~/App";
import { GameModel } from "~/models/Game.model";
import { GameIds } from "~/models/User.model";

const GAME_ROOM_ID_GENERATOR = new ShortUniqueId({
  dictionary: "alphanum_upper",
  length: 6,
});

type GamesContextType = {
  ownedGames?: GameIds;
  loadingOwned: boolean;
  joinedGames?: GameIds;
  loadingJoined: boolean;
  createGame: (name: string) => Promise<void>;
  joinGame: (gameId: string, displayName: string) => Promise<void>;
  deleteGame: (gameId: string) => Promise<void>;
};

const GamesContext = createContext<GamesContextType>({
  loadingOwned: true,
  loadingJoined: true,
  createGame: async () => {
    return;
  },
  joinGame: async () => {
    return;
  },
  deleteGame: async () => {
    return;
  },
});

type GamesProviderProps = {
  children: React.ReactNode;
};

const GamesProvider = ({ children }: GamesProviderProps) => {
  const [user] = useAuthState(auth);

  const [ownedGames, setOwnedGames] = useState<GameIds>();
  const [loadingOwned, setLoadingOwned] = useState(true);
  const [joinedGames, setJoinedGames] = useState<GameIds>();
  const [loadingJoined, setLoadingJoined] = useState(true);

  useEffect(() => {
    if (!user) return;

    const ownedGamesPath = "users/" + user.uid + "/games/owned";
    const ownedGamesRef = ref(db, ownedGamesPath);
    const unsubscribeOwnedGames = onValue(ownedGamesRef, (snapshot) => {
      const data: GameIds = snapshot.val();
      setOwnedGames(data);
      setLoadingOwned(false);
    });

    const joinedGamesPath = "users/" + user.uid + "/games/joined";
    const joinedGamesRef = ref(db, joinedGamesPath);
    const unsubscribeJoinedGames = onValue(joinedGamesRef, (snapshot) => {
      const data: GameIds = snapshot.val();
      setJoinedGames(data);
      setLoadingJoined(false);
    });

    return () => {
      unsubscribeOwnedGames();
      unsubscribeJoinedGames();
    };
  }, [user, setOwnedGames, setJoinedGames]);

  const createGame = async (name: string) => {
    if (!user) return;

    const newGameId = GAME_ROOM_ID_GENERATOR.randomUUID();

    const userOwnedGamesPath =
      "users/" + user.uid + "/games/owned/" + newGameId;
    const userGamesRef = ref(db, userOwnedGamesPath);
    await set(userGamesRef, name);

    const gamesPath = "games/" + newGameId;
    const gamesRef = ref(db, gamesPath);
    await set(gamesRef, {
      name: name,
      owner: user.uid,
      players: {},
      characters: {},
    } satisfies GameModel);

    setOwnedGames((current) => ({ ...current, [newGameId]: name }));
  };

  const joinGame = async (gameId: string, displayName: string) => {
    if (!user) return;

    const gameName = await get(ref(db, "games/" + gameId + "/name"));
    if (!gameName.exists()) return;

    const userJoinedGamesPath = "users/" + user.uid + "/games/joined/" + gameId;
    const userJoinedGamesRef = ref(db, userJoinedGamesPath);
    await set(userJoinedGamesRef, gameName);

    const gamesPath = "games/" + gameId + "/players/" + user.uid;
    const gamesRef = ref(db, gamesPath);
    await set(gamesRef, displayName);

    setJoinedGames((current) => ({
      ...current,
      [gameId]: gameName.val(),
    }));
  };

  const deleteGame = async (gameId: string) => {
    if (!user) return;

    const userOwnedGamesPath = "users/" + user.uid + "/games/owned/" + gameId;
    const userOwnedGamesRef = ref(db, userOwnedGamesPath);
    await remove(userOwnedGamesRef);

    const gamesPath = "games/" + gameId;
    const gamesRef = ref(db, gamesPath);
    await remove(gamesRef);

    setOwnedGames((current) => {
      const newOwnedGames = { ...current };
      if (newOwnedGames[gameId]) delete newOwnedGames[gameId];
      return newOwnedGames;
    });
  };

  return (
    <GamesContext.Provider
      value={{
        ownedGames,
        loadingOwned,
        joinedGames,
        loadingJoined,
        createGame,
        joinGame,
        deleteGame,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export const useGamesContext = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("useGamesContext must be used within a GamesProvider");
  }
  return context;
};

export default GamesProvider;
