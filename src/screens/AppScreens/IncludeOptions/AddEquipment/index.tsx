import { useNavigation, DrawerActions } from "@react-navigation/native";

import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

import { THEME } from "@theme/theme";

import { Input } from "@components/Input";
import { ButtonFull } from "@components/ButtonFull";
import { LayoutDefault } from "@components/LayoutDefault";
import { IncludeHeader } from "@components/Include/IncludeHeader";

interface IFormProps {
  name: string;
  identifier: string;
  model: string;
  placa: string;
}

const schema = yup.object({
  name: yup.string().required("Informe o seguinte campo"),
  identifier: yup.string().required("Informe o seguinte campo"),
  model: yup.string().required("Informe o seguinte campo"),
  placa: yup.string().required("Informe o seguinte campo"),
});

export function AddEquipment() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProps>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation();
  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  async function handleAdvance({ name, identifier, model, placa }: IFormProps) {
    console.log(name, identifier, model, placa);
  }

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <IncludeHeader title="Adicionar equipamento" />

      <VStack
        flex={1}
        w="full"
        px={`${RFValue(16)}px`}
        py={`${RFValue(24)}px`}
      >
        <Text
          color="blue.700"
          fontSize="13px"
          fontFamily="Montserrat_400Regular"
        >
          Nome*
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              py={0}
              _input={{
                color: "#333333",
                fontSize: "13px",
                fontFamily: "Montserrat_600SemiBold",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Text
          mt={`${RFValue(24)}px`}
          color="blue.700"
          fontSize="13px"
          fontFamily="Montserrat_400Regular"
        >
          Identificador*
        </Text>

        <Controller
          control={control}
          name="identifier"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              py={0}
              _input={{
                color: "#333333",
                fontSize: "13px",
                fontFamily: "Montserrat_600SemiBold",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.identifier?.message}
            />
          )}
        />

        <Text
          mt={`${RFValue(24)}px`}
          color="blue.700"
          fontSize="13px"
          fontFamily="Montserrat_400Regular"
        >
          Modelo
        </Text>

        <Controller
          control={control}
          name="model"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              py={0}
              _input={{
                color: "#333333",
                fontSize: "13px",
                fontFamily: "Montserrat_600SemiBold",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.model?.message}
            />
          )}
        />

        <Text
          mt={`${RFValue(24)}px`}
          color="blue.700"
          fontSize="13px"
          fontFamily="Montserrat_400Regular"
        >
          Placa
        </Text>

        <Controller
          control={control}
          name="placa"
          render={({ field: { onChange, value } }) => (
            <Input
              borderBottomColor="blue.700"
              py={0}
              _input={{
                color: "#333333",
                fontSize: "13px",
                fontFamily: "Montserrat_600SemiBold",
              }}
              onChangeText={onChange}
              value={value}
              errorMessage={errors.placa?.message}
            />
          )}
        />
      </VStack>

      <ButtonFull title="AVANÇAR" onPress={handleSubmit(handleAdvance)} />
    </LayoutDefault>
  );
}
