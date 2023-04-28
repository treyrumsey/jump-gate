/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { Sidebar } from "~/components/ui/Sidebar/Sidebar";
import { useCharactersContext } from "~/context/CharactersProvider";
import { CharacterSheet } from "~/features/Characters/CharacterSheet/CharacterSheet";
import { updateCharacterSchema } from "~/lib/utilities/UpdateSchema";

const Characters = () => {
  const { currentCharacterId, characterIds } = useCharactersContext();

  const [charactersInitialized, setCharactersInitialized] = useState(false);

  useEffect(() => {
    characterIds.forEach((id) => updateCharacterSchema(id));
    setCharactersInitialized(true);
  }, []);

  return (
    <div className="jg-Characters">
      <div className="container">
        <Sidebar showCharacterList />
        {charactersInitialized && <CharacterSheet key={currentCharacterId} />}
      </div>
    </div>
  );
};

export default Characters;
