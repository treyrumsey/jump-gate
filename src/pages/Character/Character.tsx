import React from "react";
import { useParams } from "react-router-dom";

import { Sidebar } from "~/components/ui/Sidebar/Sidebar";
import { CharacterSheet } from "~/features/Character/CharacterSheet/CharacterSheet";

const Character = () => {
  const { id: characterId } = useParams();

  return (
    <div className="jg-Character">
      <div className="container">
        <CharacterSheet key={characterId} />
        <Sidebar />
      </div>
    </div>
  );
};

export default Character;
