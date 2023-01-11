import { useNavigation, DrawerActions } from "@react-navigation/native";
import { Text, VStack } from "native-base";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { RFValue } from "react-native-responsive-fontsize";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { IncludeHeader } from "@components/Include/IncludeHeader";

import { THEME } from "@theme/theme";

interface IFormProps {
  serial: string;
  key: string;
}

const schema = yup.object({
  serial: yup.string().required("Informe o serial"),
  key: yup.string().required("Informe a chave"),
});

export function Manual() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProps>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  async function handleAdvance({ key, serial }: IFormProps) {
    console.log(key, serial);
  }

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <IncludeHeader title="Vincular ao dispositivo" />

      <VStack flex={1} w="full" p="16px">
        <Text
          color="blue.700"
          fontFamily="Montserrat_400Regular"
          fontSize="13px"
        >
          Serial
        </Text>

        <Controller
          control={control}
          name="serial"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              _input={{
                color: "#333333",
                fontSize: "13px",
                fontFamily: "Montserrat_600SemiBold",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.serial?.message}
            />
          )}
        />

        <Text
          color="blue.700"
          fontFamily="Montserrat_400Regular"
          fontSize="13px"
          mt={`${RFValue(32)}px`}
        >
          Chave
        </Text>

        <Controller
          control={control}
          name="key"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              _input={{
                color: "#333333",
                fontSize: "13px",
                fontFamily: "Montserrat_600SemiBold",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.key?.message}
            />
          )}
        />
      </VStack>

      <ButtonFull title="AVANÇAR" onPress={handleSubmit(handleAdvance)} />
    </LayoutDefault>
  );
}
