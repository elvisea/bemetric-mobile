import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Heading, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { LayoutDefault } from "@components/LayoutDefault";
import { AccordionList } from "@components/AccordionList";
import { AccordionItem } from "@components/AccordionItem";
import { AccordionSession } from "@components/AccordionSession";

import axios from "axios";

import api from "@services/api";

import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

import { IGrouping } from "@interfaces/IGrouping";
import { CUSTOMER, TOKEN, USER } from "@constants/storage";

export function Equipamentos() {
  const navigation = useNavigation();

  const { resetUserState, user } = useAuth();
  const { resetCustomerState } = useCustomer();

  const [expanded, setExpanded] = useState("");
  const [groupings, setGroupings] = useState<IGrouping[]>([]);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const clearStorage = async () => {
    await AsyncStorage.removeItem(USER);
    await AsyncStorage.removeItem(CUSTOMER);
    await AsyncStorage.removeItem(TOKEN);

    resetUserState();
    resetCustomerState();
  };

  const handleExpanded = (item: string) => {
    if (item === expanded) {
      setExpanded("");
    }

    if (item !== expanded) {
      setExpanded(item);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          if (user) {
            const response = await api.post("Agrupamento/ObterLista", {
              codigoCliente: user.codigoCliente,
              codigoUsuario: user.codigoUsuario,
              localDashboard: 3,
            });

            setGroupings(response.data);
          }
        } catch (e) {
          if (axios.isAxiosError(e)) console.log("ERROR:", e);
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <LayoutDefault
      bg={THEME.colors.white}
      firstIcon="menu"
      secondIcon="notifications-on"
      thirdIcon="message"
      handleFirstIcon={handleMenu}
      handleSecondIcon={() => navigation.navigate("Notifications")}
      handleThirdIcon={() => navigation.navigate("Messages")}
    >
      <VStack flex={1} w="full" px={`${RFValue(12)}px`} pt={`${RFValue(16)}px`}>
        <TouchableOpacity onPress={clearStorage}>
          <Heading style={{ fontSize: 20, marginLeft: 8, marginBottom: 12 }}>
            Grupos
          </Heading>
        </TouchableOpacity>

        <FlatList
          data={groupings}
          keyExtractor={(item) => item.codigoAgrupamento.toString()}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: grouping }) => (
            <AccordionSession>
              <AccordionList
                expanded={grouping.nomeAgrupamento === expanded}
                title={grouping.nomeAgrupamento}
                description={grouping.descricao}
                onPress={() => handleExpanded(grouping.nomeAgrupamento)}
              />

              {grouping.nomeAgrupamento === expanded &&
                grouping.listaEquipamentos.map((equipament) => (
                  <AccordionItem
                    key={equipament.codigoEquipamento}
                    expanded={false}
                    title={equipament.nomeEquipamento}
                    description={equipament.nomeEquipamento}
                    onPress={() => navigation.navigate("EquipmentDetails")}
                  />
                ))}
            </AccordionSession>
          )}
        />
      </VStack>
    </LayoutDefault>
  );
}
