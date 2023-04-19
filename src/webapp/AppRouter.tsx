import DisclosureProvider from "lib/components/context/DisclosureProvider";
import React from "react";
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  createBrowserRouter,
  createMemoryRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorPage from "webapp/ErrorPage";
import Home from "webapp/modules/Home/Home";
import JumpGateCharacters from "webapp/modules/JumpGateCharacters/JumpGateCharacters";
import Profile from "webapp/modules/Profile/Profile";
import CharactersProvider from "webapp/modules/context/CharactersProvider";

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
            <JumpGateCharacters />
          </DisclosureProvider>
        </CharactersProvider>
      }
    />,
    <Route path="/profile" element={<Profile />} />,
    <Route path="*" element={<ErrorPage />} />,
  ];
};

export default getAppRouter;
