import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(82)}px;
  background: ${THEME.colors.blue[700]};
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

export const Icon = styled(MaterialIcons).attrs(() => ({
  size: 24,
  color: THEME.colors.white,
}))``;
