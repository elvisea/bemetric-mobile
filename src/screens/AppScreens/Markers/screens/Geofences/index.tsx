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
import { initialState } from "./constants";

import { normalizeGeofences } from "../../functions";

export function Geofences() {
  const { colors } = THEME;

  const { customer } = useCustomer();
  const navigation = useNavigation();

  const [state, setState] = useState(initialState);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          setState((prevState) => ({ ...prevState, isLoading: true }));

          if (customer) {
            const response = await api.post("/Geocerca/ObterListaGeocercaApp", {
              codigoCliente: customer.codigoCliente,
            });

            const geofences = normalizeGeofences(response.data);

            setState((prevState) => ({ ...prevState, geofences: geofences }));
          }
        } catch (error) {
          Alert.alert(
            "Erro de Comunicação",
            "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
          );
        } finally {
          setState((prevState) => ({ ...prevState, isLoading: false }));
        }
      }

      isActive && fetchData();

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

      {state.isLoading && <LoadingSpinner color={colors.blue[700]} />}

      {!state.isLoading && (
        <FlatList
          data={state.geofences}
          keyExtractor={(item) => item.id}
          style={{ width: "100%", padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: geofence }) => (
            <MarkerCard
              title={geofence.name}
              icon={
                <Entypo name="location" size={28} color={colors.blue[700]} />
              }
              description={geofence.description}
              onPress={() =>
                navigation.navigate("Geofence", {
                  codigoGeocerca: geofence.code,
                })
              }
            />
          )}
        />
      )}
    </Container>
  );
}
