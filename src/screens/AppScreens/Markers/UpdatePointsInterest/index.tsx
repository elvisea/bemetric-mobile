import React, { useCallback, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import axios from "axios";
import { IconButton, VStack } from "native-base";
import MapView, { Circle, Marker } from "react-native-maps";

import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { LoadingSpinner } from "@components/LoadingSpinner";

interface IPoint {
  incluir: boolean;
  codigoPontoInteresse: number;
  codigoCliente: number;
  codigoParceiro: number;
  nomePonto: string;
  descricao: string;
  raio: number;
  latitude: number;
  longitude: number;
  alertaEntrada: boolean;
  alertaSaida: boolean;
  alertaPermanencia: boolean;
  alertaPermanenciaTempo: number;
}

interface IParams {
  codigoPontoInteresse: number;
}

export function UpdatePointsInterest() {
  const route = useRoute();
  const { colors } = THEME;
  const { codigoPontoInteresse } = route.params as IParams;

  const [point, setPoint] = useState<IPoint | null>(null);

  async function fetchGeofence() {
    try {
      const { data } = await api.post<IPoint[]>("/PontoInteresse/ObterLista", {
        codigoPontoInteresse,
      });

      setPoint(data[0]);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log("Error:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchGeofence();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Geocerca">
        <IconButton
          icon={<Feather name="edit" size={22} color={colors.blue[700]} />}
          onPress={() => console.log("Update Point Interest")}
        />
      </HeaderDefault>

      {!point && <LoadingSpinner color={colors.blue[700]} />}

      {point && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: point.latitude,
            longitude: point.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Circle
            center={{ latitude: point.latitude, longitude: point.longitude }}
            radius={point.raio}
            fillColor="rgba(160, 198, 229, 0.3)"
            strokeColor="rgba(0, 105, 192, 1)"
            strokeWidth={2}
          />

          <Marker
            coordinate={{
              latitude: point.latitude,
              longitude: point.longitude,
            }}
          />
        </MapView>
      )}
    </VStack>
  );
}
