export interface Aspect {
  name: string;
  ability: AspectAbility;
}

export interface AspectAbility {
  name: string;
  description: string;
  upgrades: AspectAbilityUpgrade[];
}

export interface AspectAbilityUpgrade {
  name: string;
  description: string;
}
