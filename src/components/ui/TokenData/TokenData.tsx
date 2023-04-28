import React from "react";

import {
  Blue,
  Red,
} from "~/components/typography/MarkdownColorOverrides/MarkdownColorOverrides";

type TokenPair = {
  isUncapped?: boolean;
  positiveName: string;
  positiveDescription: React.ReactElement;
  positiveNarrativeDescription?: React.ReactElement;
  negativeName: string;
  negativeDescription: React.ReactElement;
  negativeNarrativeDescription?: React.ReactElement;
  showInNarrativeMode?: boolean;
};

export const TOKEN_DATA: TokenPair[] = [
  {
    positiveName: "Accurate",
    positiveDescription: (
      <>
        You may spend an <Blue>accurate token</Blue> before you make an action
        roll to roll a second d20 and take the best result.
      </>
    ),
    negativeName: "Misfire",
    negativeDescription: (
      <>
        When you make an action roll while you have a <Red>misfire token</Red>,
        spend one and roll an additional d20 and take the worse result.
      </>
    ),
    negativeNarrativeDescription: (
      <>
        When you make an action roll while you have a <Red>misfire token</Red>,
        the GM can spend that token to have you roll a second d20 and take the
        worst result.
      </>
    ),
    showInNarrativeMode: true,
  },
  {
    positiveName: "Dodge",
    positiveDescription: (
      <>
        When you are targeted by an attack, you may spend a{" "}
        <Blue>dodge token</Blue> to give the attacker a <Red>misfire token</Red>
        , which must be spent on this roll.
      </>
    ),
    negativeName: "Off-Guard",
    negativeDescription: (
      <>
        When an enemy makes an attack roll against you while you have any{" "}
        <Red>off-guard tokens</Red>, the attacker may spend one to gain an
        immediate <Blue>accurate token</Blue>, which must be used on that
        attack.
      </>
    ),
  },
  {
    positiveName: "Empowered",
    positiveDescription: (
      <>
        You may spend an <Blue>empowered token</Blue> when you hit or crit with
        an attack to increase the number of damage dice you roll by 1.
      </>
    ),
    positiveNarrativeDescription: (
      <>
        When you roll a partial success or better on an action roll, you may
        spend an <Blue>empowered token</Blue> to achieve a{" "}
        <strong>critical result</strong>. You succeed spectacularly well. If you
        are making progress on an <strong>extended challenge</strong>, roll an
        additional effect die and add that much progress.
      </>
    ),
    negativeName: "Weakened",
    negativeDescription: (
      <>
        When you deal damage to an enemy while you have a{" "}
        <Red>weakened token</Red>, the target may spend one to take half damage,
        rounded down.
      </>
    ),
    negativeNarrativeDescription: (
      <>
        When you roll a partial success or better on an action roll while you
        have a <Red>weakened token</Red>, the GM can spend that token to reduce
        the effect of the roll. You achieve less than you thought you would.
        When you roll an effect die to advance a challenge tracker, the GM may
        spend a <Red>weakened token</Red> to halve the result.
      </>
    ),
    showInNarrativeMode: true,
  },
  {
    positiveName: "Fleet",
    positiveDescription: (
      <>
        You may spend a <Blue>fleet token</Blue> when you use a move action to
        move one additional zone or immediately overcome an obstacle without
        having to use the Struggle action.
      </>
    ),
    negativeName: "Immobilized",
    negativeDescription: (
      <>
        You cannot move while you have any <Red>immobilized tokens</Red> unless
        you use the Struggle action. When you roll a partial success or better
        on the struggle action, reduce your <Red>immobilized tokens</Red> by 1.
      </>
    ),
  },
  {
    positiveName: "Fortified",
    positiveDescription: (
      <>
        You may spend a <Blue>fortified token</Blue> when you take damage to
        take half damage, rounded down.
      </>
    ),
    positiveNarrativeDescription: (
      <>
        When you fail an action roll, or would suffer consequences as a result
        of a partial success, you may spend a <Blue>fortified token</Blue> to
        reduce or possibly negate the severity of the consequences. If the GM
        rolls a consequence die to tick progress on a{" "}
        <strong>danger tracker</strong>, you may spend a{" "}
        <Blue>fortified token</Blue> to halve the result.
      </>
    ),
    negativeName: "Vulnerable",
    negativeDescription: (
      <>
        When you take damage from an attack while you have a{" "}
        <Red>vulnerable token</Red>, the attacker can spend one to add 1 die to
        the damage roll.
      </>
    ),
    negativeNarrativeDescription: (
      <>
        When you suffer a consequence as a result of a failure or a partial
        success while you have a <Red>vulnerable token</Red>, the GM can spend
        that token to inflict consequences that are much worse than normal. When
        the GM rolls a consequence die to mark progress on a{" "}
        <strong>danger tracker</strong>, they may spend a{" "}
        <Red>vulnerable token</Red> to roll an additional consequence die.
      </>
    ),
    showInNarrativeMode: true,
  },
  {
    positiveName: "Overwatch",
    positiveDescription: (
      <>
        When an enemy within your weapon range moves, you may spend an{" "}
        <Blue>overwatch token</Blue> to make an immediate attack against that
        character. You cannot spend <Blue>overwatch tokens</Blue> while you have
        any <Red>stunned tokens</Red>.
      </>
    ),
    negativeName: "Jammed",
    negativeDescription: (
      <>
        You cannot attack while you have any <Red>jammed tokens</Red>. The only
        way to get rid of <Red>jammed tokens</Red> is by rallying.
      </>
    ),
  },
  {
    isUncapped: true,
    positiveName: "Regen",
    positiveDescription: (
      <>
        At the end of your turn, gain shields equal to the number of{" "}
        <Blue>regeneration tokens</Blue> you have, then reduce your{" "}
        <Blue>regeneration tokens</Blue> by 1. This cannot take you above your
        maximum shields. You may have any number of{" "}
        <Blue>regeneration tokens</Blue>.
      </>
    ),
    negativeName: "Burn",
    negativeDescription: (
      <>
        At the end of your turn, you take damage equal to the number{" "}
        <Red>burn tokens</Red> you have, then reduce your{" "}
        <Red>burn tokens </Red> by 1. You may have any number of{" "}
        <Red>burn tokens</Red>.
      </>
    ),
  },
];

export const STUNNED_TOKEN_DESCRIPTION = (
  <>
    You cannot act at all while you have any <Red>stunned tokens</Red>. At the
    end of your turn, reduce your <Red>stunned tokens</Red> by 1. You can{" "}
    <strong>push yourself</strong> to take an action while you are stunned as
    normal. <Red>Stunned tokens</Red> do not have an opposite.
  </>
);
