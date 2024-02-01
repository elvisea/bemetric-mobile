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
import { useBluetooth } from "@hooks/bluetooth";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { TypeAction, TypeForm } from "./types";
import { inputs, responses, schema } from "./constants";

export function ConexaoRedesMoveis() {
  const route = useRoute();
  const context = useBluetooth();
  const navigation = useNavigation();

  const params = route.params as { chave: string };

  const [isLoading, setIsLoading] = useState(false);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async (data: TypeForm) => {
    try {
      setIsLoading(true);

      const command = {
        BT_PASSWORD: params.chave,
        SET_MODEM_APN: data.ponto,
        SET_MODEM_USER: data.usuario,
        SET_MODEM_PWD: data.senha,
      };

      await context.sendCommand(command, 2);
    } catch (error) {
      setIsLoading(false);
      console.error("Error when trying to write features.", error);
    }
  };

  const getStatusConnection = async () => {
    try {
      const COMMAND = {
        BT_PASSWORD: params.chave.trim(),
        GET_MODEM_SIGNAL: "",
      };
      await context.sendCommand(COMMAND, 4000);
    } catch (error) {
      setIsLoading(false);
      console.error("Error when trying to write features.", error);
    }
  };

  const handleGoToNextScreen = () => {
    context.clearReceivedValues();
    navigation.navigate("EquipamentosDisponiveis", {
      chave: params.chave,
    });
  };

  const handleAction = ({ response, action }: TypeAction) => {
    context.clearReceivedValues();
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
      case "MODEM":
        context.clearReceivedValues();
        getStatusConnection();
        break;
    }

    switch (context.response.GET_MODEM_SIGNAL) {
      case "OK":
        handleAction({
          response: responses[0],
          action: () => handleGoToNextScreen(),
        });
        break;

      case "NOK":
        handleAction({ response: responses[4] });
        break;

      case "BUSY":
        handleAction({ response: responses[5] });
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
