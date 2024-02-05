import { Alert } from "react-native";
import React, { useCallback, useState } from "react";
import { HStack, IconButton, ScrollView, Text, VStack } from "native-base";

import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { endOfDay, differenceInDays, addDays, format } from "date-fns";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { Button } from "@components/Button";
import { ButtonDate } from "@components/ButtonDate";
import { GenericModal } from "@components/GenericModal";
import { PeriodOption } from "@components/PeriodOption";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";
import { PermanenceCard } from "../components/PermanenceCard";

import { IParams } from "../interfaces/IEquipamentDetails";

import { date } from "@constants/date";
import { dateOptions } from "@constants/dateOptions";

import { Icon } from "./styles";
import { DatePickerSelection } from "./types";
import { formatHours, transformData } from "./functions";
import { card, initialState, resposta } from "./constants";

export function PeriodoPermanencia() {
  const { colors } = THEME;

  const route = useRoute();
  const { params } = route.params as IParams;

  const [state, setState] = useState(initialState);

  const handleSelectPeriod = (value: number) => {
    setState((prevState) => ({
      ...prevState,
      period: value,
      useData: false,
      date: { final: endOfDay(new Date()), start: date[value] },
    }));
  };

  const onConfirm = useCallback((date: Date) => {
    setState((prevState) => ({
      ...prevState,
      period: 5,
      useData: true,
      datePicker: { ...prevState.datePicker, isVisible: false },
      date: {
        ...prevState.date,
        [prevState.datePicker.selected]:
          prevState.datePicker.selected === "final" ? endOfDay(date) : date,
      },
    }));
  }, []);

  const maximumDate = () => {
    const difference = differenceInDays(new Date(), state.date.start);
    if (difference < 30) return new Date();
    if (difference >= 30) return addDays(state.date.start, 30);
    return new Date();
  };

  const toggleModal = () => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: !state.isOpenModal,
    }));
  };

  const toggleDateModal = (selected: DatePickerSelection) => {
    setState((prevState) => ({
      ...prevState,
      datePicker: { selected: selected, isVisible: true },
    }));
  };

  const fetchData = async () => {
    const data = {
      dataDe: state.date.final?.toISOString(),
      dataAte: state.date.start?.toISOString(),
      usaData: state.useData,
      tipoIntervalo: state.period ? state.period : 0,
      codigoEquipamento: params.codigoEquipamento,
    };

    try {
      setState((prevState) => ({
        ...prevState,
        isLoading: true,
        isOpenModal: false,
      }));

      const response = await api.post("/Equipamento/PeriodoPermanencia", data);

      const transformedResponse = transformData(response.data);

      setState((prevState) => ({
        ...prevState,
        data: transformedResponse,
      }));
    } catch (error) {
      Alert.alert(resposta[0].title, resposta[0].subtitle, [
        {
          text: resposta[0].text,
        },
      ]);
    } finally {
      setState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return (
    <VStack flex={1} width="full" bg={colors.shape}>
      <HeaderDefault title="Período de permanência" mb="16px">
        <IconButton icon={<Icon name="sliders" />} onPress={toggleModal} />
      </HeaderDefault>

      {state.isLoading && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {!state.isLoading && state.data && (
        <ScrollView w="full" px="16px" showsVerticalScrollIndicator={false}>
          {Object.values(state.data.area).map((item, index) => (
            <PermanenceCard
              key={index}
              icon={card[index].icon}
              title={card[index].title}
              total={formatHours(state.data, item.totalHoras)}
              hours={formatHours(state.data, item.horasTrabalhadas)}
              on={formatHours(state.data, item.paradoIgnicaoLigada)}
              off={formatHours(state.data, item.paradoIgnicaoDesligada)}
            />
          ))}
        </ScrollView>
      )}

      <GenericModal
        title="Período"
        isOpen={state.isOpenModal}
        closeModal={toggleModal}
      >
        {dateOptions.map((period) => (
          <PeriodOption
            key={period.value}
            title={period.title}
            isActive={state.period === period.value}
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
            date={format(state.date.start, "dd/MM/yyyy")}
            onPress={() => toggleDateModal(DatePickerSelection.Start)}
          />

          <ButtonDate
            date={format(state.date.final, "dd/MM/yyyy")}
            onPress={() => toggleDateModal(DatePickerSelection.Final)}
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

      <DateTimePickerModal
        isVisible={state.datePicker.isVisible}
        mode="date"
        date={new Date(state.date[state.datePicker.selected])}
        minimumDate={
          state.datePicker.selected === "start" ? undefined : state.date.start
        }
        maximumDate={
          state.datePicker.selected === "start" ? new Date() : maximumDate()
        }
        onCancel={() => toggleDateModal(state.datePicker.selected)}
        onConfirm={onConfirm}
      />
    </VStack>
  );
}
