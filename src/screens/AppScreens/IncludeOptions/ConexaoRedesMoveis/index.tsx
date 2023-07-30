import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";

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

import { inputs } from "./constants/inputs";
import { schema } from "./constants/schema";

import { useBluetooth } from "@hooks/bluetooth";
import { processReturnValues } from "@utils/processReturnValues";

interface IForm {
  ponto: string;
  usuario: string;
  senha: string;
}

export function ConexaoRedesMoveis() {
  const route = useRoute();
  const navigation = useNavigation();

  const {
    connectedDevice,
    returnedValues,
    resetReturnValues,
    writeCharacteristicWithResponseForService,
  } = useBluetooth();

  const params = route.params as { chave: string };

  const [isLoading, setIsLoading] = useState(false);
  const [responseObject, setResponseObject] = useState<object | null>(null);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async (data: IForm) => {
    if (connectedDevice) {
      setIsLoading(true);

      const COMMAND = {
        BT_PASSWORD: params.chave,
        SET_MODEM_APN: data.ponto,
        SET_MODEM_USER: data.usuario,
        SET_MODEM_PWD: data.senha,
      };

      await writeCharacteristicWithResponseForService(connectedDevice, COMMAND);

      setIsLoading(false);
    }
  };

  const handleGoToNextScreen = () => {
    navigation.navigate("EquipamentosDisponiveis", {
      chave: params.chave,
    });

    resetReturnValues();
    setResponseObject(null);
  };

  useFocusEffect(
    useCallback(() => {
      if (responseObject) {
        Alert.alert("Conectado com Sucesso.", "Conectado com Sucesso.", [
          {
            text: "Continuar cadastro.",
            onPress: () => handleGoToNextScreen(),
          },
        ]);
      }
    }, [responseObject])
  );

  useFocusEffect(
    useCallback(() => {
      const processedValue = processReturnValues(returnedValues);

      if (processedValue) {
        setResponseObject(processedValue);
      }
    }, [returnedValues])
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Conexão Redes Móveis" />

      {isLoading && !responseObject && (
        <LoadingSpinner color={THEME.colors.blue[700]} />
      )}

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
