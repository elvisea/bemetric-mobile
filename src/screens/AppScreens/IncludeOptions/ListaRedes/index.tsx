import { useCallback, useState } from "react";
import { Alert, BackHandler, FlatList, StyleSheet } from "react-native";

import uuid from "react-native-uuid";
import { BleError } from "react-native-ble-plx";

import {
  useRoute,
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { WIFI_AP_LIST } from "./types";
import { initialState } from "./constants";

import { Icon, Network, TitleList, TitleNetwork } from "./styles";

export function ListaRedes() {
  const route = useRoute();
  const navigation = useNavigation();

  const context = useBluetooth();

  const params = route.params as { chave: string };

  const [state, setState] = useState(initialState);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const resetState = () => setState(initialState);

  const handleChooseNetwork = (nameNetwork: string) => {
    navigation.navigate("ConexaoManual", {
      chave: params.chave,
      nomeRede: nameNetwork,
    });

    resetState();
    context.clearReceivedValues();
  };

  const findAvailableNetworks = async () => {
    try {
      setState((oldState) => ({ ...oldState, isLoading: true }));
      const COMMAND = { BT_PASSWORD: params.chave, GET_WIFI_LIST: "" };
      await context.sendCommand(COMMAND, 2);
    } catch (error) {
      setState((oldState) => ({ ...oldState, isLoading: false }));

      if (error instanceof BleError) {
        Alert.alert(error.message, error.message);
      }
    }
  };

  const checarObjeto = (objeto: { [key: string]: any }) => {
    const propriedadesDesejadas = [
      "WIFI_AP_LIST",
      "GET_WIFI_LIST",
      "WIFI_SCAN_STATUS",
    ];

    return propriedadesDesejadas.every(
      (propriedade) =>
        Object.prototype.hasOwnProperty.call(objeto, propriedade) &&
        objeto[propriedade] !== undefined,
    );
  };

  const verificarResposta = () => {
    const temTodasAsPropriedades = checarObjeto(context.response);

    if (temTodasAsPropriedades) {
      if (Array.isArray(context.response.WIFI_AP_LIST)) {
        const redesComChave = context.response.WIFI_AP_LIST.map(
          (item: WIFI_AP_LIST) => ({
            ...item,
            KEY: uuid.v4().toString(),
          }),
        );

        setState((oldState) => ({
          ...oldState,
          network: redesComChave,
          isLoading: false,
        }));
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (Object.values(context.response).length > 0) {
        verificarResposta();
      }
    }, [context.response]),
  );

  useFocusEffect(
    useCallback(() => {
      findAvailableNetworks();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        context.clearReceivedValues();
        resetState();
        return false;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress,
      );

      return () => {
        backHandler.remove();
      };
    }, []),
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!state.isLoading && <HeaderDefault title="Conexão WIFI" />}

      {!state.isLoading && (
        <FlatList
          data={state.network}
          style={styles.constainer}
          keyExtractor={(item) => item.KEY}
          ListHeaderComponent={<TitleList>Redes Disponíveis</TitleList>}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Network
              onPress={() => handleChooseNetwork(item.WIFI_AP_SSID)}
              activeOpacity={0.5}
            >
              <TitleNetwork>{item.WIFI_AP_SSID}</TitleNetwork>
              <Icon />
            </Network>
          )}
        />
      )}
    </LayoutDefault>
  );
}

const styles = StyleSheet.create({
  constainer: {
    width: "100%",
    paddingHorizontal: 16,
    marginVertical: 16,
  },
});
