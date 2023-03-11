import { useCallback, useState } from "react";
import { FlatList } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { LayoutDefault } from "@components/LayoutDefault";

import { AccordionList } from "@components/Accordion/AccordionList";
import { AccordionItem } from "@components/Accordion/AccordionItem";
import { AccordionSession } from "@components/Accordion/AccordionSession";

import axios from "axios";

import api from "@services/api";

import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

import { IGrouping } from "@interfaces/IGrouping";

export function Equipments() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const [expanded, setExpanded] = useState("");
  const [notifications, setNotifications] = useState();
  const [groupings, setGroupings] = useState<IGrouping[]>([]);

  console.log("notifications", notifications);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleExpanded = (item: string) => {
    if (item === expanded) setExpanded("");

    if (item !== expanded) setExpanded(item);
  };

  const fetchGroupings = async () => {
    try {
      if (user && customer) {
        const response = await api.post("Agrupamento/ObterLista", {
          codigoUsuario: user.codigoUsuario,
          codigoCliente: customer.codigoCliente,
          localDashboard: 3,
        });

        setGroupings(response.data);

        console.log("CHAMOU");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) console.log("Error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchGroupings();

      return () => {
        isActive = false;
      };
    }, [customer])
  );

  const fetchNotifications = async () => {
    try {
      const response = await api.post("/Dashboard/ObterListaIndicadores", {
        codigoUsuario: user?.codigoUsuario,
        codigoCliente: user?.codigoCliente,
      });

      setNotifications(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log("Error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchNotifications();

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
        <Text ml="8px" mb="12px" fontSize="20px">
          Grupos
        </Text>

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
                    velocity={equipament.velocidade}
                    title={equipament.nomeEquipamento}
                    status={equipament.ligado ? "Ligado" : "Desligado"}
                    onPress={() =>
                      navigation.navigate("EquipmentDetails", {
                        screen: "Equipament",
                        params: {
                          codigoEquipamento: equipament.codigoEquipamento,
                        },
                      })
                    }
                  />
                ))}
            </AccordionSession>
          )}
        />
      </VStack>
    </LayoutDefault>
  );
}
