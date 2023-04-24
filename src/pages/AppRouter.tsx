import React from "react";
import {
  Route,
  createBrowserRouter,
  createMemoryRouter,
  createRoutesFromElements,
} from "react-router-dom";

import CharactersProvider from "~/context/CharactersProvider";
import GamesProvider from "~/context/GamesProvider";
import Game from "~/features/Games/Game/Game";
import Characters from "~/pages/Characters/Characters";
import ErrorPage from "~/pages/ErrorPage/ErrorPage";
import Games from "~/pages/Games/Games";
import Home from "~/pages/Home/Home";
import Profile from "~/pages/Profile/Profile";

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
    <Route
      path="/characters"
      element={
        <CharactersProvider>
          <Characters />
        </CharactersProvider>
      }
    />,
    <Route path="/profile" element={<Profile />} />,
    <Route
      path="/games"
      element={
        <GamesProvider>
          <Games />
        </GamesProvider>
      }
    />,
    <Route path="/games/:id" element={<Game />} />,
    <Route path="*" element={<ErrorPage />} />,
  ];
};

export default getAppRouter;
