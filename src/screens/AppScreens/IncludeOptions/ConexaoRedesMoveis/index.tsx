import { useCallback, useState } from "react";
import { Alert, BackHandler, FlatList } from "react-native";

import {
  useRoute,
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { THEME } from "@theme/theme";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { useBluetooth } from "@hooks/bluetooth";
import { processReceivedValues } from "@utils/processReceivedValues";

import { inputs, schema } from "./constants";

interface IForm {
  ponto: string;
  usuario: string;
  senha: string;
}

export function ConexaoRedesMoveis() {
  const route = useRoute();
  const navigation = useNavigation();

  const bluetoothContextData = useBluetooth();

  const params = route.params as { chave: string };

  const [isLoading, setIsLoading] = useState(false);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async (data: IForm) => {
    if (bluetoothContextData.device) {
      setIsLoading(true);

      const COMMAND = {
        BT_PASSWORD: params.chave,
        SET_MODEM_APN: data.ponto,
        SET_MODEM_USER: data.usuario,
        SET_MODEM_PWD: data.senha,
      };

      await bluetoothContextData.writeCharacteristic(COMMAND);
    }
  };

  const handleGoToNextScreen = () => {
    navigation.navigate("EquipamentosDisponiveis", {
      chave: params.chave,
    });

    bluetoothContextData.removeValues();
  };

  const onValueChange = () => {
    const response = processReceivedValues(bluetoothContextData.values);
    console.log("OBJETO RESPOSTA:", response);

    if (Object.entries(response).length > 0) {
      setIsLoading(false);
      Alert.alert("Conectado com Sucesso.", "Conectado com Sucesso.", [
        {
          text: "Continuar cadastro.",
          onPress: () => handleGoToNextScreen(),
        },
      ]);
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
      {isLoading && <HeaderDefault title="Conexão Redes Móveis" />}

      {isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!isLoading && (
        <VStack flex={1} w="full" px={`${RFValue(16)}px`}>
          <FlatList
            data={inputs}
            style={{ width: "100%" }}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: input }) => (
              <>
                <Text
                  mt={`${RFValue(16)}px`}
                  color="blue.700"
                  fontSize={`${RFValue(13)}px`}
                  fontFamily="Roboto_400Regular"
                  marginBottom={`${RFValue(8)}px`}
                >
                  {input.title}
                </Text>

                <Controller
                  control={control}
                  name={input.name}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      py={0}
                      borderBottomColor="blue.700"
                      _input={{
                        color: "#333333",
                        fontSize: "16px",
                        fontFamily: "Roboto_400Regular",
                      }}
                      value={value}
                      onChangeText={onChange}
                      keyboardType={input.keyboardType}
                      errorMessage={errors[input.name]?.message}
                    />
                  )}
                />
              </>
            )}
          />
        </VStack>
      )}

      {!isLoading && (
        <ButtonFull title="Salvar" onPress={handleSubmit(handleNextPage)} />
      )}
    </LayoutDefault>
  );
}
