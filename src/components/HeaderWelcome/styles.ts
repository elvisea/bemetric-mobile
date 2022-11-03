import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(92)}px;
  background: ${THEME.colors.white};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
