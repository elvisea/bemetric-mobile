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

import { processReceivedValues } from "@utils/processReceivedValues";

import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { initialState } from "./constants";
import { Icon, Network, TitleList, TitleNetwork } from "./styles";

export function ListaRedes() {
  const route = useRoute();
  const navigation = useNavigation();

  const bluetoothContextData = useBluetooth();

  const params = route.params as { chave: string };

  const [state, setState] = useState(initialState);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleChooseNetwork = (nameNetwork: string) => {
    navigation.navigate("ConexaoManual", {
      chave: params.chave,
      nomeRede: nameNetwork,
    });

    setState(initialState);
    bluetoothContextData.removeValues();
  };

  const sendCommand = async () => {
    const COMMAND = { BT_PASSWORD: params.chave, GET_WIFI_LIST: "" };
    await bluetoothContextData.writeCharacteristic(COMMAND);
  };

  const findAvailableNetworks = async () => {
    try {
      setState((oldState) => ({ ...oldState, isLoading: true }));
      await sendCommand();
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

  const onValueChange = () => {
    const response: any = processReceivedValues(bluetoothContextData.values);

    const temTodasAsPropriedades = checarObjeto(response);

    if (temTodasAsPropriedades) {
      const redesComChave = response.WIFI_AP_LIST.map((item: any) => ({
        ...item,
        KEY: uuid.v4(),
      }));

      const network = { ...response, WIFI_AP_LIST: redesComChave };
      setState({ network: network, isLoading: false });
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (bluetoothContextData.values.length > 0) {
        onValueChange();
      }
    }, [bluetoothContextData.values]),
  );

  useFocusEffect(
    useCallback(() => {
      findAvailableNetworks();

      return () => {
        setState(initialState);
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        bluetoothContextData.removeValues();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        bluetoothContextData.removeValues();
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
          data={state.network.WIFI_AP_LIST}
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
