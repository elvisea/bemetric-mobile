import React, { useCallback, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { CustomBoxRegister } from "./components/customBoxRegister";

import api from "@services/api";

import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Foundation,
} from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useCustomer } from "@hooks/customer";

export function EventLog() {
  const { colors } = THEME;
  const { customer } = useCustomer();

  const [data, setData] = useState<any | null>()
  
  async function fetchData() {
    const data = {
      // ajustar requisição com os parametros da documentação - para ter uma base usa o intervalo de 30 dias e o cliente como -1
      // "codigoCliente": customer?.codigoCliente,
      "codigoCliente": -1,
      "tipoIntervalo": 3
    };

    try {
      const response = await api.post("/Evento/ObterLista", data);

      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <ScrollView
      style={{ flex: 1, paddingHorizontal: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <CustomBoxRegister
        title={"Equipamento"}
        icon={<FontAwesome name="gears" size={18} color={colors.white} />}
        totalEquip={data?.totalEquipamentos}
        stopOFF={data?.totalEquipamentoMovimentoEquipamentosParadoIgnicaoDesligada}
        movement={data?.totalEquipamentosMovimento}
        stopON={data?.totalEquipamentosParadoIgnicaoLigada}
        speedExcd={data?.totalEquipamentosVelocidadeExcedida}
      />
      <CustomBoxRegister
        title={"Outras localizações"}
        icon={<Foundation name="map" size={20} color={colors.white} />}
        stopOFF={data?.intOutraLocalizacaoParadoIgnicaoDesligada}
        stopON={data?.totalOutraLocalizacaoParadoIgnicaoLiagada}
      />
      <CustomBoxRegister
        title={"Em geocercas"}
        icon={<MaterialCommunityIcons name="map-marker-path" size={22} color="white" />}
        stopOFF={data?.totalGeocercaParadoIgnicaoDesligada}
        stayExcd={data?.totalGeocercaPermanenciaExcedida}
        stopON={data?.totalGeocercaParadoIgnicaoLigada}
        stayObd={data?.totalGeocercaPermanenciaObedecida}
      />
      <CustomBoxRegister
        title={"Em pontos de interesse"}
        icon={<FontAwesome5 color={colors.white} size={20} name="dot-circle" />}
        stopOFF={data?.totalPontoInteresseParadoIgnicaoDesligada}
        stayExcd={data?.totalPontoInteressePermanenciaExcedida}
        stopON={data?.totalPontoInteresseParadoIgnicaoLiagada}
        stayObd={data?.totalPontoInteressePermanenciaObedecida}
      />
    </ScrollView>
  );
}
