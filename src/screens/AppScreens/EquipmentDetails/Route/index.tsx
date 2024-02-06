import { Alert } from "react-native";
import React, { useCallback, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { IconButton, VStack } from "native-base";
import MapView, { Marker } from "react-native-maps";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { styles } from "./styles";
import { IParams } from "../interfaces/IEquipamentDetails";

import { calculateDelta } from "@screens/AppScreens/Markers/utils";
import { IDelta } from "@screens/AppScreens/Markers/UpdateGeofences/interfaces";

interface ILocation {
  lat: number;
  lon: number;
  status: number;
  velocidade: number;
}

export function Route() {
  const route = useRoute();
  const { customer } = useCustomer();

  const { colors } = THEME;
  const { params } = route.params as IParams;

  const [delta, setDelta] = useState<IDelta>({} as IDelta);
  const [location, setLocation] = useState<ILocation | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  async function fetchLocation() {
    try {
      setIsLoading(true);

      const response = await api.post("/Equipamento/TrajetoApp", {
        codigoEquipamento: params.codigoEquipamento,
        codigoCliente: customer?.codigoCliente,
      });

      if (response.data[0].lat === -1 && response.data[0].lon === -1) {
        setLocation({
          ...response.data[0],
          lat: -25.4541998,
          lon: -49.2913508,
        });

        setDelta(
          calculateDelta([{ latitude: -25.4541998, longitude: -49.2913508 }]),
        );
      } else {
        setLocation(response.data[0]);

        setDelta(
          calculateDelta([
            { latitude: response.data[0].lat, longitude: response.data[0].lon },
          ]),
        );
      }
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchLocation();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Trajeto">
        <IconButton
          icon={<AntDesign name="reload1" color={colors.blue[700]} size={22} />}
          onPress={fetchLocation}
        />
      </HeaderDefault>

      {isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!isLoading && location && (
        <MapView
          zoomControlEnabled
          initialRegion={{
            latitude: location.lat,
            longitude: location.lon,
            latitudeDelta: delta.latitudeDelta,
            longitudeDelta: delta.longitudeDelta,
          }}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: location.lat,
              longitude: location.lon,
            }}
          />
        </MapView>
      )}
    </VStack>
  );
}
