import { Alert, StyleSheet, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";

import MapView, { MapPressEvent, Marker, Polygon } from "react-native-maps";
import { HStack, IconButton, Text } from "native-base";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { ContainerCheckbox } from "../CreateGeofence/styles";

import { Container } from "./styles";
import { calculateDelta, calculateInitialRegion } from "../utils/";

import { responses } from "./constants/responses";
import { ICoordinate, IDelta, IGeofence, IParams } from "./interfaces";

export function UpdateGeofences() {
  const { colors } = THEME;

  const route = useRoute();
  const navigation = useNavigation();

  const { codigoGeocerca } = route.params as IParams;

  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [geofence, setGeofence] = useState<IGeofence>({} as IGeofence);

  const [coords, setCoords] = useState<ICoordinate[]>([]);
  const [newCoords, setNewCoords] = useState<ICoordinate[]>([]);

  const [delta, setDelta] = useState<IDelta>({} as IDelta);
  const [initialRegion, setInitialRegion] = useState<ICoordinate>(
    {} as ICoordinate,
  );

  const handleDeleteGeofence = async () => {
    try {
      if (geofence) {
        const response = await api.delete("/Geocerca/Excluir", {
          data: { codigoGeocerca: codigoGeocerca },
        });

        if (response.data === 0 || 1 || 2) {
          Alert.alert(responses[response.data], responses[response.data], [
            {
              text: "Visualizar Geocercas",
              onPress: () => navigation.navigate("Geofences"),
            },
          ]);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const setStateDefault = () => {
    setNewCoords([]);
    setIsEditMode(false);
  };

  const handleUpdateGeofence = async () => {
    const data = geofence;

    data.incluir = false;
    data.listaPontosGeocerca =
      newCoords.length > 0 ? newCoords : data.listaPontosGeocerca;

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
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const hancleCloseModal = () => {
    setStateDefault();
    setIsOpenModal(!isOpenModal);
  };

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setNewCoords((oldState) => [...oldState, coordinate]);
  };

  const fetchGeofence = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.post<IGeofence[]>("/Geocerca/ObterLista", {
        codigoGeocerca,
      });

      setGeofence(data[0]);

      let coordinates: ICoordinate[] = [];

      for (let index = 0; index < data[0].listaPontosGeocerca.length; index++) {
        const point = data[0].listaPontosGeocerca[index];

        coordinates.push({
          latitude: point.latitude,
          longitude: point.longitude,
        });
      }

      setCoords(coordinates);
      setDelta(calculateDelta(coordinates));
      setInitialRegion(calculateInitialRegion(coordinates));
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchGeofence();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <>
      <GenericModal
        title="Editar Geocerca"
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
          title="Atualizar"
          w="full"
          h="58px"
          mt="24px"
          onPress={handleUpdateGeofence}
        />
      </GenericModal>

      <Container>
        <HeaderDefault title="Geocerca">
          <HStack>
            {newCoords.length > 0 && (
              <IconButton
                style={{ marginRight: 8 }}
                icon={
                  <Feather name="delete" size={22} color={colors.red[600]} />
                }
                onPress={setStateDefault}
              />
            )}

            {!isEditMode && (
              <>
                <IconButton
                  style={{ marginRight: 8 }}
                  icon={
                    <Feather name="edit" size={22} color={colors.blue[700]} />
                  }
                  onPress={() => setIsEditMode(true)}
                />

                <IconButton
                  icon={
                    <Feather name="trash" size={22} color={colors.red[600]} />
                  }
                  onPress={handleDeleteGeofence}
                />
              </>
            )}
          </HStack>
        </HeaderDefault>

        {isLoading && <LoadingSpinner color={colors.blue[700]} />}

        {!isLoading && geofence && coords.length > 0 && initialRegion && (
          <MapView
            style={{ flex: 1 }}
            onPress={
              isEditMode
                ? handleMapPress
                : () => console.log(`Edit Mode: ${isEditMode}`)
            }
            zoomControlEnabled
            initialRegion={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude,
              latitudeDelta: delta.latitudeDelta,
              longitudeDelta: delta.longitudeDelta,
            }}
          >
            {!isEditMode && coords.length > 0 && (
              <Polygon
                coordinates={coords}
                fillColor="rgba(160, 198, 229, 0.3)"
                strokeColor="rgba(0, 105, 192, 1)"
                strokeWidth={2}
              />
            )}

            {isEditMode && newCoords.length > 0 && (
              <Polygon
                coordinates={newCoords}
                fillColor="rgba(160, 198, 229, 0.3)"
                strokeColor="rgba(0, 105, 192, 1)"
                strokeWidth={2}
              />
            )}

            {newCoords.length > 0 &&
              newCoords.map((location, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                />
              ))}
          </MapView>
        )}

        {isEditMode && (
          <ButtonFull
            disabled={isEditMode && newCoords.length < 2}
            title="Editar"
            onPress={() => setIsOpenModal(true)}
          />
        )}
      </Container>
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
