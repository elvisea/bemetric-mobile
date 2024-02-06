import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(54)}px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${THEME.colors.white};
  font-family: ${THEME.fonts.Roboto_500Medium};
`;
