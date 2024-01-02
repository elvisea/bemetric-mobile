import { useCallback } from "react";
import { FlatList, BackHandler } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

import { VStack } from "native-base";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";

import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { ConnectionOption } from "@components/Include/ConnectionOption";

import { options } from "./contants/options";

export function ConfigurarConexaoDados() {
  const route = useRoute();
  const navigation = useNavigation();

  const { removeValues } = useBluetooth();

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const params = route.params as { chave: string };

  useFocusEffect(
    useCallback(() => {
      return () => {
        removeValues();
      };
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        removeValues();
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
      <VStack flex={1} w="full">
        <HeaderDefault title="Configure a conexão de dados" />

        <FlatList
          data={options}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.screen}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: option }) => (
            <ConnectionOption
              mt={option.mt}
              title={option.title}
              onPress={() =>
                navigation.navigate(option.screen, {
                  chave: params.chave,
                })
              }
            />
          )}
        />
      </VStack>

      <ButtonFull
        title="Avançar sem conexão"
        onPress={() =>
          navigation.navigate("EquipamentosDisponiveis", {
            chave: params.chave,
          })
        }
      />
    </LayoutDefault>
  );
}
