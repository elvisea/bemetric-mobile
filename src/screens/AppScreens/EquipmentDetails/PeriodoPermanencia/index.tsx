import { Alert, Platform } from "react-native";
import React, { useCallback, useState } from "react";
import { HStack, IconButton, ScrollView, Text, VStack } from "native-base";

import { useFocusEffect, useRoute } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

import {
  subDays,
  startOfDay,
  endOfDay,
  differenceInDays,
  addDays,
  format,
} from "date-fns";

import api from "@services/api";

import { Button } from "@components/Button";
import { ButtonDate } from "@components/ButtonDate";
import { GenericModal } from "@components/GenericModal";
import { PeriodOption } from "@components/PeriodOption";
import { HeaderDefault } from "@components/HeaderDefault";

import { Permanencia } from "../components/Permanencia";
import { IParams } from "../interfaces/IEquipamentDetails";

import { Icon } from "./styles";
import { THEME } from "@theme/theme";

import { IPeriodStay } from "@interfaces/IPeriodStay";

import { date } from "@constants/date";
import { dateOptions } from "@constants/dateOptions";

export function PeriodoPermanencia() {
  const { colors } = THEME;

  const route = useRoute();
  const { params } = route.params as IParams;

  const [data, setData] = useState<IPeriodStay | null>(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [end, setEnd] = useState(endOfDay(new Date()));
  const [start, setStart] = useState(startOfDay(subDays(new Date(), 1)));

  const [selectStartDate, setSelectStartDate] = useState(false);
  const [selectFinalDate, setSelectFinalDate] = useState(false);

  const [useData, setUseData] = useState(false);
  const [selectedRange, setSelectedRange] = useState(1);

  const formatHours = (time: number) => {
    const hour = Math.floor(time);
    const decimal = (time - hour).toFixed(2);
    const minutes = parseInt(decimal.replace(".", ""));

    if (minutes === 0) {
      return `${hour}h`;
    } else {
      return `${hour}h e ${minutes}min`;
    }
  };

  const handleSelectPeriod = (value: number) => {
    setSelectedRange(value);
    setStart(date[value]);
    setEnd(endOfDay(new Date()));
    setUseData(false);
  };

  const handleStartSate = useCallback(
    (_event: unknown, date: Date | undefined) => {
      setSelectedRange(5);
      setUseData(true);

      if (Platform.OS === "android") setSelectStartDate(!selectStartDate);

      if (date) setStart(date);
    },
    [selectStartDate]
  );

  const handleEndDate = useCallback(
    (_event: unknown, date: Date | undefined) => {
      setSelectedRange(5);
      setUseData(true);

      if (Platform.OS === "android") setSelectFinalDate(!selectFinalDate);

      if (date) setEnd(endOfDay(date));
    },
    [selectFinalDate]
  );

  const maximumDate = () => {
    const difference = differenceInDays(new Date(), start);
    if (difference < 30) return new Date();
    if (difference >= 30) return addDays(start, 30);
    return new Date();
  };

  async function fetchData() {
    const data = {
      dataDe: end?.toISOString(),
      dataAte: start?.toISOString(),
      usaData: useData,
      tipoIntervalo: selectedRange ? selectedRange : 0,
      codigoEquipamento: params.codigoEquipamento,
    };

    try {
      const response = await api.post("/Equipamento/PeriodoPermanencia", data);

      setData(response.data);
      setIsOpenModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Período de permanência" mb="16px">
        <IconButton
          icon={<Icon name="sliders" />}
          onPress={() => setIsOpenModal(!isOpenModal)}
        />
      </HeaderDefault>

      <ScrollView w="full" px="16px" showsVerticalScrollIndicator={false}>
        <Permanencia
          icon={<MaterialCommunityIcons name="filter" size={22} color="#FFF" />}
          title="Em geocercas"
          total={data ? formatHours(data.totalHorasGeocerca) : "-"}
          hours={data ? formatHours(data.horasTrabalhadasGeocerca) : "-"}
          on={data ? formatHours(data.paradoIgnicaoLigadaGeocerca) : "-"}
          off={data ? formatHours(data.paradoIgnicaoDesligadaGeocerca) : "-"}
        />

        <Permanencia
          icon={
            <MaterialCommunityIcons name="arrow-right" size={22} color="#FFF" />
          }
          title="Em pontos de interesse"
          total={data ? formatHours(data.totalHorasPontoInteresse) : "-"}
          hours={data ? formatHours(data.horasTrabalhadasPontoInteresse) : "-"}
          on={data ? formatHours(data.paradoIgnicaoLigadaPontoInteresse) : "-"}
          off={
            data ? formatHours(data.paradoIgnicaoDesligadaPontoInteresse) : "-"
          }
        />

        <Permanencia
          icon={
            <MaterialCommunityIcons name="map-marker" size={22} color="#FFF" />
          }
          title="Outras localizações"
          total={data ? formatHours(data.totalHorasOutrasLocalizacoes) : "-"}
          hours={data ? formatHours(data.totalHorasOutrasLocalizacoes) : "-"}
          on={
            data ? formatHours(data.paradoIgnicaoLigadaOutrasLocalizacoes) : "-"
          }
          off={
            data
              ? formatHours(data.paradoIgnicaoDesligadaOutrasLocalizacoes)
              : "-"
          }
        />
      </ScrollView>

      <GenericModal
        title="Período"
        isOpen={isOpenModal}
        closeModal={() => setIsOpenModal(!isOpenModal)}
      >
        {dateOptions.map((period) => (
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
            date={format(start, "dd/MM/yyyy")}
            onPress={() => setSelectStartDate(!selectStartDate)}
          />

          <ButtonDate
            date={format(end, "dd/MM/yyyy")}
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
      </GenericModal>

      {selectStartDate && (
        <DateTimePicker
          mode="date"
          value={start}
          maximumDate={new Date()}
          testID="dateTimePicker"
          display="default"
          onChange={handleStartSate}
        />
      )}

      {selectFinalDate && (
        <DateTimePicker
          mode="date"
          value={end}
          minimumDate={start}
          maximumDate={maximumDate()}
          testID="dateTimePicker"
          display="default"
          onChange={handleEndDate}
        />
      )}
    </VStack>
  );
}
