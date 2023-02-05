import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Header = styled.View`
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(16)}px;
  padding: 0 ${RFValue(16)}px;
  flex-direction: row;
`;

export const Box = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: flex-end;
`;

export const Body = styled.View`
  width: 100%;
  max-height: 96%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background: #fff;
  align-items: flex-start;
  justify-content: space-between;
`;
