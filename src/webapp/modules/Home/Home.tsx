import { Box, Card, CardBody, Link, Text } from "@chakra-ui/react";
import CustomIcon, { CustomIconType } from "lib/components/icons/CustomIcon";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  return (
    <Box className="jg-Home">
      <Card className="jg-Home__tile">
        <Link as={RouterLink} to="/characters">
          <CardBody display="flex" flexWrap="wrap" justifyContent="center">
            <Box>
              <CustomIcon
                icon={CustomIconType.Characters}
                fill="rgba(255, 255, 255, 0.9)"
                size="96px"
              />
            </Box>
            <Text fontSize="xl" textAlign="center">
              Characters
            </Text>
          </CardBody>
        </Link>
      </Card>
      <Card className="jg-Home__tile">
        <Link as={RouterLink} to="/characters">
          <CardBody>
            <Box
              width="100%"
              display="flex"
              flexWrap="wrap"
              justifyContent="center"
            >
              <CustomIcon
                icon={CustomIconType.DoubleRingedOrb}
                fill="rgba(255, 255, 255, 0.9)"
                size="96px"
              />
            </Box>
            <Text fontSize="xl" textAlign="center">
              GM
            </Text>
          </CardBody>
        </Link>
      </Card>
      <Card className="jg-Home__tile">
        <Link as={RouterLink} to="/characters">
          <CardBody display="flex" flexWrap="wrap" justifyContent="center">
            <CustomIcon
              icon={CustomIconType.Profile}
              fill="rgba(255, 255, 255, 0.9)"
              size="96px"
            />
            <Text fontSize="xl" textAlign="center">
              Account
            </Text>
          </CardBody>
        </Link>
      </Card>
    </Box>
  );
};

export default Home;
