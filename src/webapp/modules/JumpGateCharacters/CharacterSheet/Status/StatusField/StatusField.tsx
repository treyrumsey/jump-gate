import IconNumberField, {
  IconNumberFieldSizes,
} from "lib/components/forms/IconNumberField/IconNumberField";
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

  const maxValue = useWatch({ name: maxId });
  const currentValue = useWatch({ name: currentId });

  let iconColor = CustomIconColor.Default;
  if (
    (color === StatusFieldColors.BadNewsAtZero && currentValue === 0) ||
    (color === StatusFieldColors.BadNewsAtMax && currentValue === maxValue)
  )
    iconColor = CustomIconColor.BadNews;

  return (
    <div className={`jg-Status__${name}`}>
      <IconNumberField
        defaultValue={currentValue}
        fieldId={currentId}
        icon={getIcon({ current: currentValue, max: maxValue })}
        iconColor={iconColor}
        label={name}
        max={maxValue}
        maxId={maxId}
        size={IconNumberFieldSizes.Large}
      />
    </div>
  );
};

export default StatusField;
