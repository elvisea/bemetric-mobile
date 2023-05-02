import React, { ReactNode } from "react";
import { TouchableOpacityProps } from "react-native";

import { Box } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { Container, Description, Title } from "./styles";

interface IMarkerCardProps extends TouchableOpacityProps {
  title: string;
  icon: ReactNode;
  description: string;
}

function MarkerCard({ title, icon, description, ...rest }: IMarkerCardProps) {
  const { colors } = THEME;
  return (
    <Container
      style={{ backgroundColor: "#FFF" }}
      activeOpacity={0.75}
      {...rest}
    >
      <Box
        flex={1}
        width="full"
        flexDirection="row"
        alignItems="center"
        justifyContent="flex-start"
      >
        {icon}

        <Box
          width="100%"
          ml={`${RFValue(8)}px`}
          alignItems="flex-start"
          justifyContent="center"
        >
          <Title>{title}</Title>

          <Description
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{ width: "80%" }}
          >
            {description}
          </Description>
        </Box>
      </Box>

      <MaterialCommunityIcons
        size={30}
        color={colors.blue[700]}
        name={"arrow-right"}
      />
    </Container>
  );
}

export { MarkerCard };
