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

import api from "@services/api";

import { THEME } from "@theme/theme";

import { useAuth } from "@hooks/authentication";
import { useCustomer } from "@hooks/customer";

import { initialState } from "./constants";
import { transformCountData, transformGroupingData } from "./functions";

export function Equipments() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const [state, setState] = useState(initialState);

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

  const handleExpanded = (expand: string) => {
    if (expand === state.expanded) {
      setState((prevState) => ({ ...prevState, expanded: "" }));
    } else {
      setState((prevState) => ({ ...prevState, expanded: expand }));
    }
  };

  const fetchData = async () => {
    try {
      if (user && customer) {
        setState((prevState) => ({ ...prevState, isLoading: true }));

        const data = {
          localDashboard: 3,
          codigoUsuario: user.codigoUsuario,
          codigoCliente: customer.codigoCliente,
        };

        const response = await Promise.all([
          api.post("Agrupamento/ObterLista", data),
          api.post("/Dashboard/ObterListaIndicadores", data),
        ]);

        setState((prevState) => ({
          ...prevState,
          count: transformCountData(response[1].data),
          groupings:
            typeof response[0].data !== "string"
              ? transformGroupingData(response[0].data)
              : [],
        }));
      }
    } catch (error) {
      Alert.alert(state.responses[0].title, state.responses[0].subtitle);
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchData();

      return () => {
        isActive = false;
      };
    }, [customer]),
  );

  return (
    <LayoutDefault
      bg={THEME.colors.white}
      firstIcon="menu"
      secondIcon="notifications-on"
      thirdIcon="message"
      count={state.count}
      handleFirstIcon={handleMenu}
      handleThirdIcon={() => navigation.navigate("Messages")}
      handleSecondIcon={() => navigation.navigate("Notifications")}
    >
      <VStack flex={1} w="full" px={`${RFValue(12)}px`} pt={`${RFValue(16)}px`}>
        <Text ml="8px" mb="12px" fontSize="20px">
          Grupos
        </Text>

        {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

        {!state.isLoading && state.groupings.length > 0 && (
          <FlatList
            data={state.groupings}
            keyExtractor={(item) => item.key}
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: grouping }) => (
              <AccordionSession>
                <AccordionList
                  expanded={grouping.key === state.expanded}
                  title={grouping.name}
                  description={grouping.description}
                  onPress={() => handleExpanded(grouping.key)}
                />

                {grouping.key === state.expanded &&
                  grouping.equipments.map((equipament) => (
                    <AccordionItem
                      key={equipament.key}
                      velocity={equipament.speed}
                      title={equipament.name}
                      status={equipament.online ? "Ligado" : "Desligado"}
                      onPress={() =>
                        navigation.navigate("EquipmentDetails", {
                          screen: "Equipament",
                          params: {
                            codigoEquipamento: equipament.code,
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
