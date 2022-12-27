import { useState } from "react";
import { LayoutDefault } from "@components/LayoutDefault";

import { Box } from "native-base";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { AntDesign, Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "@theme/theme";
import { ButtonOption, TitleOption } from "./styles";

import { Equipamento } from "@components/Options/Equipamento";
import { DadosTelemetria } from "@components/Options/DadosTelemetria";
import { PeriodoPermanencia } from "@components/Options/PeriodoPermanencia";
import { Trajeto } from "@components/Options/Trajeto";
import { DispositivoTelemetria } from "@components/Options/DispositivoTelemetria";

import { Option } from "@interfaces/Option";
import { options } from "@constants/options";


export function EquipmentDetails() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const component: any = {
    1: <Equipamento />,
    2: <DadosTelemetria />,
    3: <PeriodoPermanencia />,
    4: <Trajeto />,
    5: <DispositivoTelemetria />,
  };

  const [selectedOption, setSelectedOption] = useState<Option>(options[0]);

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      icon="menu"
      functionIcon={handleMenu}
    >
      <Box
        w="full"
        h={RFValue(50)}
        bg={THEME.colors.blue[700]}
        alignItems="center"
        flexDirection="row"
        justifyContent="flex-start"
      >
        {options.map((option) => (
          <ButtonOption
            key={option.id}
            onPress={() => setSelectedOption(option)}
          >
            <Feather name={option.icon} size={24} color="#FFF" />
          </ButtonOption>
        ))}
      </Box>

      <Box
        w="full"
        h={RFValue(58)}
        bg="white"
        paddingX="16px"
        alignItems="center"
        flexDirection="row"
        justifyContent="flex-start"
      >
        <TitleOption>{selectedOption.title}</TitleOption>
      </Box>

      {component[selectedOption.id]}
    </LayoutDefault>
  );
}
