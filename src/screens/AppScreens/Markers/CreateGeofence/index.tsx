import React, { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";

import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import MapView, {
  MapPressEvent,
  Polygon,
  Marker,
} from "react-native-maps";

import axios from "axios";

import { IconButton, Text, VStack } from "native-base";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ButtonFull } from "@components/ButtonFull";
import { ModalPeriod } from "@components/ModalPeriod";
import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";

import { ContainerCheckbox } from "./styles";

interface IPontoGeocerca {
  latitude: number;
  longitude: number;
}

interface IGeofence {
  incluir: boolean;
  codigoCliente: number;
  nomeGeocerca: string;
  descricao: string;
  alertaEntrada: boolean;
  alertaSaida: boolean;
  alertaPermanencia: boolean;
  alertaPermanenciaTempo?: number;
  alertaVelocidade: boolean;
  alertaVelocidadeQuilometro?: number;
  listaPontosGeocerca: IPontoGeocerca[] | [];
}

interface IResponses {
  [index: number]: string;
}

const responses: IResponses = {
  0: "Geocerca criada com sucesso",
  1: "Cliente não localizado",
  2: "Nome da geocerca já cadastrado",
  3: "Falha ao tentar criar geocerca",
};

export function CreateGeofence() {
  const { colors } = THEME;
  const { customer } = useCustomer();

  const navigation = useNavigation();

  const [isOpenModal, setIsOpenModal] = useState(false);

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
    const coordenada = event.nativeEvent.coordinate;

    setGeofence((oldState) => ({
      ...oldState,
      listaPontosGeocerca: [...oldState.listaPontosGeocerca, coordenada],
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
        alertaEntrada: false,
        alertaSaida: false,
        descricao: "",
        nomeGeocerca: "",
      });
    }
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
      if (axios.isAxiosError(error)) console.log(error);
    }
  };

  return (
    <>
      <ModalPeriod
        title="Criar Geocerca"
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(!isOpenModal)}
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

        <ContainerCheckbox style={{ marginBottom: 8 }}>
          <Checkbox
            style={styles.checkbox}
            value={geofence.alertaEntrada}
            onValueChange={(value) =>
              setGeofence((oldState) => ({ ...oldState, alertaEntrada: value }))
            }
            color={geofence.alertaEntrada ? THEME.colors.blue[700] : undefined}
          />
          <Text style={styles.paragraph}>Entrada</Text>
        </ContainerCheckbox>

        <ContainerCheckbox style={{ marginBottom: 8 }}>
          <Checkbox
            style={styles.checkbox}
            value={geofence.alertaSaida}
            onValueChange={(value) =>
              setGeofence((oldState) => ({ ...oldState, alertaSaida: value }))
            }
            color={geofence.alertaSaida ? THEME.colors.blue[700] : undefined}
          />
          <Text style={styles.paragraph}>Saída</Text>
        </ContainerCheckbox>

        <ContainerCheckbox
          style={{ marginBottom: 8, justifyContent: "space-between" }}
        >
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

        <ContainerCheckbox style={{ justifyContent: "space-between" }}>
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
      </ModalPeriod>

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

        <MapView
          style={{ flex: 1 }}
          onPress={handleMapPress}
        // initialRegion={{
        //   latitude: initialRegion.latitude,
        //   longitude: initialRegion.longitude,
        //   latitudeDelta: delta.latitudeDelta,
        //   longitudeDelta: delta.longitudeDelta,
        // }}
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

        <ButtonFull
          disabled={geofence.listaPontosGeocerca.length < 2}
          title="Criar"
          onPress={() => setIsOpenModal(true)}
        />
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
