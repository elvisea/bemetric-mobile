import { FlatList, StyleSheet } from "react-native";
import { useCallback, useState } from "react";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";
import { processReturnValues } from "@utils/processReturnValues";

import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { INetwork } from "./interfaces";

import { Icon, Network, TitleList, TitleNetwork } from "./styles";

export function ListaRedes() {
  const {
    returnedValues,
    connectedDevice,
    resetReturnValues,
    writeCharacteristicWithResponseForService,
  } = useBluetooth();

  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params as { chave: string };

  const [isLoading, setIsLoading] = useState(false);
  const [network, setNetwork] = useState<INetwork | null | undefined>();

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleChooseNetwork = (nameNetwork: string) => {
    navigation.navigate("ConexaoManual", {
      chave: params.chave,
      nomeRede: nameNetwork,
    });

    resetReturnValues();
  };

  const searchNetworks = async () => {
    setIsLoading(true);

    setNetwork(null);
    resetReturnValues();

    const COMMAND = { BT_PASSWORD: params.chave, GET_WIFI_LIST: "" };

    if (connectedDevice) {
      await writeCharacteristicWithResponseForService(connectedDevice, COMMAND);
    }

    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      const processedValue = processReturnValues(returnedValues);

      if (processedValue) {
        setNetwork(processedValue as INetwork);
      }
    }, [returnedValues])
  );

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && searchNetworks();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Conexão WIFI" />

      {!network && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {network && !isLoading && (
        <FlatList
          data={network?.WIFI_AP_LIST}
          style={styles.constainer}
          keyExtractor={(item, index) => `${index}-${item.WIFI_AP_SSID}`}
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
