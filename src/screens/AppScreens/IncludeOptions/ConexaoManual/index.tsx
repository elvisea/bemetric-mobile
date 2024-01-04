import { useCallback, useState } from "react";
import { Alert, BackHandler, FlatList } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";

import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { THEME } from "@theme/theme";
import { useBluetooth } from "@hooks/bluetooth";
import { processReceivedValues } from "@utils/processReceivedValues";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { inputs, resposta, schema } from "./constants";

export function ConexaoManual() {
  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params as { chave: string; nomeRede: string };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ nome: string; senha: string }>({
    defaultValues: { nome: params.nomeRede },
    resolver: yupResolver(schema),
  });

  const context = useBluetooth();

  const [isLoading, setIsLoading] = useState(false);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const clearReturnedValues = () => {
    context.removeValues();
  };

  const sendCommand = async (data: { nome: string; senha: string }) => {
    setIsLoading(true);

    const CONFIGURE_COMMAND = {
      BT_PASSWORD: params.chave,
      SET_WIFI_SSID: data.nome,
      SET_WIFI_PWD: data.senha,
    };

    await context.writeCharacteristic(CONFIGURE_COMMAND);
  };

  const handleNextPage = async (data: { nome: string; senha: string }) => {
    await sendCommand(data);
  };

  const getStatusConnection = async () => {
    setIsLoading(true);

    const STATUS_COMMAND = {
      BT_PASSWORD: params.chave,
      GET_WIFI_STATUS: "",
    };

    await context.writeCharacteristic(STATUS_COMMAND);
    setIsLoading(false);
  };

  const handleGoToNextScreen = () => {
    navigation.navigate("EquipamentosDisponiveis", {
      chave: params.chave,
    });

    context.removeValues();
  };

  const checarObjeto = (retorno: object) => {
    if (Object.entries(retorno).length > 0) {
      if ("SET_TRANSM_MODE" in retorno) {
        if (retorno.SET_TRANSM_MODE === "WIFI") {
          clearReturnedValues();
          getStatusConnection();
        }
      }

      if ("WIFI_STATUS_CONNECTION" in retorno) {
        if (retorno.WIFI_STATUS_CONNECTION === "0") {
          setIsLoading(false);
          Alert.alert(resposta[0].title, resposta[0].subtitle, [
            {
              text: resposta[0].text,
              onPress: () => clearReturnedValues(),
            },
          ]);
        }

        if (retorno.WIFI_STATUS_CONNECTION === "1") {
          setIsLoading(false);
          Alert.alert(resposta[1].title, resposta[1].subtitle, [
            {
              text: resposta[1].text,
              onPress: () => handleGoToNextScreen(),
            },
          ]);
        }
      }
    }
  };

  const onValueChange = () => {
    const retorno = processReceivedValues(context.values);
    checarObjeto(retorno);
  };

  useFocusEffect(
    useCallback(() => {
      if (context.values.length > 0) {
        onValueChange();
      }
    }, [context.values]),
  );

  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        context.removeValues();
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
      <HeaderDefault title="Conexão WIFI" />

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
        <ButtonFull title="Avançar" onPress={handleSubmit(handleNextPage)} />
      )}
    </LayoutDefault>
  );
}
