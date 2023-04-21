import React from "react";

import { Box, Text } from "@chakra-ui/react";

import CustomIcon, {
  CustomIconColor,
  CustomIcons,
} from "~/components/icons/CustomIcon";

type StatusItemProps = {
  icon: CustomIcons;
  name: string;
  max?: number;
  redAtMax?: boolean;
  value: number;
};

export const StatusItem = ({
  icon,
  name,
  max,
  redAtMax,
  value,
}: StatusItemProps) => {
  let fill = CustomIconColor.Default;
  if (redAtMax && value === max) fill = CustomIconColor.BadNews;
  else if (!redAtMax && value === 0) fill = CustomIconColor.BadNews;

  return (
    <Box className="jg-CharacterSummary__status" position="relative">
      <Box
        className="jg-CharacterSummary__status-icon-value"
        height="50px"
        width="50px"
      >
        <CustomIcon icon={icon} size={"50px"} fill={fill} />
        <Text
          fontFamily="Oxanium"
          fontSize="24px"
          fontWeight="bold"
          position="relative"
          zIndex={1}
        >
          {value}
        </Text>
      </Box>
      <Text textAlign="center" fontSize="sm">
        {name}
      </Text>
    </Box>
  );
};
