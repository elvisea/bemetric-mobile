import { TouchableOpacityProps } from "react-native";

import { Text } from "native-base";
import { InsideCircle, Container, OutsideCircle } from "./styles";

type RadioButton = TouchableOpacityProps & {
  label: string;
  picked: boolean;
};

export const RadioButton = ({ picked, label, ...rest }: RadioButton) => {
  return (
    <Container activeOpacity={0.75} {...rest}>
      <OutsideCircle picked={picked}>
        {picked ? <InsideCircle picked={picked} /> : null}
      </OutsideCircle>
      <Text fontFamily="Roboto_400Regular" color="white">
        {label}
      </Text>
    </Container>
  );
};
