import { Alert, Platform, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import { HStack, IconButton, Text, VStack } from "native-base";

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import axios from "axios";

import {
  subDays,
  format,
  startOfDay,
  endOfDay,
  differenceInDays,
  addDays,
} from "date-fns";

import { RFValue } from "react-native-responsive-fontsize";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Item } from "@components/Item";
import { Button } from "@components/Button/index";
import { ButtonDate } from "@components/ButtonDate";
import { GenericModal } from "@components/GenericModal";
import { PeriodOption } from "@components/PeriodOption";
import { HeaderDefault } from "@components/HeaderDefault";

import api from "@services/api";

import Speedometer from "@assets/speedometer.svg";
import WorkedHours from "@assets/worked-hours.svg";

import { IParams } from "../interfaces/IEquipamentDetails";
import { IList, ITelemetryData } from "./interfaces/TelemetryData";

import { Icon } from "./styles";
import { THEME } from "@theme/theme";

import { url } from "@constants/url";
import { date } from "@constants/date";
import { dateOptions } from "@constants/dateOptions";

export function TelemetryData() {
  const { colors, fonts } = THEME;

  const route = useRoute();
  const navigation = useNavigation();
  const { params } = route.params as IParams;

  const [data, setData] = useState<ITelemetryData | null>(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [end, setEnd] = useState(endOfDay(new Date()));
  const [start, setStart] = useState(startOfDay(subDays(new Date(), 1)));

  const [selectStartDate, setSelectStartDate] = useState(false);
  const [selectFinalDate, setSelectFinalDate] = useState(false);

  const [useData, setUseData] = useState(false);
  const [selectedRange, setSelectedRange] = useState(1);

  const list: IList = {
    0: {
      url: url.kmRodados,
      icon: <MaterialCommunityIcons name="highway" color="#878787" size={22} />,
      title: "Kms Rodados",
      value: data ? data.kmRodados : null,
      label: "Km/h",
    },
    1: {
      url: url.horasLigadas,
      icon: <Ionicons name="time" color="#878787" size={22} />,
      title: "Horas Ligado",
      value: data ? data.horasLigadas : null,
      label: "horas",
    },
    2: {
      url: url.horasTrabalhadas,
      icon: <WorkedHours />,
      title: "Horas Trabalhado",
      value: data ? data.horasTrabalhadas : null,
      label: "horas",
    },
    3: {
      url: url.velocidadeMedia,
      icon: <Speedometer />,
      title: "Velocidade Média",
      value: data ? data.velocidadeMedia : null,
      label: "Km/h",
    },
  };

  const handleNextPage = (url: string) => {
    navigation.navigate("Chart", {
      url,
      dataDe: start.toISOString(),
      dataAte: end.toISOString(),
      usaData: useData,
      tipoIntervalo: selectedRange,
      codigoEquipamento: params.codigoEquipamento,
    });
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

  const fetchData = async () => {
    const data = {
      dataDe: start?.toISOString(),
      dataAte: end?.toISOString(),
      usaData: useData,
      tipoIntervalo: selectedRange ? selectedRange : 0,
      codigoEquipamento: params.codigoEquipamento,
    };

    try {
      const response = await api.post("/Equipamento/DadosTelemetrias", data);

      setData(response.data);
      setIsOpenModal(false);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  const maximumDate = () => {
    const difference = differenceInDays(new Date(), start);
    if (difference < 30) return new Date();
    if (difference >= 30) return addDays(start, 30);
    return new Date();
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
      <HeaderDefault title="Dados de telemetria" mb="16px">
        <IconButton
          icon={<Icon name="sliders" />}
          onPress={() => setIsOpenModal(!isOpenModal)}
        />
      </HeaderDefault>

      {Array.of(0, 1, 2, 3).map((item) => (
        <TouchableOpacity
          key={item}
          disabled={typeof data !== "object"}
          activeOpacity={0.7}
          onPress={() => handleNextPage(list[item].url)}
        >
          <Item icon={list[item].icon} title={list[item].title} mb="8px">
            <Text
              color={
                typeof data === "object" ? colors.blue[700] : colors.red[600]
              }
              fontSize="16px"
              fontFamily={fonts.Roboto_400Regular}
              isTruncated
            >
              {typeof data === "object"
                ? `${list[item].value} ${list[item].label}`
                : "Vazio"}
            </Text>
          </Item>
        </TouchableOpacity>
      ))}

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
