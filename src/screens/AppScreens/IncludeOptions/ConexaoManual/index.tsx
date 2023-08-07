import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

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
import { processReturnValues } from "@utils/processReturnValues";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { inputs } from "./constants/inputs";
import { schema } from "./constants/schema";

import { IResponseObject } from "../VincularDispositivo/interfaces";

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

  const {
    connectedDevice,
    returnedValues,
    resetReturnValues,
    writeCharacteristicWithResponseForService,
  } = useBluetooth();

  const [isLoading, setIsLoading] = useState(false);

  const [statusCommandResponse, setStatusCommandResponse] =
    useState<IResponseObject>(null);

  const [configureCommandResponse, setConfigureCommandResponse] =
    useState<IResponseObject>(null);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleNextPage = async (data: { nome: string; senha: string }) => {
    if (connectedDevice) {
      setIsLoading(true);

      const CONFIGURE_COMMAND = {
        BT_PASSWORD: params.chave,
        SET_WIFI_SSID: params.nomeRede,
        SET_WIFI_PWD: data.senha,
      };

      await writeCharacteristicWithResponseForService(
        connectedDevice,
        CONFIGURE_COMMAND
      );
    }
  };

  const getStatusConnection = async () => {
    if (connectedDevice) {
      const STATUS_COMMAND = {
        BT_PASSWORD: params.chave,
        GET_WIFI_STATUS: "",
      };

      await writeCharacteristicWithResponseForService(
        connectedDevice,
        STATUS_COMMAND
      );
    }
  };

  const handleGoToNextScreen = () => {
    navigation.navigate("EquipamentosDisponiveis", {
      chave: params.chave,
    });

    resetReturnValues();
    setStatusCommandResponse(null);
    setConfigureCommandResponse(null);
  };

  useEffect(() => {
    resetReturnValues();
  }, []);

  const handleTryAgain = () => {
    resetReturnValues();
    setConfigureCommandResponse(null);
  };

  useFocusEffect(
    useCallback(() => {
      if (configureCommandResponse) {
        const hasProperty = "SET_TRANSM_MODE" in configureCommandResponse;

        if (hasProperty) {
          if (configureCommandResponse.SET_TRANSM_MODE === "WIFI") {
            getStatusConnection();
          }
        }
      }
    }, [configureCommandResponse])
  );

  useFocusEffect(
    useCallback(() => {
      if (statusCommandResponse) {
        const hasProperty = "WIFI_STATUS_CONNECTION" in statusCommandResponse;

        if (hasProperty) {
          if (statusCommandResponse.WIFI_STATUS_CONNECTION === "1") {
            Alert.alert("Conectado com Sucesso.", "Conectado com Sucesso.", [
              {
                text: "Continuar cadastro.",
                onPress: () => handleGoToNextScreen(),
              },
            ]);
          }

          if (statusCommandResponse.WIFI_STATUS_CONNECTION === "0") {
            Alert.alert(
              "Credenciais inválidas.",
              "Verifique se as credenciais de acesso estão corretas.",
              [
                {
                  text: "Tentar novamente.",
                  onPress: () => handleTryAgain(),
                },
              ]
            );
          }
        }
      }
    }, [statusCommandResponse])
  );

  useFocusEffect(
    useCallback(() => {
      const processedValue = processReturnValues(returnedValues);

      if (processedValue) {
        if (!configureCommandResponse) {
          setConfigureCommandResponse(processedValue);
        } else {
          setStatusCommandResponse(processedValue);
          setIsLoading(false);
        }
      }
    }, [returnedValues])
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
