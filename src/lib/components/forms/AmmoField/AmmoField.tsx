import { MinusIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

interface AmmoFieldProps {
  fieldPath: string;
  max: number;
}

const AmmoField = ({ fieldPath, max }: AmmoFieldProps) => {
  const fieldName = `${fieldPath}.ammo.current`;
  const { register, setValue } = useFormContext();
  const [ammoValue, setAmmoValue] = useState(max);

  const spendAmmo = () => {
    if (ammoValue === 0) return;

    const value = ammoValue - 1;

    setAmmoValue(value);
    setValue(fieldName, value);
  };

  const reload = () => {
    setAmmoValue(max);
    setValue(fieldName, max);
  };

  const handleAmmoBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (isNaN(value)) {
      setValue(fieldName, ammoValue);
    } else if (value < 0) {
      setAmmoValue(0);
      setValue(fieldName, 0);
    } else if (value > max) {
      setAmmoValue(max);
      setValue(fieldName, max);
    }
  };

  return (
    <div className="msc-AmmoField">
      <FormControl variant="floating">
        <InputGroup>
          <Input
            id={fieldName}
            {...register(fieldName)}
            defaultValue={max}
            type="number"
            // pattern="[0-9]*(.[0-9]+)?"
            max={max}
            min={0}
            onBlur={handleAmmoBlur}
            paddingEnd="96px"
          />
          <FormLabel htmlFor={fieldName}>Ammo</FormLabel>
          <InputRightElement width="80px">
            <IconButton
              className="msc-AmmoField__shoot-button"
              aria-label="Shoot"
              icon={<MinusIcon />}
              onClick={spendAmmo}
              aria-disabled={ammoValue === 0}
            />
            <IconButton
              className="msc-AmmoField__reload-button"
              aria-label="Reload"
              icon={<RepeatIcon />}
              onClick={reload}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </div>
  );
};

export default AmmoField;
