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

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { TypeAction } from "./types";
import { inputs, responses, schema } from "./constants";

export function ConexaoManual() {
  const route = useRoute();
  const context = useBluetooth();
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

  const [isLoading, setIsLoading] = useState(false);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleNextPage = async (data: { nome: string; senha: string }) => {
    setIsLoading(true);
    context.clearReceivedValues();

    const command = {
      BT_PASSWORD: params.chave,
      SET_WIFI_SSID: data.nome,
      SET_WIFI_PWD: data.senha,
    };

    await context.sendCommand(command, 2);
  };

  const getStatusConnection = async () => {
    context.clearReceivedValues();
    const GET_WIFI_STATUS = { BT_PASSWORD: params.chave, GET_WIFI_STATUS: "" };
    await context.sendCommand(GET_WIFI_STATUS, 4);
  };

  const handleGoToNextScreen = () => {
    context.clearReceivedValues();

    navigation.navigate("EquipamentosDisponiveis", {
      chave: params.chave,
    });
  };

  const handleAction = ({ response, action }: TypeAction) => {
    setIsLoading(false);

    Alert.alert(response.title, response.subtitle, [
      {
        text: response.text,
        onPress: () => (action ? action() : {}),
      },
    ]);
  };

  const verificarResposta = () => {
    switch (context.response.SET_TRANSM_MODE) {
      case "WIFI":
        getStatusConnection();
        break;
    }

    switch (context.response.WIFI_STATUS_CONNECTION) {
      case "0":
        handleAction({
          response: responses[0],
          action: () => context.clearReceivedValues(),
        });
        break;

      case "1":
        handleAction({
          response: responses[1],
          action: () => handleGoToNextScreen(),
        });
        break;
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
      const handleBackPress = () => {
        setIsLoading(false);
        context.clearReceivedValues();
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
