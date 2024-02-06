import { Alert, FlatList } from "react-native";
import { useCallback, useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";

import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { IconButton } from "native-base";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { MarkerCard } from "@components/MarkerCard";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { Container } from "./styles";

interface IGeofence {
  descricao: string;
  nomeGeocerca: string;
  codigoGeocerca: number;
}

export function Geofences() {
  const { colors } = THEME;

  const { customer } = useCustomer();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [geofences, setGeofences] = useState<IGeofence[]>([]);

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
          Alert.alert(
            "Erro de Comunicação",
            "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
          );
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <Container>
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
            <MarkerCard
              title={geofence.nomeGeocerca}
              icon={
                <Entypo name="location" size={28} color={colors.blue[700]} />
              }
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
    </Container>
  );
}
