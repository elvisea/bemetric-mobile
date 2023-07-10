import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import axios from "axios";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { IconButton, Text, VStack } from "native-base";
import { useNavigation } from "@react-navigation/native";

import MapView, { MapPressEvent, Marker, Circle } from "react-native-maps";

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
import { ILocation, IPointsInterest } from "./interfaces";

export function CreatePointsInterest() {
  const { colors } = THEME;

  const { customer } = useCustomer();
  const navigation = useNavigation();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [location, setLocation] = useState<ILocation | null>(null);

  const [pointInterest, setPointInterest] = useState<IPointsInterest>({
    incluir: true,
    codigoCliente: customer?.codigoCliente,
    nomePonto: "",
    descricao: "",
    raio: 100,
    latitude: null,
    longitude: null,
    alertaEntradaSaida: false,
    alertaPermanencia: false,
    alertaPermanenciaTempo: 0,
  } as IPointsInterest);

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;

    setPointInterest((oldState) => ({
      ...oldState,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));
  };

  const setStateDefault = () => {
    if (customer) {
      setPointInterest({
        incluir: true,
        codigoCliente: customer.codigoCliente,
        nomePonto: "",
        descricao: "",
        raio: 100,
        latitude: null,
        longitude: null,
        alertaEntradaSaida: false,
        alertaPermanencia: false,
        alertaPermanenciaTempo: 0,
      });
    }
  };

  const hancleCloseModal = () => {
    setStateDefault();
    setIsOpenModal(!isOpenModal);
  };

  const handleValueChange = (value: number) => {
    setPointInterest((oldState) => ({ ...oldState, raio: value }));
  };

  const handleSavePointInterest = async () => {
    const data = pointInterest;

    if (!data.alertaPermanencia) delete data.alertaPermanenciaTempo;

    try {
      const response = await api.post("/PontoInteresse/Gravar", data);
      if (response.data === 0) {
        Alert.alert(responses[response.data], responses[response.data], [
          {
            text: "Visualizar Pontos de Interesse",
            onPress: () => navigation.navigate("PointsInterest"),
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
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setLocation({
        latitude: -23.5505,
        longitude: -46.6333,
      });
    }

    if (status === "granted") {
      const { coords } = await getCurrentPositionAsync();

      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
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
      }
    );
  }, []);

  return (
    <>
      <GenericModal
        title="Criar Ponto de Interesse"
        isOpen={isOpenModal}
        closeModal={hancleCloseModal}
      >
        <Input
          mb={4}
          value={pointInterest.nomePonto}
          onChangeText={(text) =>
            setPointInterest((oldState) => ({
              ...oldState,
              nomePonto: text,
            }))
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
          value={pointInterest.descricao}
          onChangeText={(text) =>
            setPointInterest((oldState) => ({ ...oldState, descricao: text }))
          }
          color={"#363636"}
          _focus={{ borderColor: "blue.700", bg: "white" }}
          variant="outline"
          placeholder="Descrição"
          fontSize="14px"
          borderBottomColor="blue.700"
          placeholderTextColor={"blue.700"}
        />

        <Text fontSize={14} mt="16px" mb="12px" color={THEME.colors.blue[700]}>
          {`Raio ${pointInterest.raio} m`}
        </Text>

        <Slider
          step={1}
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={1000}
          value={pointInterest.raio}
          onValueChange={handleValueChange}
          minimumTrackTintColor={THEME.colors.blue[700]}
          maximumTrackTintColor="#C6C6C6"
          thumbTintColor={THEME.colors.blue[700]}
        />

        <Text fontSize={14} mt="16px">
          Alertas de marcador
        </Text>

        <Text fontSize={12} mb="16px">
          Gerar alerta de evento
        </Text>

        <ContainerCheckbox mb={8}>
          <Checkbox
            style={styles.checkbox}
            value={pointInterest.alertaEntradaSaida}
            onValueChange={(value) =>
              setPointInterest((oldState) => ({
                ...oldState,
                alertaEntradaSaida: value,
              }))
            }
            color={
              pointInterest.alertaEntradaSaida
                ? THEME.colors.blue[700]
                : undefined
            }
          />
          <Text style={styles.paragraph}>Entrada e Saída</Text>
        </ContainerCheckbox>

        <ContainerCheckbox mb={8} style={{ justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Checkbox
              style={styles.checkbox}
              value={pointInterest.alertaPermanencia}
              onValueChange={(value) =>
                setPointInterest((oldState) => ({
                  ...oldState,
                  alertaPermanencia: value,
                }))
              }
              color={
                pointInterest.alertaPermanencia
                  ? THEME.colors.blue[700]
                  : undefined
              }
            />
            <Text style={styles.paragraph}>Permanência</Text>
          </View>

          <TextInput
            keyboardType="numeric"
            value={
              pointInterest.alertaPermanenciaTempo
                ? pointInterest.alertaPermanenciaTempo.toString()
                : ""
            }
            onChangeText={(text) =>
              setPointInterest((oldState) => ({
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
            editable={pointInterest.alertaPermanencia}
          />
        </ContainerCheckbox>

        <Button
          title="Salvar"
          w="full"
          h="58px"
          mt="24px"
          onPress={handleSavePointInterest}
        />
      </GenericModal>

      <VStack flex={1} width="full" bg={colors.shape}>
        <HeaderDefault title="Ponto de Interesse">
          <IconButton
            icon={<Feather name="delete" size={22} color={colors.blue[700]} />}
            onPress={() =>
              setPointInterest((oldState) => ({
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
            {pointInterest.latitude && pointInterest.longitude && (
              <>
                <Circle
                  center={{
                    latitude: pointInterest.latitude,
                    longitude: pointInterest.longitude,
                  }}
                  radius={pointInterest.raio}
                  fillColor="rgba(160, 198, 229, 0.3)"
                  strokeColor="rgba(0, 105, 192, 1)"
                  strokeWidth={2}
                />

                <Marker
                  coordinate={{
                    latitude: pointInterest.latitude,
                    longitude: pointInterest.longitude,
                  }}
                />
              </>
            )}
          </MapView>
        )}

        {pointInterest.latitude && pointInterest.longitude && (
          <ButtonFull title="Criar" onPress={() => setIsOpenModal(true)} />
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
