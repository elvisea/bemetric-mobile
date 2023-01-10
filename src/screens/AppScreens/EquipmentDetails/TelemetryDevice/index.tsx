import * as React from "react";
import { Box, Center, HStack, VStack } from "native-base";

import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { THEME } from "@theme/theme";

import { DetailsHeader } from "@components/EquipmentDetails/DetailsHeader";

import { DetailsTitle } from "@components/EquipmentDetails/Typography/DetailsTitle";
import { DetailsDescription } from "@components/EquipmentDetails/Typography/DetailsDescription";

import { Registry } from "@components/EquipmentDetails/Registry";
import { Signals } from "@components/EquipmentDetails/Signals";

const registry = [
  "Última atualização",
  "Ativa desde",
  "Fim do suporte",
  "Data de aquisição",
];

export function TelemetryDevice() {
  return (
    <VStack flex={1} width="full" bg={THEME.colors.shape}>
      <DetailsHeader title="Dispositivo de Telemetria" />

      <VStack marginBottom="24px" paddingX="16px" width="full">
        <HStack marginTop="16px">
          <Box w="50%">
            <DetailsTitle title="Nº de série" />
            <DetailsDescription title="741852963" />
          </Box>

          <Box>
            <DetailsTitle title="ID" />
            <DetailsDescription title="963852741" />
          </Box>
        </HStack>

        <HStack marginTop="16px">
          <Box w="50%">
            <DetailsTitle title="Chave de segurança" />
            <DetailsDescription title="258369147" />
          </Box>

          <Box>
            <DetailsTitle title="Versão de firmware" />
            <DetailsDescription title="V.19" />
          </Box>
        </HStack>
      </VStack>

      <DetailsHeader title="Registros" />

      {registry.map((item) => (
        <Registry key={item} title={item} date="20/02/2021" mt={1.5} />
      ))}

      <Center mt="16px">
        <Box flexWrap="wrap" w="331px" flexDirection="row">
          <Signals
            icon={
              <MaterialIcons
                name="radio-button-on"
                color="#00C020"
                size={22}
              />
            }
            title="Status"
            value="Ativo"
            onPress={() => { }}
          />

          <Signals
            icon={
              <FontAwesome5 name="battery-full" color="#00C020" size={22} />
            }
            title="Nível de bateria"
            value="75%"
            ml="10px"
            onPress={() => { }}
          />

          <Signals
            icon={<FontAwesome5 name="wifi" color="#00C020" size={22} />}
            title="Sinal de Wi-fi"
            value="100%"
            mt="10px"
            onPress={() => { }}
          />

          <Signals
            icon={<FontAwesome5 name="signal" color="#00C020" size={22} />}
            title="Sinal de dados móveis"
            value="100%"
            mt="10px"
            ml="10px"
            onPress={() => { }}
          />
        </Box>
      </Center>
    </VStack>
  );
}
