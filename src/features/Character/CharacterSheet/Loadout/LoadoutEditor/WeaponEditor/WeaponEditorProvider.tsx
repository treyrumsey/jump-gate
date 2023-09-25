import React, { createContext, useContext } from "react";

import { hasModSlots, canBeDeleted } from "~/lib/utilities/WeaponUtilities";
import { LoadoutType } from "~/models/Loadout.model";

type WeaponEditorContextType = {
  index: number;
  isEditing: boolean;
  loadoutType: LoadoutType;
  weaponId: string;
  isModdable: boolean;
  onDelete?: () => void;
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
  onDelete,
}: WeaponEditorProviderProps) => {
  const weaponId = `loadouts.${loadoutType}.weapons[${index}]`;
  const isModdable = hasModSlots(index, loadoutType);
  const isDeletable = canBeDeleted(index, loadoutType);

  return (
    <WeaponEditorContext.Provider
      value={{
        index,
        isEditing,
        loadoutType,
        weaponId,
        isModdable,
        onDelete: isDeletable ? onDelete : undefined,
      }}
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
