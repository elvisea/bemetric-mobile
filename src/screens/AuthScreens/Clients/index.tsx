import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons";
import { Box, VStack, Select, FormControl, Heading } from "native-base";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

import { Customer } from "@interfaces/Customer";

import { Header } from "@components/Header";
import { ButtonFull } from "@components/ButtonFull";
import { HeaderWelcome } from "@components/HeaderWelcome";

export function Clients() {
  const { user } = useAuth();
  const { addCustomer } = useCustomer();

  const navigation = useNavigation();

  const [customer, setCustomer] = useState<Customer>({} as Customer);
  const [customers, setCustomers] = useState<Customer[]>([] as Customer[]);

  const handleNextPage = () => addCustomer(customer);

  const handleAddCustomer = (selected: string) => {
    const selectedCustomer = customers.find(
      (customer) => customer.token === selected
    );

    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.post("/Cliente/ObterLista", {
          codigoParceiro: user?.codigoParceiro,
        });

        setCustomers(response.data);
      } catch (error) {}
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
      <Header icon="chevron-left" functionIcon={() => navigation.goBack()} />

      <HeaderWelcome name="Paulo Castro" />
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
            {customers.map((customer, index) => (
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
