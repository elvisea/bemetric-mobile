import React, { useCallback, useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { HStack, IconButton, Text, VStack } from "native-base";
import MapView, { Circle, MapPressEvent, Marker } from "react-native-maps";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { ContainerCheckbox } from "./styles";
import { getDeltaFromRadius } from "../utils";

import { IPointsInterest } from "./types";
import { deleteResponse, updateResponse } from "./responses";

interface IParams {
  codigoPontoInteresse: number;
}

export function UpdatePointsInterest() {
  const { colors } = THEME;

  const route = useRoute();
  const navigation = useNavigation();

  const { codigoPontoInteresse } = route.params as IParams;

  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [pointInterest, setPointInterest] = useState<IPointsInterest | null>(
    null
  );

  const [newPointInterest, setNewPointInterest] = useState<IPointsInterest>(
    {} as IPointsInterest
  );

  const handleDeletePointsInterest = async () => {
    try {
      if (pointInterest) {
        const response = await api.delete("/PontoInteresse/Excluir", {
          data: { codigoPontoInteresse: codigoPontoInteresse },
        });

        if (response.data === 0) {
          Alert.alert(
            deleteResponse[response.data],
            deleteResponse[response.data],
            [
              {
                text: "Visualizar Pontos de Interesse",
                onPress: () => navigation.navigate("PointsInterest"),
              },
            ]
          );
        }

        if (response.data !== 0) {
          Alert.alert(
            deleteResponse[response.data],
            deleteResponse[response.data]
          );
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const handleValueChange = (value: number) => {
    setNewPointInterest((oldState) => ({ ...oldState, raio: value }));
  };

  const setStateDefault = () => {
    setNewPointInterest({} as IPointsInterest);
    setIsOpenModal(false);

    setIsEditMode(false);
  };

  const hancleCloseModal = () => setStateDefault();

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;

    setNewPointInterest((oldState) => ({
      ...oldState,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));
  };

  const handleUpdatePointInterest = async () => {
    const data = newPointInterest;

    if (!data.alertaPermanencia) delete data.alertaPermanenciaTempo;

    try {
      const response = await api.post("/PontoInteresse/Gravar", data);

      if (response.data === 0) {
        setStateDefault();

        Alert.alert(
          updateResponse[response.data],
          updateResponse[response.data],
          [
            {
              text: "Visualizar Pontos de Interesse",
              onPress: () => navigation.navigate("PointsInterest"),
            },
          ]
        );
      }

      if (response.data === 1) {
        Alert.alert(
          updateResponse[response.data],
          updateResponse[response.data]
        );
        setStateDefault();
        setIsOpenModal(false);
      }

      if (response.data === 2) {
        Alert.alert(
          updateResponse[response.data],
          updateResponse[response.data]
        );
      }

      if (response.data === 3) {
        Alert.alert(
          updateResponse[response.data],
          updateResponse[response.data]
        );
        setStateDefault();
        setIsOpenModal(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const handlePressEditMode = () => {
    setIsEditMode(true);
    setNewPointInterest(
      pointInterest ? pointInterest : ({} as IPointsInterest)
    );
  };

  const fetchPointsInterest = async () => {
    setIsLoading(true);

    try {
      const { data } = await api.post<IPointsInterest[]>(
        "/PontoInteresse/ObterLista",
        {
          codigoPontoInteresse,
        }
      );

      setPointInterest(data[0]);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchPointsInterest();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <>
      {newPointInterest.nomePonto && (
        <GenericModal
          title="Editar Ponto de Interesse"
          isOpen={isOpenModal}
          closeModal={hancleCloseModal}
        >
          <Input
            mb={4}
            value={newPointInterest.nomePonto}
            onChangeText={(text) =>
              setNewPointInterest((oldState) => ({
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
            value={newPointInterest.descricao}
            onChangeText={(text) =>
              setNewPointInterest((oldState) => ({
                ...oldState,
                descricao: text,
              }))
            }
            color={"#363636"}
            _focus={{ borderColor: "blue.700", bg: "white" }}
            variant="outline"
            placeholder="Descrição"
            fontSize="14px"
            borderBottomColor="blue.700"
            placeholderTextColor={"blue.700"}
          />

          <Text
            fontSize={14}
            mt="16px"
            mb="12px"
            color={THEME.colors.blue[700]}
          >
            {`Raio ${newPointInterest.raio} m`}
          </Text>

          <Slider
            step={1}
            style={{ width: "100%" }}
            minimumValue={0}
            maximumValue={1000}
            value={newPointInterest.raio}
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
              value={newPointInterest.alertaEntradaSaida}
              onValueChange={(value) =>
                setNewPointInterest((oldState) => ({
                  ...oldState,
                  alertaEntradaSaida: value,
                }))
              }
              color={
                newPointInterest.alertaEntradaSaida
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
                value={newPointInterest.alertaPermanencia}
                onValueChange={(value) =>
                  setNewPointInterest((oldState) => ({
                    ...oldState,
                    alertaPermanencia: value,
                  }))
                }
                color={
                  newPointInterest.alertaPermanencia
                    ? THEME.colors.blue[700]
                    : undefined
                }
              />
              <Text style={styles.paragraph}>Permanência</Text>
            </View>

            <TextInput
              keyboardType="numeric"
              value={
                newPointInterest.alertaPermanenciaTempo
                  ? newPointInterest.alertaPermanenciaTempo.toString()
                  : ""
              }
              onChangeText={(text) =>
                setNewPointInterest((oldState) => ({
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
              editable={newPointInterest.alertaPermanencia}
            />
          </ContainerCheckbox>

          <Button
            title="Salvar"
            w="full"
            h="58px"
            mt="24px"
            onPress={handleUpdatePointInterest}
          />
        </GenericModal>
      )}

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
              onPress={handleDeletePointsInterest}
            />
          </HStack>
        </HeaderDefault>

        {isLoading && <LoadingSpinner color={colors.blue[700]} />}

        {!isLoading && pointInterest && (
          <MapView
            style={{ flex: 1 }}
            onPress={
              isEditMode
                ? handleMapPress
                : () => console.log(`Edit Mode: ${isEditMode}`)
            }
            zoomControlEnabled
            initialRegion={{
              latitude: pointInterest.latitude,
              longitude: pointInterest.longitude,
              latitudeDelta: getDeltaFromRadius(
                {
                  latitude: pointInterest.latitude,
                  longitude: pointInterest.longitude,
                },
                pointInterest.raio
              ).latitude,
              longitudeDelta: getDeltaFromRadius(
                {
                  latitude: pointInterest.latitude,
                  longitude: pointInterest.longitude,
                },
                pointInterest.raio
              ).longitude,
            }}
          >
            <Circle
              center={{
                latitude: !isEditMode
                  ? pointInterest.latitude
                  : newPointInterest.latitude,
                longitude: !isEditMode
                  ? pointInterest.longitude
                  : newPointInterest.longitude,
              }}
              radius={!isEditMode ? pointInterest.raio : newPointInterest.raio}
              fillColor="rgba(160, 198, 229, 0.3)"
              strokeColor="rgba(0, 105, 192, 1)"
              strokeWidth={2}
            />

            <Marker
              coordinate={{
                latitude: !isEditMode
                  ? pointInterest.latitude
                  : newPointInterest.latitude,
                longitude: !isEditMode
                  ? pointInterest.longitude
                  : newPointInterest.longitude,
              }}
            />
          </MapView>
        )}

        {isEditMode && (
          <ButtonFull title="Editar" onPress={() => setIsOpenModal(true)} />
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
