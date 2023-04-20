import React from "react";
import { useWatch } from "react-hook-form";

import { Box } from "@chakra-ui/react";

import { CustomIconColor, CustomIcons } from "~/components/icons/CustomIcon";
import NumberInputWithIcon from "~/features/Characters/CharacterSheet/Status/StatusField/NumberInputWithIcon/NumberInputWithIcon";

export interface IconFunctionParams {
  current?: number;
  max?: number;
}

export enum StatusFieldColors {
  BadNewsAtZero,
  BadNewsAtMax,
}

type StatusFieldProps = {
  getIcon: (params?: IconFunctionParams) => CustomIcons;
  color: StatusFieldColors;
  name: string;
  statusId: string;
  display?: string;
};

const StatusField = ({
  getIcon,
  color,
  name,
  statusId,
  display,
}: StatusFieldProps) => {
  const currentId = `${statusId}.current`;
  const maxId = `${statusId}.max`;

  const maxWatch = useWatch({ name: maxId });
  const maxValue = parseInt(maxWatch);
  const currentWatch = useWatch({ name: currentId });
  const currentValue = parseInt(currentWatch);

  let iconColor = CustomIconColor.Default;
  if (
    (color === StatusFieldColors.BadNewsAtZero && currentValue === 0) ||
    (color === StatusFieldColors.BadNewsAtMax && currentValue === maxValue)
  )
    iconColor = CustomIconColor.BadNews;

  return (
    <Box className={`jg-Status__${name}`} display={display}>
      <NumberInputWithIcon
        id={statusId}
        label={name}
        icon={getIcon({
          current: currentValue,
          max: maxValue,
        })}
        iconColor={iconColor}
      />
    </Box>
  );
};

export default StatusField;
