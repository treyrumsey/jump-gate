import { auth } from "webapp/App";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { CharacterSheet } from "webapp/modules/MythicSpaceCharacters/CharacterSheet/CharacterSheet";

const MythicSpaceCharacters = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="msc-MythicSpaceCharacters">
      <div className="container">
        <span>{user?.email}</span>
        <br />
        <CharacterSheet />
      </div>
    </div>
  );
};

export default MythicSpaceCharacters;
