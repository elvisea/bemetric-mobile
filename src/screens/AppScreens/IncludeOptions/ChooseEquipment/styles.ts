import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ListTitle = styled.Text`
  color: #363636;
  font-size: ${RFValue(14)}px;
  margin-bottom: ${RFValue(8)}px;
  font-family: ${THEME.fonts.Roboto_400Regular};
`;
