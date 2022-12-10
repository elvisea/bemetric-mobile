import { useState } from "react";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, DrawerActions } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Heading, VStack } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import { LayoutDefault } from "@components/LayoutDefault";
import { AccordionList } from "@components/AccordionList";
import { AccordionItem } from "@components/AccordionItem";
import { AccordionSession } from "@components/AccordionSession";

import { THEME } from "@theme/theme";
import { clients } from "@fakes/clients";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

import { CUSTOMER, TOKEN, USER } from "@constants/storage";

export function Equipamentos() {
  const navigation = useNavigation();

  const { resetUserState } = useAuth();
  const { resetCustomerState } = useCustomer();

  const [expanded, setExpanded] = useState("");

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

  return (
    <LayoutDefault
      bg={THEME.colors.white}
      icon="menu"
      functionIcon={handleMenu}
    >
      <VStack flex={1} w="full" px={`${RFValue(12)}px`} pt={`${RFValue(16)}px`}>
        <TouchableOpacity onPress={clearStorage}>
          <Heading style={{ fontSize: 20, marginLeft: 8, marginBottom: 12 }}>
            Grupos
          </Heading>
        </TouchableOpacity>

        <FlatList
          data={clients}
          keyExtractor={(item) => item.id.toString()}
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: client }) => (
            <AccordionSession>
              <AccordionList
                expanded={client.title === expanded}
                title={client.title}
                description={client.description}
                onPress={() => handleExpanded(client.title)}
              />

              {client.title === expanded &&
                client.equipaments.map((equipament) => (
                  <AccordionItem
                    key={equipament.id}
                    expanded={false}
                    title={equipament.title}
                    description={equipament.description}
                    // onPress={() => console.log("Próxima Pagina =>")}
                    onPress={() =>
                      navigation.navigate("EquipamentoTabRoutes")
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
