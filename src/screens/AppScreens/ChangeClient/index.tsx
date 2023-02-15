import { Alert } from "react-native";
import { useCallback, useState } from "react";
import { Select, VStack } from "native-base";
import { Feather } from "@expo/vector-icons";
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { Button } from "@components/Button";
import { HeaderDefault } from "@components/HeaderDefault";
import { LayoutDefault } from "@components/LayoutDefault";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

import { ICustomer } from "@interfaces/ICustomer";

export function ChangeClient() {
  const { user } = useAuth();
  const { addCustomer } = useCustomer();

  const navigation = useNavigation();

  const [selected, setSelected] = useState<ICustomer | null>(null);
  const [customers, setCustomers] = useState<ICustomer[]>([] as ICustomer[]);

  console.log("Cliente Selecionado:", selected);
  console.log("Qtd Clientes:", customers.length);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleSelectCustomer = (selected: number) => {
    const selectedCustomer = customers.find(
      (customer) => customer.codigoCliente === selected
    );

    if (selectedCustomer) setSelected(selectedCustomer);
  };

  const goToHomePage = () => navigation.navigate("HomePage");

  const handleChangeCustomer = () => {
    if (selected) {
      addCustomer(selected);

      Alert.alert("Cliente Alterado!", "Cliente alterado com sucesso.", [
        {
          text: "Visualizar equipamentos",
          onPress: () => goToHomePage(),
        },
      ]);

      setSelected(null);
    }

    if (!selected) {
      Alert.alert(
        "Cliente não selecionado!",
        "Selecione um cliente para fazer a alteração."
      );
    }
  };

  const getListClients = async () => {
    try {
      const response = await api.post("/Usuario/ListaClientesUsuario", {
        codigoUsuario: user?.codigoUsuario,
      });

      if (response.status === 204) {
        Alert.alert(
          "Usuário não possui Clientes!",
          "Usuário não possui Clientes cadastrados."
        );
      }

      if (response.status === 200) {
        setCustomers(response.data);
      }
    } catch (error) {
      Alert.alert("Erro ao tentar listar Clientes!", `${error}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) {
        if (user) getListClients();
      }

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <LayoutDefault
      bg={THEME.colors.shape}
      firstIcon="menu"
      handleFirstIcon={handleMenu}
    >
      <VStack w="full" flex={1}>
        <HeaderDefault title="Trocar de Cliente" />

        <VStack w="full" p="16px" flex={1} marginTop="52px">
          <Select
            mt="1"
            minWidth="100%"
            placeholder="Selecione um Cliente"
            accessibilityLabel="Choose Consumer"
            fontSize="16px"
            fontFamily={THEME.fonts.Roboto_400Regular}
            color={THEME.colors.dark}
            dropdownIcon={
              <Feather
                name="chevron-down"
                size={24}
                color={THEME.colors.blue[700]}
              />
            }
            borderTopWidth={0}
            borderLeftWidth={0}
            borderRightWidth={0}
            borderRadius={0}
            borderBottomColor="blue.700"
            onValueChange={(selected) => handleSelectCustomer(Number(selected))}
          >
            {customers.length > 0 &&
              customers.map((customer) => (
                <Select.Item
                  key={customer.codigoCliente}
                  alignItems="center"
                  value={customer.codigoCliente.toString()}
                  label={customer.nomeCliente}
                />
              ))}
          </Select>
        </VStack>
      </VStack>

      <VStack w="full" pb="16px" paddingX="16px">
        <Button
          title="Alterar Cliente"
          w="full"
          mt={8}
          h={52}
          onPress={handleChangeCustomer}
        />
      </VStack>
    </LayoutDefault>
  );
}
