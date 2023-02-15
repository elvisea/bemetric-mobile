import * as React from "react";
import { ScrollView, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Permanencia } from "../components/Permanencia";
import { HeaderDefault } from "@components/HeaderDefault";

import { THEME } from "@theme/theme";

interface IParams {
  params: {
    codigoEquipamento: number;
  };
}

export function Period() {
  const route = useRoute();
  const { params } = route.params as IParams;

  console.log("Period Screen Params:", params);

  return (
    <VStack flex={1} width="full" pb="16px" bg={THEME.colors.shape}>
      <HeaderDefault title="Periodo de permanência" />

      <ScrollView
        w="full"
        px="16px"
        pt="16px"
        showsVerticalScrollIndicator={false}
      >
        <Permanencia
          icon={<MaterialCommunityIcons name="filter" size={22} color="#FFF" />}
          title="Em geocercas"
          total={8}
          hours={5}
          on={1}
          off={2}
        />

        <Permanencia
          icon={
            <MaterialCommunityIcons name="arrow-right" size={22} color="#FFF" />
          }
          title="Em pontos de interesse"
          total={8}
          hours={5}
          on={1}
          off={2}
        />

        <Permanencia
          icon={
            <MaterialCommunityIcons name="map-marker" size={22} color="#FFF" />
          }
          title="Outras localizações"
          total={8}
          hours={5}
          on={1}
          off={2}
        />
      </ScrollView>
    </VStack>
  );
}
