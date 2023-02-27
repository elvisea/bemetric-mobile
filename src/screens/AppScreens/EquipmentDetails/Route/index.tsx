import React, { useCallback, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { IconButton, VStack } from "native-base";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";

import { HeaderDefault } from "@components/HeaderDefault";

import axios from "axios";
import api from "@services/api";

import { styles } from "./styles";
import { THEME } from "@theme/theme";

interface IParams {
  params: {
    codigoEquipamento: number;
  };
}

interface ILocation {
  lat: number;
  lon: number;
  status: number;
  velocidade: number;
}

export function Route() {
  const route = useRoute();
  const { colors } = THEME;
  const { params } = route.params as IParams;
  console.log("Route Screen Params:", params);

  const [location, setLocation] = useState<ILocation | null>(null);

  async function fetchLocation() {
    try {
      const response = await api.post("/Equipamento/TrajetoApp", {
        codigoEquipamento: params.codigoEquipamento,
      });

      setLocation(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log("Error:", error);
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
