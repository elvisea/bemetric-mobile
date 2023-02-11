import { Platform } from "react-native";
import React, { useCallback, useState } from "react";
import { HStack, IconButton, Text, VStack } from "native-base";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import axios from "axios";
import { subDays, format } from "date-fns";
import { RFValue } from "react-native-responsive-fontsize";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Item } from "@components/Item";
import { DetailsHeader } from "@components/EquipmentDetails/DetailsHeader";

import api from "@services/api";

import Speedometer from "@assets/speedometer.svg";
import WorkedHours from "@assets/worked-hours.svg";

import { Icon } from "./styles";
import { THEME } from "@theme/theme";

import { Button } from "@components/Button/index";
import { ButtonDate } from "@components/ButtonDate";
import { ModalPeriod } from "@components/ModalPeriod";
import { PeriodOption } from "@components/PeriodOption";

interface IParams {
  params: {
    codigoEquipamento: number;
  };
}

interface IData {
  horasLigadas: number;
  horasTrabalhadas: number;
  kmRodados: number;
  velocidadeMedia: number;
}

interface IOptions {
  title: string;
  value: number;
}

const options: IOptions[] = [
  { title: "Últimas 24 horas", value: 0 },
  { title: "Últimos 7 dias", value: 1 },
  { title: "Últimos 15 dias", value: 2 },
  { title: "Últimos 30 dias", value: 3 },
];

interface IDate {
  [index: number]: Date;
}

export function TelemetryData() {
  const { colors } = THEME;

  const route = useRoute();
  const { params } = route.params as IParams;

  console.log("TelemetryData Screen Params:", params);

  const [data, setData] = useState<IData | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [finalDate, setFinalDate] = useState(new Date());
  const [initialDate, setInitialDate] = useState(subDays(new Date(), 1));

  const [selectStartDate, setSelectStartDate] = useState(false);
  const [selectFinalDate, setSelectFinalDate] = useState(false);

  console.log("State Data Inicial:", initialDate);
  console.log("State Data Final:", finalDate);

  const [selectedRange, setSelectedRange] = useState<number | null>(0);

  const date: IDate = {
    0: subDays(new Date(), 1),
    1: subDays(new Date(), 7),
    2: subDays(new Date(), 15),
    3: subDays(new Date(), 30),
  };

  const handleSelectPeriod = (value: number) => {
    setSelectedRange(value);
    setInitialDate(date[value]);
    setFinalDate(new Date());
  };

  const handleStartSate = useCallback(
    (_event: unknown, date: Date | undefined) => {
      setSelectedRange(null);

      if (Platform.OS === "android") setSelectStartDate(!selectStartDate);

      if (date) setInitialDate(date);
    },
    [selectStartDate]
  );

  const handleEndDate = useCallback(
    (_event: unknown, date: Date | undefined) => {
      setSelectedRange(null);

      if (Platform.OS === "android") setSelectFinalDate(!selectFinalDate);

      if (date) setFinalDate(date);
    },
    [selectFinalDate]
  );

  const fetchData = async () => {
    const data = {
      codigoEquipamento: params.codigoEquipamento,
      dataDe: initialDate?.toISOString(),
      dataAte: finalDate?.toISOString(),
      tipoIntervalo: selectedRange ? selectedRange : 0,
      usaData: true,
    };

    console.log("Dados enviados:", data);

    try {
      const response = await api.post("/Equipamento/DadosTelemetrias", data);

      console.log("=>", response.data);

      setData(response.data);
      setIsOpenModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) console.log("Error:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      if (isActive) fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <DetailsHeader title="Dados de telemetria" mb="16px">
        <IconButton
          icon={<Icon name="sliders" />}
          onPress={() => setIsOpenModal(!isOpenModal)}
        />
      </DetailsHeader>

      <Item
        icon={
          <MaterialCommunityIcons name="highway" color="#878787" size={22} />
        }
        title="Kms Rodados"
        mb="8px"
      >
        <Text
          color="blue.700"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          {data ? `${data.kmRodados} Km/h` : ""}
        </Text>
      </Item>

      <Item
        icon={<Ionicons name="time" color="#878787" size={22} />}
        title="Horas Ligado"
        mb="8px"
      >
        <Text
          color="blue.700"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          {data ? `${data.horasLigadas} horas` : ""}
        </Text>
      </Item>

      <Item icon={<WorkedHours />} title="Horas Trabalhado" mb="8px">
        <Text
          color="blue.700"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          {data ? `${data.horasTrabalhadas} horas` : ""}
        </Text>
      </Item>

      <Item icon={<Speedometer />} title="Velocidade Média" mb="8px">
        <Text
          color="blue.700"
          fontSize="16px"
          fontFamily="Roboto_400Regular"
          isTruncated
        >
          {data ? `${data.velocidadeMedia} Km/h` : ""}
        </Text>
      </Item>

      <ModalPeriod
        title="Período"
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(!isOpenModal)}
      >
        {options.map((period) => (
          <PeriodOption
            key={period.value}
            title={period.title}
            isActive={selectedRange === period.value}
            onPress={() => handleSelectPeriod(period.value)}
          />
        ))}

        <Text
          mt={`${RFValue(12)}px`}
          mb={`${RFValue(4)}px`}
          fontSize={16}
          color={THEME.colors.blue[700]}
        >
          Data Personalizada
        </Text>

        <HStack w="full" justifyContent="space-between">
          <ButtonDate
            date={format(initialDate, "dd/MM/yyyy")}
            onPress={() => setSelectStartDate(!selectStartDate)}
          />

          <ButtonDate
            date={format(finalDate, "dd/MM/yyyy")}
            onPress={() => setSelectFinalDate(!selectFinalDate)}
          />
        </HStack>

        <Button
          h={`${RFValue(48)}px`}
          mt={`${RFValue(20)}px`}
          title="Filtrar"
          width="100%"
          onPress={fetchData}
        />
      </ModalPeriod>

      {selectStartDate && (
        <DateTimePicker
          mode="date"
          value={initialDate}
          testID="dateTimePicker"
          display="default"
          onChange={handleStartSate}
        />
      )}

      {selectFinalDate && (
        <DateTimePicker
          mode="date"
          value={finalDate}
          maximumDate={new Date()}
          testID="dateTimePicker"
          display="default"
          onChange={handleEndDate}
        />
      )}
    </VStack>
  );
}
