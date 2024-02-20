import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import MapView, { Circle, Marker } from "react-native-maps";
import { HStack, IconButton, Text, VStack } from "native-base";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { Coord } from "../../types";
import { getDeltaFromRadius } from "../../functions";

import { Params } from "./types";
import { ContainerCheckbox } from "./styles";

import { initialState, url } from "./constants";
import { normalizeReceivedPoint, transformDataSend } from "./functions";

export function Point() {
  const { colors } = THEME;

  const route = useRoute();
  const navigation = useNavigation();

  const { codigoPontoInteresse } = route.params as Params;

  const [state, setState] = useState(initialState);

  const onValueChange = useCallback(
    (
      value: number | string | boolean | Coord,
      key: keyof typeof state.updatedPoint,
    ) => {
      if (state.isEditMode) {
        setState((prevState) => ({
          ...prevState,
          updatedPoint: { ...prevState.updatedPoint, [key]: value },
        }));
      }
    },
    [state.isEditMode],
  );

  const deletePoint = async () => {
    try {
      const response = await api.delete(url.delete, {
        data: { codigoPontoInteresse: codigoPontoInteresse },
      });

      const message = state.responses.delete[response.data];

      if (message) {
        if (response.data === 0) {
          Alert.alert(message.title, message.subtitle, [
            {
              text: message.text,
              onPress: () => navigation.navigate("Points"),
            },
          ]);
        } else {
          Alert.alert(message.title, message.subtitle);
        }
      } else {
        Alert.alert(
          state.responses.delete[3].title,
          state.responses.delete[3].subtitle,
        );
      }
    } catch (error) {
      Alert.alert(
        state.responses.delete[4].title,
        state.responses.delete[4].subtitle,
      );
    }
  };

  const hancleCloseModal = () => {
    setState((prevState) => ({
      ...prevState,
      isEditMode: false,
      isOpenModal: false,
    }));
  };

  const updatePoint = async () => {
    try {
      const data = transformDataSend(state.updatedPoint);

      const response = await api.post(url.update, data);

      const message = state.responses.update[response.data];

      if (message) {
        if (response.data === 0) {
          Alert.alert(message.title, message.subtitle, [
            {
              text: message.text,
              onPress: () => navigation.navigate("Points"),
            },
          ]);
        } else {
          Alert.alert(message.title, message.subtitle);
        }
      } else {
        Alert.alert(
          state.responses.update[4].title,
          state.responses.update[4].subtitle,
        );
      }
    } catch (error) {
      Alert.alert(
        state.responses.update[5].title,
        state.responses.update[5].subtitle,
      );
    } finally {
      setState((prevState) => ({ ...prevState, isOpenModal: false }));
    }
  };

  const handlePressEditMode = () => {
    setState((prevState) => ({ ...prevState, isEditMode: true }));
  };

  const fetchPoint = async () => {
    try {
      setState((prevState) => ({ ...prevState, isLoading: true }));

      const response = await api.post(url.list, { codigoPontoInteresse });

      const normalizedPoint = normalizeReceivedPoint(response.data[0]);

      const delta = getDeltaFromRadius(
        normalizedPoint.coord,
        normalizedPoint.radius,
      );

      setState((prevState) => ({
        ...prevState,
        point: normalizedPoint,
        updatedPoint: normalizedPoint,
        initialRegion: {
          latitude: normalizedPoint.coord.latitude,
          longitude: normalizedPoint.coord.longitude,
          latitudeDelta: delta.latitude,
          longitudeDelta: delta.longitude,
        },
      }));
    } catch (error) {
      Alert.alert(
        state.responses.update[5].title,
        state.responses.update[5].subtitle,
      );
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchPoint();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <>
      <GenericModal
        title="Editar Ponto de Interesse"
        isOpen={state.isOpenModal}
        closeModal={hancleCloseModal}
      >
        <Input
          mb={4}
          value={state.updatedPoint.name}
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
          value={state.updatedPoint.description}
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
          {`Raio ${state.updatedPoint.radius} m`}
        </Text>

        <Slider
          step={1}
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={1000}
          value={state.updatedPoint.radius}
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
            value={state.updatedPoint.alert}
            onValueChange={(value) => onValueChange(value, "alert")}
            color={
              state.updatedPoint.alert ? THEME.colors.blue[700] : undefined
            }
          />
          <Text style={styles.paragraph}>Entrada e Saída</Text>
        </ContainerCheckbox>

        <ContainerCheckbox mb={8} style={{ justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Checkbox
              style={styles.checkbox}
              value={state.updatedPoint.permanence}
              onValueChange={(value) => onValueChange(value, "permanence")}
              color={
                state.updatedPoint.permanence
                  ? THEME.colors.blue[700]
                  : undefined
              }
            />
            <Text style={styles.paragraph}>Permanência</Text>
          </View>

          <TextInput
            keyboardType="numeric"
            value={state.updatedPoint.duration?.toString()}
            onChangeText={(text) => onValueChange(text, "duration")}
            textAlign="center"
            placeholder="min"
            style={{
              width: 40,
              padding: 0,
              borderBottomWidth: 1,
              borderBottomColor: THEME.colors.blue[700],
            }}
            editable={state.updatedPoint.permanence}
          />
        </ContainerCheckbox>

        <Button
          title="Salvar"
          w="full"
          h="58px"
          mt="24px"
          onPress={updatePoint}
        />
      </GenericModal>

      <VStack flex={1} width="full" bg={colors.shape}>
        <HeaderDefault title="Ponto de Interesse">
          <HStack>
            <IconButton
              icon={<Feather name="edit" size={22} color={colors.blue[700]} />}
              onPress={handlePressEditMode}
            />
            <IconButton
              style={{ marginLeft: 8 }}
              icon={<Feather name="trash" size={22} color={colors.red[600]} />}
              onPress={deletePoint}
            />
          </HStack>
        </HeaderDefault>

        {state.isLoading && <LoadingSpinner color={colors.blue[700]} />}

        {!state.isLoading && state.point && (
          <MapView
            style={{ flex: 1 }}
            zoomControlEnabled
            initialRegion={state.initialRegion}
            onPress={({ nativeEvent: { coordinate } }) =>
              onValueChange(coordinate, "coord")
            }
          >
            <Circle
              center={
                state.isEditMode ? state.updatedPoint.coord : state.point.coord
              }
              radius={
                state.isEditMode
                  ? state.updatedPoint.radius
                  : state.point.radius
              }
              fillColor={colors.FILL_COLOR}
              strokeColor={colors.STROKE_COLOR}
              strokeWidth={2}
            />

            <Marker
              coordinate={
                state.isEditMode ? state.updatedPoint.coord : state.point.coord
              }
            />
          </MapView>
        )}

        {state.isEditMode && (
          <ButtonFull
            title="Editar"
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
