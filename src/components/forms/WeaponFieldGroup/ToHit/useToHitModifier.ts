import { useFormContext, useWatch } from "react-hook-form";

import { AttributeName } from "~/models/Attribute.model";
import { WeaponType } from "~/models/Weapon.model";

type ToHitMapType = {
  [key in WeaponType]: AttributeName;
};

const ToHitMap: ToHitMapType = {
  [WeaponType.Amp]: AttributeName.Discipline,
  [WeaponType.Melee]: AttributeName.Physique,
  [WeaponType.Pistol]: AttributeName.Reflex,
  [WeaponType.Rifle]: AttributeName.Reflex,
  [WeaponType.Terminal]: AttributeName.Wits,
};

const useToHitModifier = (weaponId: string): number => {
  useWatch({ name: "attributes" });
  const { getValues } = useFormContext();
  const type: WeaponType = useWatch({ name: `${weaponId}.type` });

  if (type === WeaponType.Pistol) {
    const physique = getValues("attributes.Physique.value");
    const reflex = getValues("attributes.Reflex.value");
    return physique > reflex ? physique : reflex;
  }

  const attributeName = ToHitMap[type];
  return getValues(`attributes.${attributeName}.value`) ?? 0;
};

export default useToHitModifier;
