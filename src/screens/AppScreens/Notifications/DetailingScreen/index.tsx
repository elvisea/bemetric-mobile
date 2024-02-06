import React, { ReactNode, useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, View, Dimensions } from "react-native";

import { useFocusEffect, useRoute } from "@react-navigation/native";

import { RFValue } from "react-native-responsive-fontsize";
import MapView, { Marker, Polygon, Circle } from "react-native-maps";

import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

import api from "@services/api";
import { THEME } from "@theme/theme";

import Truck from "@assets/truck.svg";
import IconHourMeter from "@assets/hourmeter.svg";
import IconSpeedometer from "@assets/speedometer.svg";

import { Item } from "@components/Item";
import { Cabecalho } from "@components/Cabecalho";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { Data, IParams } from "./types";
import { createCoordsGeofence } from "./utils";

import { formatHour } from "@utils/formatHours";

import {
  ContentHeader,
  Text,
  Header,
  Row,
  Value,
  HeaderSecondary,
} from "./styles";

import { useAuth } from "@hooks/authentication";

const icons: { [index: number]: ReactNode } = {
  0: <Ionicons name="flag" size={20} color={THEME.colors.blue[700]} />,
  1: (
    <MaterialCommunityIcons
      name="bell-ring"
      color={THEME.colors.yellow[100]}
      size={20}
    />
  ),
};

const typeCoord: { [index: number]: string } = {
  0: "Geocerca",
  1: "Ponto de interesse",
};

const { height } = Dimensions.get("screen");

export default function DetailingDoisStackRoutes() {
  const route = useRoute();
  const params = route.params as IParams;

  const { user } = useAuth();

  const [data, setData] = useState<Data | null>(null);

  async function fetchData() {
    const data = {
      localDashboard: 3,
      codigoUsuario: user?.codigoUsuario,

      codigoEvento: params.codigoEvento,
      codigoEquipamento: params.codigoEquipamento,
      codigoDispositivo: params.codigoDispositivo,
    };

    try {
      const response = await api.post("/Evento/DetalharEvento", data);
      setData(response.data);
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <>
      <Cabecalho hasIcon={false} />

      {!data && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {data && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <Header>
            {icons[0]}

            <ContentHeader>
              <AntDesign
                size={15}
                name="clockcircle"
                color={THEME.colors.gray[50]}
                style={{ marginRight: 8 }}
              />
              <Text>{data.criadoEmFormatado}</Text>
            </ContentHeader>
          </Header>

          <HeaderSecondary>
            <Row>
              <Text>Equipamento</Text>
              <Value>{data.nomeEquipamento}</Value>
            </Row>

            <Row>
              <Text>Registro</Text>
              <Value>{data.registroApp}</Value>
            </Row>

            {data.tipoCoordenadas === 2 ? null : (
              <Row>
                <Text>{typeCoord[data.tipoCoordenadas]}</Text>
                <Value>{data.marcadorApp}</Value>
              </Row>
            )}
          </HeaderSecondary>

          <Item
            h={`${RFValue(58)}px`}
            mb={`${RFValue(8)}px`}
            icon={<IconSpeedometer />}
            title="Velocimetro"
          >
            <Value>{data.velocidade} Km/h</Value>
          </Item>

          <Item
            h={`${RFValue(58)}px`}
            mb={`${RFValue(8)}px`}
            icon={<IconHourMeter />}
            title="Horímetro"
          >
            <Value>{data ? formatHour(data.horimetro) : ""}</Value>
          </Item>

          <Item
            h={`${RFValue(58)}px`}
            icon={
              <Ionicons
                name="speedometer-outline"
                color={THEME.colors.gray[50]}
                size={22}
              />
            }
            title="Hodômetro"
          >
            <Value>{data.hodometro} Km</Value>
          </Item>

          <View style={styles.mapContainer}>
            {data && (
              <MapView
                initialRegion={{
                  latitude: data.latitude,
                  longitude: data.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                style={styles.map}
                zoomControlEnabled
              >
                <Marker
                  coordinate={{
                    latitude: data.latitude,
                    longitude: data.longitude,
                  }}
                >
                  <Truck />
                </Marker>

                {data.tipoCoordenadas === 0 && (
                  <Polygon
                    coordinates={createCoordsGeofence(data.geoFence)}
                    fillColor="rgba(160, 198, 229, 0.3)"
                    strokeColor="rgba(0, 105, 192, 1)"
                    strokeWidth={2}
                  />
                )}

                {data.tipoCoordenadas === 1 && (
                  <Circle
                    center={{
                      latitude: data.pointFence.latitude,
                      longitude: data.pointFence.longitude,
                    }}
                    radius={data.pointFence.raio}
                    fillColor="rgba(160, 198, 229, 0.3)"
                    strokeColor="rgba(0, 105, 192, 1)"
                    strokeWidth={2}
                  />
                )}
              </MapView>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  mapContainer: {
    height: height - 400,
  },
  map: {
    flex: 1,
  },
});
