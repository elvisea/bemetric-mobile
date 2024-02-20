import { THEME } from "@theme/theme";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TextInput`
  width: ${RFValue(52)}px;
  height: ${RFValue(52)}px;

  padding: ${RFValue(4)}px;

  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(6)}px;

  color: ${THEME.colors.white};
  border-color: ${THEME.colors.white};

  font-size: ${RFValue(14)}px;
  text-align: center;
  font-family: ${THEME.fonts.Roboto_400Regular};

  align-items: center;
  justify-content: center;
`;
