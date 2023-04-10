import { FlatList } from "react-native";
import { useCallback, useState } from "react";
import { Feather } from "@expo/vector-icons";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { IconButton, VStack } from "native-base";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { GeofenceCard } from "@components/GeofenceCard";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

interface IGeofences {
  descricao: string;
  nomeGeocerca: string;
  codigoGeocerca: number;
}

export function Geofences() {
  const { customer } = useCustomer();
  const navigation = useNavigation();
  const { colors } = THEME;

  const [isLoading, setIsLoading] = useState(false);
  const [geofences, setGeofences] = useState<IGeofences[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        setIsLoading(true);

        try {
          if (customer) {
            const response = await api.post("/Geocerca/ObterListaGeocercaApp", {
              codigoCliente: customer.codigoCliente,
            });

            if (response.data === 204) {
              setGeofences([]);
            } else {
              setGeofences(response.data);
            }
          }
        } catch (error) {
          if (axios.isAxiosError(error)) console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} w="full" bg={colors.shape}>
      <HeaderDefault title="Geocerca">
        <IconButton
          icon={
            <Feather name="plus-circle" size={22} color={colors.blue[700]} />
          }
          onPress={() => navigation.navigate("CreateGeofence")}
        />
      </HeaderDefault>

      {isLoading && <LoadingSpinner color={colors.blue[700]} />}

      {geofences.length > 0 && !isLoading && (
        <FlatList
          data={geofences}
          keyExtractor={(item) => item.codigoGeocerca.toString()}
          style={{ width: "100%", padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: geofence }) => (
            <GeofenceCard
              title={geofence.nomeGeocerca}
              description={geofence.descricao}
              onPress={() =>
                navigation.navigate("UpdateGeofences", {
                  codigoGeocerca: geofence.codigoGeocerca,
                })
              }
            />
          )}
        />
      )}
    </VStack>
  );
}
