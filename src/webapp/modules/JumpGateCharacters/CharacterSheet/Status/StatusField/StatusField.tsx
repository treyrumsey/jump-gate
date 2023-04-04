import IconNumberField from "lib/components/forms/IconNumberField/IconNumberField";
import {
  CustomIconColor,
  CustomIconType,
} from "lib/components/icons/CustomIcon";
import React from "react";
import { useWatch } from "react-hook-form";

export interface IconFunctionParams {
  current?: number;
  max?: number;
}

export enum StatusFieldColors {
  BadNewsAtZero,
  BadNewsAtMax,
}

type StatusFieldProps = {
  getIcon: (params?: IconFunctionParams) => CustomIconType;
  color: StatusFieldColors;
  name: string;
  statusId: string;
};

const StatusField = ({ getIcon, color, name, statusId }: StatusFieldProps) => {
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

  console.log(
    `badnewsatzero and currently zero: ${
      color === StatusFieldColors.BadNewsAtZero && currentValue === 0
    }`
  );

  console.log(
    `badnewsatzero and currently max: ${
      color === StatusFieldColors.BadNewsAtZero && currentValue === 0
    }`
  );

  console.table({ name, maxValue, currentValue });

  return (
    <div className={`jg-Status__${name}`}>
      <IconNumberField
        defaultValue={currentValue}
        fieldId={currentId}
        icon={getIcon({
          current: currentValue,
          max: maxValue,
        })}
        iconColor={iconColor}
        label={name}
        max={maxValue}
        maxId={maxId}
      />
    </div>
  );
};

export default StatusField;
