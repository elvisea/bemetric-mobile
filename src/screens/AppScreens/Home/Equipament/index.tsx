import { useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';

import { Heading, VStack } from 'native-base';
import { RFValue } from 'react-native-responsive-fontsize';

import { LayoutDefault } from '@components/LayoutDefault';
import { AccordionList } from '@components/AccordionList';
import { AccordionItem } from "@components/AccordionItem";
import { AccordionSession } from '@components/AccordionSession';

import { THEME } from '@theme/theme';
import { clients } from '@fakes/clients';

export default function EquipamentScreen() {
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState("");

  const handleMenu = () => navigation.dispatch(DrawerActions.openDrawer());

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

      <VStack
        flex={1}
        w="full"
        px={`${RFValue(12)}px`}
        pt={`${RFValue(16)}px`}
      >

        <Heading
          style={{ fontSize: 20, marginLeft: 8, marginBottom: 12 }}
        >
          Clientes
        </Heading>

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

              {client.title === expanded && client.equipaments.map(equipament => (
                <AccordionItem
                  key={equipament.id}
                  expanded={false}
                  title={equipament.title}
                  description={equipament.description}
                  onPress={() => console.log("equipament =>", equipament)}
                />
              ))}

            </AccordionSession>

          )}
        />

      </VStack>
    </LayoutDefault >
  );
}
