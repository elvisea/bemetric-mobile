import { Alert } from "react-native";
import React, { useCallback, useState } from "react";

import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { IconButton, VStack } from "native-base";
import MapView, { Marker } from "react-native-maps";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { HeaderDefault } from "@components/HeaderDefault";

import { styles } from "./styles";
import { IParams } from "../interfaces/IEquipamentDetails";

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

  const [location, setLocation] = useState<ILocation | null>(null);

  async function fetchLocation() {
    try {
      const response = await api.post("/Equipamento/TrajetoApp", {
        codigoEquipamento: params.codigoEquipamento,
        codigoCliente: customer?.codigoCliente,
      });

      // Inicialmente retornava um Objeto. Agora volta uma Lista.
      // Testar se está ok novo retorno.

      setLocation(response.data[0]);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchLocation();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Trajeto">
        <IconButton
          icon={<AntDesign name="reload1" color={colors.blue[700]} size={22} />}
          onPress={fetchLocation}
        />
      </HeaderDefault>

      {location && (
        <MapView
          zoomControlEnabled
          initialRegion={{
            latitude: location.lat,
            longitude: location.lon,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
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
