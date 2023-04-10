import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const ContainerCheckbox = styled.View`
  width: 100%;
  height: ${RFValue(50)}px;

  border-color: #e6e6e6;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(4)}px;
  padding: 0 ${RFValue(12)}px;

  flex-direction: row;
  align-items: center;
`;
