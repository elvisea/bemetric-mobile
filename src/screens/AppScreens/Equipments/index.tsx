import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";

import {
  useNavigation,
  DrawerActions,
  useFocusEffect,
} from "@react-navigation/native";

import { Text, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { LayoutDefault } from "@components/LayoutDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { AccordionList } from "@components/Accordion/AccordionList";
import { AccordionItem } from "@components/Accordion/AccordionItem";
import { AccordionSession } from "@components/Accordion/AccordionSession";

import axios from "axios";

import api from "@services/api";

import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/authentication";
import { useCustomer } from "@hooks/customer";

import { IGrouping } from "@interfaces/IGrouping";

export function Equipments() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const [isLoading, setIsLoading] = useState(false);

  const [expanded, setExpanded] = useState("");
  const [count, setCount] = useState();
  const [groupings, setGroupings] = useState<IGrouping[]>([]);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleExpanded = (item: string) => {
    if (item === expanded) setExpanded("");

    if (item !== expanded) setExpanded(item);
  };

  const fetchGroupings = async () => {
    setIsLoading(true);

    try {
      if (user && customer) {
        const response = await api.post("Agrupamento/ObterLista", {
          codigoUsuario: user.codigoUsuario,
          codigoCliente: customer.codigoCliente,
          localDashboard: 3,
        });

        if (typeof response.data !== "string") {
          setGroupings(response.data);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
      setIsLoading(false);
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

      setCount(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
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
      count={count}
      handleFirstIcon={handleMenu}
      handleThirdIcon={() => navigation.navigate("Messages")}
      handleSecondIcon={() => navigation.navigate("Notifications")}
    >
      <VStack flex={1} w="full" px={`${RFValue(12)}px`} pt={`${RFValue(16)}px`}>
        <Text ml="8px" mb="12px" fontSize="20px">
          Grupos
        </Text>

        {isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

        {!isLoading && groupings.length > 0 && (
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
        )}
      </VStack>
    </LayoutDefault>
  );
}
