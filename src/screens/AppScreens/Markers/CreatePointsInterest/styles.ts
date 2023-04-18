import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface IStyleProps {
  mb: number;
}

export const ContainerCheckbox = styled.View<IStyleProps>`
  width: 100%;
  height: ${RFValue(50)}px;
  margin-bottom: ${({ mb }) => `${RFValue(mb)}px`};

  border-color: #e6e6e6;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(4)}px;
  padding: 0 ${RFValue(12)}px;

  flex-direction: row;
  align-items: center;
`;
