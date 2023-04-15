/* eslint-disable no-extra-boolean-cast */
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, IconButton, Input, Text } from "@chakra-ui/react";
import CustomIcon, {
  CustomIconColor,
  CustomIconType,
} from "lib/components/icons/CustomIcon";
import { useSpinner } from "lib/hooks/useSpinner";
import React, { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

type NumberInputWithIconProps = {
  id: string;
  label: string;
  icon: CustomIconType;
  iconColor?: CustomIconColor;
  defaultValue?: number;
};

const size = "50px";

const NumberInputWithIcon = ({
  id,
  label,
  icon,
  iconColor = CustomIconColor.Default,
}: NumberInputWithIconProps) => {
  const { register, setValue, getValues } = useFormContext();

  const currentId = `${id}.current`;
  const maxId = `${id}.max`;

  const maxWatch = useWatch({ name: maxId, defaultValue: getValues(maxId) });
  const maxValue = parseInt(maxWatch);
  const currentWatch = useWatch({
    name: currentId,
    defaultValue: getValues(currentId),
  });
  const currentValue = parseInt(currentWatch);

  useEffect(() => {
    if (currentValue > maxValue) setValue(currentId, maxValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxValue, currentValue]);

  const spinner = useSpinner(
    () => handleButtonChange("up"),
    () => handleButtonChange("down")
  );

  const handleButtonChange = (direction?: "up" | "down") => {
    const calculateValue = () => {
      let next: number;

      switch (direction) {
        case "up":
          next = currentValue + 1;
          break;
        case "down":
          next = currentValue - 1;
          break;
        default:
          next = currentValue;
          break;
      }

      if (next < 0) return 0;
      else if (next > maxValue) return maxValue;
      else return next;
    };
    setValue(currentId, calculateValue());
  };

  return (
    <div className="jg-NumberInputWithIcon">
      <Box className="jg-NumberInputWithIcon__group" height={size}>
        <CustomIcon icon={icon} size={size} fill={iconColor} />
        <IconButton
          aria-label={`Decrease ${label}`}
          icon={<MinusIcon />}
          height="1.75rem"
          minWidth="1.75rem"
          size="xs"
          tabIndex={!spinner.isSpinning && currentValue === 0 ? -1 : 0}
          isDisabled={!spinner.isSpinning && currentValue === 0}
          onMouseDown={() => spinner.down()}
          onTouchStart={() => spinner.down()}
          onMouseOut={() => spinner.stop()}
          onMouseUp={() => spinner.stop()}
          onTouchEnd={() => spinner.stop()}
        />
        <Input
          id={currentId}
          {...register(currentId)}
          step={1}
          type="number"
          value={currentValue}
          isDisabled
          opacity="1 !important"
          width={size}
        />
        <IconButton
          aria-label={`Increase ${label}`}
          icon={<AddIcon />}
          height="1.75rem"
          minWidth="1.75rem"
          size="xs"
          tabIndex={!spinner.isSpinning && currentValue === maxValue ? -1 : 0}
          isDisabled={!spinner.isSpinning && currentValue === maxValue}
          onMouseDown={() => spinner.up()}
          onTouchStart={() => spinner.up()}
          onMouseOut={() => spinner.stop()}
          onMouseUp={() => spinner.stop()}
          onTouchEnd={() => spinner.stop()}
        />
      </Box>
      <Text>{label}</Text>
    </div>
  );
};

export default NumberInputWithIcon;
