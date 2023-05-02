import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Header = styled.View`
  width: 100%;
  height: auto;
  align-items: center;
  margin-bottom: ${RFValue(20)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Box = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

export const Body = styled.View`
  width: 86%;
  max-height: 96%;
  border-radius: ${RFValue(10)}px;

  padding: ${RFValue(16)}px;
  background: #fff;
  align-items: flex-start;
  justify-content: space-between;
`;
