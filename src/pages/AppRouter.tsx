import React from "react";
import {
  Route,
  createBrowserRouter,
  createMemoryRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { CharacterProvider } from "~/context/CharacterProvider";
import GameProvider from "~/context/GameProvider";
import GamesProvider from "~/context/GamesProvider";
import Game from "~/features/Game/Game";
import Character from "~/pages/Character/Character";
import Characters from "~/pages/Characters/Characters";
import ErrorPage from "~/pages/ErrorPage/ErrorPage";
import Games from "~/pages/Games/Games";
import Home from "~/pages/Home/Home";

export const isStandalone =
  "standalone" in window.navigator && window.navigator.standalone === true;

const getAppRouter = () => {
  const routes = createRoutesFromElements(createAppRoutes());

  return isStandalone
    ? createMemoryRouter(routes)
    : createBrowserRouter(routes);
};

const createAppRoutes = () => {
  return [
    <Route path="/" element={<Home />} />,
    <Route path="/characters" element={<Characters />} />,
    <Route
      path="/characters/:id"
      element={
        <CharacterProvider>
          <Character />
        </CharacterProvider>
      }
    />,
    <Route
      path="/games"
      element={
        <GamesProvider>
          <Games />
        </GamesProvider>
      }
    />,
    <Route
      path="/games/:id"
      element={
        <GameProvider>
          <Game />
        </GameProvider>
      }
    />,
    <Route path="*" element={<ErrorPage />} />,
  ];
};

export default getAppRouter;
