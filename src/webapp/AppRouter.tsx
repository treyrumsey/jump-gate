import DisclosureProvider from "lib/components/context/DisclosureProvider";
import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import ErrorPage from "webapp/ErrorPage";
import Home from "webapp/modules/Home/Home";
import JumpGateCharacters from "webapp/modules/JumpGateCharacters/JumpGateCharacters";
import CharactersProvider from "webapp/modules/context/CharactersProvider";

export const isStandalone =
  "standalone" in window.navigator && window.navigator.standalone === true;

const AppRouter = () => {
  return isStandalone ? (
    <MemoryRouter>
      <AppRoutes />
    </MemoryRouter>
  ) : (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/characters"
        element={
          <CharactersProvider>
            <DisclosureProvider>
              <JumpGateCharacters />
            </DisclosureProvider>
          </CharactersProvider>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
