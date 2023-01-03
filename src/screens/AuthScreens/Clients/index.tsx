import { Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Feather } from "@expo/vector-icons";
import { Box, VStack, Select, FormControl, Heading } from "native-base";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

import { ICustomer } from "@interfaces/ICustomer";
import { CUSTOMER, TOKEN, USER } from "@constants/storage";

import { Header } from "@components/Header";
import { ButtonFull } from "@components/ButtonFull";
import { HeaderWelcome } from "@components/HeaderWelcome";

export function Clients() {
  const { user } = useAuth();
  const { resetUserState } = useAuth();
  const { addCustomer, resetCustomerState } = useCustomer();

  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [customers, setCustomers] = useState<ICustomer[]>([] as ICustomer[]);

  const handleNextPage = () => {
    if (customer) addCustomer(customer);

    if (!customer) {
      Alert.alert(
        "Usuário não possui Clientes!",
        "Usuário não possui Clientes cadastrados."
      );
    }
  };

  const handleAddCustomer = (selected: string) => {
    const selectedCustomer = customers.find(
      (customer) => customer.token === selected
    );

    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
  };

  const clearStorage = async () => {
    await AsyncStorage.removeItem(USER);
    await AsyncStorage.removeItem(CUSTOMER);
    await AsyncStorage.removeItem(TOKEN);

    resetUserState();
    resetCustomerState();
  };

  useEffect(() => {
    const fetch = async () => {
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

    if (user) fetch();
  }, []);

  return (
    <VStack
      w="full"
      bg="blue.700"
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
    >
      <Header firstIcon="chevron-left" functionIcon={clearStorage} />

      {user && <HeaderWelcome name={user.nomeUsuario} />}
      <Box
        px={8}
        flex={1}
        width="full"
        alignItems="center"
        background={THEME.colors.shape}
      >
        <FormControl w="full" isInvalid style={{ marginTop: 32 }}>
          <Heading
            fontSize="xs"
            color="blue.700"
            fontFamily={THEME.fonts.Montserrat_300Light}
          >
            Cliente
          </Heading>

          <Select
            mt="1"
            minWidth="100%"
            placeholder="Selecione um Cliente"
            accessibilityLabel="Choose Consumer"
            fontFamily={THEME.fonts.Montserrat_400Regular}
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
            onValueChange={(selected) => handleAddCustomer(selected)}
          >
            {customers.length > 0 &&
              customers.map((customer, index) => (
                <Select.Item
                  key={index}
                  alignItems="center"
                  value={customer.token}
                  label={customer.nomeCliente}
                />
              ))}
          </Select>
        </FormControl>
      </Box>

      <ButtonFull title="Acessar" onPress={handleNextPage} />
    </VStack>
  );
}
