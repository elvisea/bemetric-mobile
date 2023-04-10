import { Alert } from "react-native";
import React, { useCallback, useState } from "react";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";
import { Feather } from "@expo/vector-icons";

import MapView, { Polygon } from "react-native-maps";
import { HStack, IconButton, VStack } from "native-base";

import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { calculateDelta, calculateInitialRegion } from "../utils/";

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

interface IResponses {
  [index: number]: string;
}

const responses: IResponses = {
  0: "Geocerca excluída com sucesso",
  1: "Geocerca não localizada",
  2: "Falha ao tentar excluir Geocerca",
};

export function UpdateGeofences() {
  const { colors } = THEME;

  const route = useRoute();
  const navigation = useNavigation();

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

  async function handleDeleteGeofence() {
    try {
      if (geofence) {
        const response = await api.delete("/Geocerca/Excluir", {
          data: { codigoGeocerca: geofence.codigoGeocerca },
        });

        console.log("response", response.data);

        if (response.data === 0 || 1 || 2) {
          Alert.alert(responses[response.data], responses[response.data], [
            {
              text: "Visualizar Geocercas",
              onPress: () => navigation.navigate("Geofences"),
            },
          ]);
        }
      }
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
        <HStack>
          <IconButton
            icon={<Feather name="edit" size={22} color={colors.blue[700]} />}
            onPress={() => console.log("Update Geofence")}
          />
          <IconButton
            style={{ marginLeft: 8 }}
            icon={<Feather name="trash" size={22} color={colors.red[600]} />}
            onPress={handleDeleteGeofence}
          />
        </HStack>
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
