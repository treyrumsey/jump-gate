import React from "react";
import {
  Route,
  createBrowserRouter,
  createMemoryRouter,
  createRoutesFromElements,
} from "react-router-dom";

import DisclosureProvider from "~/components/context/DisclosureProvider";
import CharactersProvider from "~/context/CharactersProvider";
import Characters from "~/pages/Characters/Characters";
import ErrorPage from "~/pages/ErrorPage/ErrorPage";
import Mission from "~/pages/Games/Mission";
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
          <DisclosureProvider>
            <Characters />
          </DisclosureProvider>
        </CharactersProvider>
      }
    />,
    <Route path="/profile" element={<Profile />} />,
    <Route path="/games" element={<Mission />} />,
    <Route path="*" element={<ErrorPage />} />,
  ];
};

export default getAppRouter;
