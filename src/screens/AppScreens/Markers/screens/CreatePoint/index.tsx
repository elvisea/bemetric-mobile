import React, { useCallback, useRef, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { IconButton, Text, VStack } from "native-base";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import MapView, { Marker, Circle } from "react-native-maps";

import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { useCustomer } from "@hooks/customer";

import { Coord } from "../../types";

import { initialState } from "./constants";
import { ContainerCheckbox } from "./styles";
import { transformPointForSubmission } from "./functions";

export function CreatePoint() {
  const { colors } = THEME;

  const { customer } = useCustomer();
  const navigation = useNavigation();

  const mapRef = useRef<MapView>(null);

  const [state, setState] = useState(initialState);

  const animateCamera = (coord: Coord) => {
    mapRef.current?.animateCamera({
      center: { latitude: coord.latitude, longitude: coord.longitude },
    });
  };

  const closeModal = async () => {
    const { coords } = await getCurrentPositionAsync();
    setState({
      ...initialState,
      point: {
        ...initialState.point,
        coord: { latitude: coords.latitude, longitude: coords.longitude },
      },
    });

    animateCamera({ latitude: coords.latitude, longitude: coords.longitude });
  };

  const cleanPoint = async () => {
    const { coords } = await getCurrentPositionAsync();

    setState((prevState) => ({
      ...prevState,
      point: {
        ...prevState.point,
        coord: { latitude: coords.latitude, longitude: coords.longitude },
      },
    }));

    animateCamera({ latitude: coords.latitude, longitude: coords.longitude });
  };

  const savePoint = async () => {
    if (customer) {
      const data = transformPointForSubmission(
        state.point,
        customer.codigoCliente,
      );

      try {
        const response = await api.post("/PontoInteresse/Gravar", data);

        const message = state.responses[response.data];

        if (message) {
          if (response.data === 0) {
            Alert.alert(message.title, message.subtitle, [
              {
                text: message.text,
                onPress: () => {
                  navigation.navigate("Points");
                  setState(initialState);
                },
              },
            ]);
          } else {
            Alert.alert(message.title, message.subtitle);
          }
        } else {
          Alert.alert(state.responses[4].title, state.responses[4].subtitle);
        }
      } catch (error) {
        Alert.alert(state.responses[5].title, state.responses[5].subtitle);
      } finally {
      }
    }
  };

  const onValueChange = (
    value: number | string | boolean | Coord,
    key: keyof typeof state.point,
  ) => {
    setState((prevState) => ({
      ...prevState,
      point: { ...prevState.point, [key]: value },
    }));

    if (typeof value === "object") {
      setState((prevState) => ({ ...prevState, touchedMap: true }));
      animateCamera({ latitude: value.latitude, longitude: value.longitude });
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await requestForegroundPermissionsAsync();

    if (status === "granted") {
      const { coords } = await getCurrentPositionAsync();

      setState((prevState) => ({
        ...prevState,
        point: {
          ...prevState.point,
          coord: { latitude: coords.latitude, longitude: coords.longitude },
        },
      }));

      animateCamera({ latitude: coords.latitude, longitude: coords.longitude });
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) requestLocationPermission();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <>
      <GenericModal
        title="Criar Ponto de Interesse"
        isOpen={state.isOpenModal}
        closeModal={closeModal}
      >
        <Input
          mb={4}
          value={state.point.name}
          onChangeText={(text) => onValueChange(text, "name")}
          color={"#363636"}
          _focus={{ borderColor: "blue.700", bg: "white" }}
          variant="outline"
          placeholder="Nome"
          fontSize="14px"
          borderBottomColor="blue.700"
          placeholderTextColor={"blue.700"}
        />

        <Input
          value={state.point.description}
          onChangeText={(text) => onValueChange(text, "description")}
          color={"#363636"}
          _focus={{ borderColor: "blue.700", bg: "white" }}
          variant="outline"
          placeholder="Descrição"
          fontSize="14px"
          borderBottomColor="blue.700"
          placeholderTextColor={"blue.700"}
        />

        <Text fontSize={14} mt="16px" mb="12px" color={THEME.colors.blue[700]}>
          {`Raio ${state.point.radius} m`}
        </Text>

        <Slider
          step={1}
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={1000}
          value={state.point.radius}
          onValueChange={(value) => onValueChange(value, "radius")}
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
            value={state.point.alert}
            onValueChange={(value) => onValueChange(value, "alert")}
            color={state.point.alert ? THEME.colors.blue[700] : undefined}
          />
          <Text style={styles.paragraph}>Entrada e Saída</Text>
        </ContainerCheckbox>

        <ContainerCheckbox mb={8} style={{ justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Checkbox
              style={styles.checkbox}
              value={state.point.permanence}
              onValueChange={(value) => onValueChange(value, "permanence")}
              color={
                state.point.permanence ? THEME.colors.blue[700] : undefined
              }
            />
            <Text style={styles.paragraph}>Permanência</Text>
          </View>

          <TextInput
            keyboardType="numeric"
            value={state.point.duration ? state.point.duration.toString() : ""}
            onChangeText={(text) => onValueChange(text, "duration")}
            textAlign="center"
            placeholder="min"
            style={{
              width: 40,
              padding: 0,
              borderBottomWidth: 1,
              borderBottomColor: THEME.colors.blue[700],
            }}
            editable={state.point.permanence}
          />
        </ContainerCheckbox>

        <Button
          title="Salvar"
          w="full"
          h="58px"
          mt="24px"
          onPress={savePoint}
        />
      </GenericModal>

      <VStack flex={1} width="full" bg={colors.shape}>
        <HeaderDefault title="Ponto de Interesse">
          <IconButton
            icon={<Feather name="delete" size={22} color={colors.blue[700]} />}
            onPress={cleanPoint}
          />
        </HeaderDefault>

        <MapView
          ref={mapRef}
          style={{ flex: 1 }}
          loadingEnabled
          onPress={({ nativeEvent: { coordinate } }) =>
            onValueChange(coordinate, "coord")
          }
          zoomControlEnabled
          initialRegion={{
            latitude: state.point.coord.latitude,
            longitude: state.point.coord.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {state.touchedMap && (
            <Circle
              center={state.point.coord}
              radius={state.point.radius}
              fillColor={colors.FILL_COLOR}
              strokeColor={colors.STROKE_COLOR}
              strokeWidth={2}
            />
          )}

          {state.touchedMap && <Marker coordinate={state.point.coord} />}
        </MapView>

        {state.touchedMap && (
          <ButtonFull
            title="Criar"
            onPress={() =>
              setState((prevState) => ({ ...prevState, isOpenModal: true }))
            }
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
    color: THEME.colors.gray[250],
  },
  checkbox: {
    marginRight: 16,
    color: THEME.colors.blue[700],
  },

  input: {
    width: 40,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.blue[700],
  },
});
