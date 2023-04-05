import { hasModSlots } from "lib/utilities/WeaponUtilities";
import { LoadoutType } from "models/Loadout.model";
import React, { createContext, useContext } from "react";

type WeaponEditorContextType = {
  index: number;
  isEditing: boolean;
  loadoutType: LoadoutType;
  weaponId: string;
  isModdable: boolean;
};

const WeaponEditorContext = createContext<WeaponEditorContextType>({
  index: 0,
  isEditing: false,
  loadoutType: LoadoutType.Casual,
  weaponId: "",
  isModdable: false,
});

type WeaponEditorProviderProps = Omit<
  WeaponEditorContextType,
  "weaponId" | "isModdable"
> & {
  children: React.ReactNode;
};

const WeaponEditorProvider = ({
  children,
  index,
  isEditing,
  loadoutType,
}: WeaponEditorProviderProps) => {
  const weaponId = `loadouts.${loadoutType}.weapons[${index}]`;
  const isModdable = hasModSlots(index, loadoutType);

  return (
    <WeaponEditorContext.Provider
      value={{ index, isEditing, loadoutType, weaponId, isModdable }}
    >
      {children}
    </WeaponEditorContext.Provider>
  );
};

export const useWeaponEditorContext = () => {
  const context = useContext(WeaponEditorContext);

  if (!context) {
    throw new Error(
      `useWeaponEditorContext must be used within a WeaponEditorProvider`
    );
  }

  return context;
};

export default WeaponEditorProvider;
