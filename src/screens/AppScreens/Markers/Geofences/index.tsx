import { FlatList, TouchableOpacity } from "react-native";
import { useCallback, useState } from "react";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import axios from "axios";
import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";
import AddGeofence from "@assets/add-geocerca.svg";

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

  const [geofences, setGeofences] = useState<IGeofences[] | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          if (customer) {
            const response = await api.post("/Geocerca/ObterListaGeocercaApp", {
              codigoCliente: customer.codigoCliente,
            });

            isActive && setGeofences(response.data);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) console.log(error);
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} w="full" bg="white">
      <HeaderDefault title="Geocerca">
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <AddGeofence />
          <Text ml={"12px"} color={colors.blue[700]}>
            Criar
          </Text>
        </TouchableOpacity>
      </HeaderDefault>
      <VStack flex={1} w="full" p={`${RFValue(16)}px`}>
        {!geofences && <LoadingSpinner color={colors.blue[700]} />}

        {geofences && (
          <FlatList
            data={geofences}
            keyExtractor={(item) => item.codigoGeocerca.toString()}
            style={{ width: "100%" }}
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
    </VStack>
  );
}
