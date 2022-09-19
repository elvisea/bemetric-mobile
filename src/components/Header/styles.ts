import styled from "styled-components/native";
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
