import { useFocusEffect, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Item } from "@components/Item";

import { GrayText, Row, ValueText, ViewBox } from "./styles";

import IconHourMeter from "@assets/hourmeter.svg";
import IconSpeedometer from "@assets/speedometer.svg";
import { Cabecalho } from "@components/Cabecalho";

import { Ionicons, MaterialCommunityIcons,AntDesign } from "@expo/vector-icons";
import { THEME } from "@theme/theme";
import api from "@services/api";
import axios from "axios";
import { LoadingSpinner } from "@components/LoadingSpinner";

export default function DetailingDoisStackRoutes() {
  const route = useRoute();
  const params = route.params as { codigoEvento: number };

  const [data, setData] = useState<any | null>()

  async function fetchData() {
    const data = {
      codigoEvento: params.codigoEvento
    };

    try {
      const response = await api.post("/Evento/DetalharEvento", data);
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

  const icones = {
    0: <Ionicons name="flag" size={20} color={THEME.colors.blue[700]} />,
    1: <MaterialCommunityIcons name="bell-ring" color={THEME.colors.yellow[100]} size={20} />
  };

  const TipoCoord:any = {
    0: "Geocerca",
    1: "Ponto de interesse"
  }

  return (
    <>
      <Cabecalho hasIcon={false} />
      <ScrollView>
        {data ? 
          <>
            <ViewBox>
              <Row style={{borderBottomColor: THEME.colors.gray[100], borderBottomWidth: 1}}>
                {icones[0]}
                <Row>
                  <AntDesign name="clockcircle" size={15} color={THEME.colors.gray[50]}/>
                  <GrayText style={{marginLeft: 5 }}>
                    {data.criadoEmFormatado}
                  </GrayText>
                </Row>
              </Row>

              <Row>
                <GrayText>
                  Equipamento
                </GrayText>
                <ValueText>
                  {data.nomeEquipamento}
                </ValueText>
              </Row>

              <Row>
                <GrayText>
                  Registro
                </GrayText>
                <ValueText>
                  {/* Não tem no retorno, deve pedir para o back inserir */}
                </ValueText>
              </Row>

              {data.tipoCoordenadas === -1 ?
                null :
                <Row>
                  <GrayText>
                    {/* Aqui vai precisar de uma verificação, pois existem os eventos de: geocerca, ponto de interesse e equipamento 
                      -1 – Equipamento | 0 – Geocerca | 1 – Ponto de Interesse
                    */}
                    {TipoCoord[data.tipoCoordenadas]}
                  </GrayText>
                  <ValueText>
                    {/* Não tem no retorno, deve pedir para o back inserir */}
                  </ValueText>
                </Row>
              }

            </ViewBox>

            <Item 
              mb="8px"
              icon={<IconSpeedometer />}
              title="Velocimetro"
            >
              <ValueText>
                {data.velocidade} Km/h
              </ValueText>
            </Item>

            <Item 
              mb="8px"
              icon={<IconHourMeter />}
              title="Horímetro"
            >
              <ValueText>
                {data.horimetro} Horas
              </ValueText>
            </Item>

            <Item
              mb="8px" 
              icon={<Ionicons name="speedometer-outline" color={THEME.colors.gray[50]} size={22} />}
              title="Hodômetro"
            >
              <ValueText>
                {data.hodometro} Km
              </ValueText>
            </Item>
          </>
          :
          <LoadingSpinner color={THEME.colors.blue[700]} />
        }
      </ScrollView>
    </>
  )
}
