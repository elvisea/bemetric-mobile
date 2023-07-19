import { FlatList } from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { THEME } from "@theme/theme";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { HeaderDefault } from "@components/HeaderDefault";

import { inputs } from "./constants/inputs";
import { schema } from "./constants/schema";

interface IForm {
  ponto: string;
  usuario: string;
  senha: string;
}

export function ConexaoRedesMoveis() {
  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const handleNextPage = async (data: IForm) => {
    console.log(data);
  };

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <HeaderDefault title="Conexão Redes Móveis" />

      <VStack flex={1} w="full" paddingX="16px">
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

      <ButtonFull title="Salvar" onPress={handleSubmit(handleNextPage)} />
    </LayoutDefault>
  );
}
