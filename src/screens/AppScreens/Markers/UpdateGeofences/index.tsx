import React, { useCallback, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import axios from "axios";
import { IconButton, VStack } from "native-base";
import MapView, { Polygon } from "react-native-maps";

import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { calculateDelta, calculateInitialRegion } from "../utils/";
import { LoadingSpinner } from "@components/LoadingSpinner";

interface IListaPontosGeocerca {
  codigoGeocerca: number;
  codigoPoligono: number;
  latitude: number;
  longitude: number;
}

interface IGeofence {
  incluir: boolean;
  codigoGeocerca: number;
  codigoCliente: number;
  codigoParceiro: number;
  nomeGeocerca: string;
  descricao: string;
  alertaEntrada: boolean;
  alertaSaida: boolean;
  alertaPermanencia: boolean;
  alertaPermanenciaTempo: number;
  alertaVelocidade: boolean;
  alertaVelocidadeQuilometro: number;
  listaPontosGeocerca: IListaPontosGeocerca[];
}

interface ICoordinate {
  latitude: number;
  longitude: number;
}

interface IParams {
  codigoGeocerca: number;
}

interface IDelta {
  latitudeDelta: number;
  longitudeDelta: number;
}

export function UpdateGeofences() {
  const route = useRoute();
  const { colors } = THEME;
  const { codigoGeocerca } = route.params as IParams;

  const [geofence, setGeofence] = useState<IGeofence | null>(null);
  const [coords, setCoords] = useState<ICoordinate[]>([]);
  const [initialRegion, setInitialRegion] = useState<ICoordinate>();
  const [delta, setDelta] = useState<IDelta>({} as IDelta);

  async function fetchGeofence() {
    try {
      const { data } = await api.post<IGeofence[]>("/Geocerca/ObterLista", {
        codigoGeocerca,
      });

      setGeofence(data[0]);

      let coordinates: ICoordinate[] = [];

      for (let index = 0; index < data[0].listaPontosGeocerca.length; index++) {
        const point = data[0].listaPontosGeocerca[index];

        coordinates.push({
          latitude: point.latitude,
          longitude: point.longitude,
        });
      }

      setCoords(coordinates);
      setDelta(calculateDelta(coordinates));
      setInitialRegion(calculateInitialRegion(coordinates));
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
          onPress={() => console.log("Update Geofence")}
        />
      </HeaderDefault>

      {!geofence && <LoadingSpinner color={colors.blue[700]} />}

      {geofence && coords.length > 0 && initialRegion && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: initialRegion.latitude,
            longitude: initialRegion.longitude,
            latitudeDelta: delta.latitudeDelta,
            longitudeDelta: delta.longitudeDelta,
          }}
        >
          <Polygon
            coordinates={coords}
            fillColor="rgba(160, 198, 229, 0.3)"
            strokeColor="rgba(0, 105, 192, 1)"
            strokeWidth={2}
          />
        </MapView>
      )}
    </VStack>
  );
}
