import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import { IconButton, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import MapView, { MapPressEvent, Polygon, Marker } from "react-native-maps";

import {
  LocationAccuracy,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { ContainerCheckbox } from "./styles";

import { responses } from "./constants/responses";
import { IGeofence, IPontoGeocerca } from "./interfaces";

export function CreateGeofence() {
  const { colors } = THEME;
  const { customer } = useCustomer();

  const navigation = useNavigation();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [location, setLocation] = useState<IPontoGeocerca | null>(null);

  const [geofence, setGeofence] = useState<IGeofence>({
    incluir: true,
    codigoCliente: customer?.codigoCliente,
    alertaVelocidadeQuilometro: 0,
    alertaPermanenciaTempo: 0,
    alertaPermanencia: false,
    alertaVelocidade: false,
    listaPontosGeocerca: [],
  } as IGeofence);

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;

    setGeofence((oldState) => ({
      ...oldState,
      listaPontosGeocerca: [...oldState.listaPontosGeocerca, coordinate],
    }));
  };

  const setStateDefault = () => {
    if (customer) {
      setGeofence({
        incluir: true,
        codigoCliente: customer.codigoCliente,
        alertaVelocidadeQuilometro: 0,
        alertaPermanenciaTempo: 0,
        alertaPermanencia: false,
        alertaVelocidade: false,
        listaPontosGeocerca: [],
        alertaEntradaSaida: false,
        descricao: "",
        nomeGeocerca: "",
      });
    }
  };

  const hancleCloseModal = () => {
    setStateDefault();
    setIsOpenModal(!isOpenModal);
  };

  const handleSaveGeofence = async () => {
    const data = geofence;

    if (!data.alertaVelocidade) delete data.alertaVelocidadeQuilometro;
    if (!data.alertaPermanencia) delete data.alertaPermanenciaTempo;

    try {
      const response = await api.post("Geocerca/Gravar", data);

      if (response.data === 0) {
        Alert.alert(responses[response.data], responses[response.data], [
          {
            text: "Visualizar Geocercas",
            onPress: () => navigation.navigate("Geofences"),
          },
        ]);

        setStateDefault();
        setIsOpenModal(false);
      }

      if (response.data === 1) {
        Alert.alert(responses[response.data], responses[response.data]);

        setStateDefault();
        setIsOpenModal(false);
      }

      if (response.data === 2) {
        Alert.alert(responses[response.data], responses[response.data]);
      }

      if (response.data === 3) {
        Alert.alert(responses[response.data], responses[response.data]);

        setStateDefault();
        setIsOpenModal(false);
      }
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLocation({ latitude: -23.5505, longitude: -46.6333 });
    }

    if (status === "granted") {
      const { coords } = await getCurrentPositionAsync();
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 10000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation({
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        });
      },
    );
  }, []);

  return (
    <>
      <GenericModal
        title="Criar Geocerca"
        isOpen={isOpenModal}
        closeModal={hancleCloseModal}
      >
        <Input
          mb={4}
          value={geofence.nomeGeocerca}
          onChangeText={(text) =>
            setGeofence((oldState) => ({ ...oldState, nomeGeocerca: text }))
          }
          color={"#363636"}
          _focus={{ borderColor: "blue.700", bg: "white" }}
          variant="outline"
          placeholder="Nome"
          fontSize="14px"
          borderBottomColor="blue.700"
          placeholderTextColor={"blue.700"}
        />

        <Input
          value={geofence.descricao}
          onChangeText={(text) =>
            setGeofence((oldState) => ({ ...oldState, descricao: text }))
          }
          color={"#363636"}
          _focus={{ borderColor: "blue.700", bg: "white" }}
          variant="outline"
          placeholder="Descrição"
          fontSize="14px"
          borderBottomColor="blue.700"
          placeholderTextColor={"blue.700"}
        />

        <Text fontSize={14} mt="16px">
          Alertas de marcador
        </Text>

        <Text fontSize={12} mb="8px">
          Gerar alerta de evento
        </Text>

        <ContainerCheckbox mb={8}>
          <Checkbox
            style={styles.checkbox}
            value={geofence.alertaEntradaSaida}
            onValueChange={(value) =>
              setGeofence((oldState) => ({
                ...oldState,
                alertaEntradaSaida: value,
              }))
            }
            color={
              geofence.alertaEntradaSaida ? THEME.colors.blue[700] : undefined
            }
          />
          <Text style={styles.paragraph}>Entrada e Saída</Text>
        </ContainerCheckbox>

        <ContainerCheckbox mb={8} style={{ justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Checkbox
              style={styles.checkbox}
              value={geofence.alertaPermanencia}
              onValueChange={(value) =>
                setGeofence((oldState) => ({
                  ...oldState,
                  alertaPermanencia: value,
                }))
              }
              color={
                geofence.alertaPermanencia ? THEME.colors.blue[700] : undefined
              }
            />
            <Text style={styles.paragraph}>Permanência</Text>
          </View>

          <TextInput
            keyboardType="numeric"
            value={
              geofence.alertaPermanenciaTempo
                ? geofence.alertaPermanenciaTempo.toString()
                : ""
            }
            onChangeText={(text) =>
              setGeofence((oldState) => ({
                ...oldState,
                alertaPermanenciaTempo: Number(text),
              }))
            }
            textAlign="center"
            placeholder="min"
            style={{
              width: 40,
              padding: 0,
              borderBottomWidth: 1,
              borderBottomColor: THEME.colors.blue[700],
            }}
            editable={geofence.alertaPermanencia}
          />
        </ContainerCheckbox>

        <ContainerCheckbox mb={0} style={{ justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Checkbox
              style={styles.checkbox}
              value={geofence.alertaVelocidade}
              onValueChange={(value) =>
                setGeofence((oldState) => ({
                  ...oldState,
                  alertaVelocidade: value,
                }))
              }
              color={
                geofence.alertaVelocidade ? THEME.colors.blue[700] : undefined
              }
            />
            <Text style={styles.paragraph}>Velocidade no perímetro</Text>
          </View>

          <TextInput
            keyboardType="numeric"
            value={
              geofence.alertaVelocidadeQuilometro
                ? geofence.alertaVelocidadeQuilometro.toString()
                : ""
            }
            onChangeText={(text) =>
              setGeofence((oldState) => ({
                ...oldState,
                alertaVelocidadeQuilometro: Number(text),
              }))
            }
            maxLength={3}
            textAlign="center"
            placeholder="km/h"
            style={styles.input}
            editable={geofence.alertaVelocidade}
          />
        </ContainerCheckbox>

        <Button
          title="Salvar"
          w="full"
          h="58px"
          mt="24px"
          onPress={handleSaveGeofence}
        />
      </GenericModal>

      <VStack flex={1} width="full" bg={colors.shape}>
        <HeaderDefault title="Geocerca">
          <IconButton
            icon={<Feather name="delete" size={22} color={colors.blue[700]} />}
            onPress={() =>
              setGeofence((oldState) => ({
                ...oldState,
                listaPontosGeocerca: [],
              }))
            }
          />
        </HeaderDefault>

        {!location && <LoadingSpinner color={colors.blue[700]} />}

        {location && (
          <MapView
            style={{ flex: 1 }}
            onPress={handleMapPress}
            zoomControlEnabled
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            {geofence.listaPontosGeocerca.length > 0 && (
              <>
                <Polygon
                  coordinates={geofence.listaPontosGeocerca}
                  fillColor="rgba(160, 198, 229, 0.3)"
                  strokeColor="rgba(0, 105, 192, 1)"
                  strokeWidth={2}
                />

                {geofence.listaPontosGeocerca.map((location, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: location.latitude,
                      longitude: location.longitude,
                    }}
                  />
                ))}
              </>
            )}
          </MapView>
        )}

        {geofence.listaPontosGeocerca.length > 2 && (
          <ButtonFull
            disabled={geofence.listaPontosGeocerca.length < 2}
            title="Criar"
            onPress={() => setIsOpenModal(true)}
          />
        )}
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
    color: "#717171",
  },
  checkbox: {
    marginRight: 16,
    color: "#0069C0",
  },

  input: {
    width: 40,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.blue[700],
  },
});
