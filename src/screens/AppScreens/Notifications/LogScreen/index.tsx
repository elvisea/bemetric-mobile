import React, { useCallback, useState } from "react";
import { Alert, FlatList, Platform, ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import axios from "axios";
import { HStack, Text } from "native-base";

import { RFValue } from "react-native-responsive-fontsize";
import DateTimePicker from "@react-native-community/datetimepicker";

import {
  addDays,
  differenceInDays,
  endOfDay,
  format,
  startOfDay,
} from "date-fns";

import { FontAwesome } from "@expo/vector-icons";

import api from "@services/api";
import { THEME } from "@theme/theme";
import { date } from "@constants/date";

import { useCustomer } from "@hooks/customer";
import { useAuth } from "@hooks/authentication";

import { Button } from "@components/Button";
import { LogCard } from "./components/LogCard";
import { ItemOption } from "@components/ItemOption";
import { ButtonDate } from "@components/ButtonDate";
import { GenericModal } from "@components/GenericModal";
import { SelectButton } from "@components/SelectButton";
import { HeaderDefault } from "@components/HeaderDefault";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { ButtonFilter } from "./styles";

import { Marker, Options, Search, Value } from "../EventLog/types";

import {
  inputs,
  inicialSearchState,
  inicialOptionsState,
} from "../EventLog/constants/inputs";

import {
  transformEquipmentsData,
  transformEventsData,
  transformMarkersData,
} from "../EventLog/utils";

import { IEvento } from "./types";

export function LogScreen() {
  const navigation = useNavigation();

  const { user } = useAuth();
  const { customer } = useCustomer();

  const [data, setData] = useState<IEvento[]>([]);

  const [isOpenPrimaryModal, setIsOpenPrimaryModal] = useState(false);
  const [isOpenSecondaryModal, setIsOpenSecondaryModal] = useState(false);

  const [selectStartDate, setSelectStartDate] = useState(false);
  const [selectFinalDate, setSelectFinalDate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [optionModal, setOptionModal] = useState<Value>("periods");

  const [search, setSearch] = useState<Search>(inicialSearchState);
  const [options, setOptions] = useState<Options>(inicialOptionsState);

  const maximumDate = () => {
    const difference = differenceInDays(new Date(), search.start);
    if (difference < 30) return new Date();
    if (difference >= 30) return addDays(search.start, 30);
    return new Date();
  };

  const handleStartSate = useCallback(
    (_event: unknown, date: Date | undefined) => {
      if (Platform.OS === "android") setSelectStartDate(!selectStartDate);

      if (date) {
        setSearch((rest) => ({ ...rest, start: startOfDay(date) }));
      }
    },
    [selectStartDate]
  );

  const handleEndDate = useCallback(
    (_event: unknown, date: Date | undefined) => {
      if (Platform.OS === "android") setSelectFinalDate(!selectFinalDate);

      if (date) {
        setSearch((rest) => ({ ...rest, end: endOfDay(date) }));
      }
    },
    [selectFinalDate]
  );

  const chooseModalOption = (modalOption: Value) => {
    setIsOpenSecondaryModal(true);
    setOptionModal(modalOption);
  };

  const choosePeriod = (codigo: number) => {
    setSearch((rest) => ({ ...rest, period: codigo }));
    setSearch((rest) => ({ ...rest, start: date[codigo] }));
  };

  const chooseEventType = (codigo: number) => {
    setSearch((rest) => ({ ...rest, eventType: codigo }));
  };

  const handleNextPage = (evento: IEvento) => {
    navigation.navigate("NotificationDetailing", {
      screen: "DetailingScreen",
      params: {
        codigoEvento: evento.codigoEvento,
        codigoDispositivo: evento.codigoDispositivo,
        codigoEquipamento: evento.codigoEquipamento,
      },
    });
  };

  const includeEvents = (codigo: number) => {
    const include = search.events.includes(codigo);

    if (include) {
      const filtered = search.events.filter((event) => event !== codigo);
      setSearch((rest) => ({ ...rest, events: filtered }));
    } else {
      setSearch((rest) => ({ ...rest, events: [...rest.events, codigo] }));
    }
  };

  const includeEquipments = (codigo: number) => {
    const include = search.equipments.includes(codigo);

    if (include) {
      const filtered = search.equipments.filter(
        (equipment) => equipment !== codigo
      );
      setSearch((rest) => ({ ...rest, equipments: filtered }));
    } else {
      setSearch((rest) => ({
        ...rest,
        equipments: [...rest.equipments, codigo],
      }));
    }
  };

  const includeMarkers = (marker: Marker) => {
    const include = search.markers.some(
      (marker) => marker.codigo === marker.codigo
    );

    if (include) {
      const filtered = search.markers.filter(
        (marker) => marker.codigo !== marker.codigo
      );
      setSearch((rest) => ({ ...rest, markers: filtered }));
    } else {
      setSearch((rest) => ({
        ...rest,
        markers: [
          ...rest.markers,
          { codigo: marker.codigo, tipo: marker.tipo, nome: marker.nome },
        ],
      }));
    }
  };

  const closePrimaryModal = () => {
    setIsOpenPrimaryModal(false);
    setSearch(inicialSearchState);
  };

  const fetchSearch = useCallback(async () => {
    const data = {
      codigoCliente: customer?.codigoCliente,
      tipoEvento: search.eventType,
      tipoIntervalo: 4,
      periodoDe: search.start,
      periodoAte: search.end,
      listaEventos: search.events,
      listaMarcadores: search.markers,
      listaEquipamentos: search.equipments,
      codigoUsuario: user?.codigoUsuario,
    };

    try {
      setIsLoading(true);

      const response = await api.post("/Evento/ObterLista", data);

      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    } finally {
      setIsLoading(false);
      setIsOpenPrimaryModal(false);
      setSearch(inicialSearchState);
    }
  }, [search]);

  const fetchDataLists = async () => {
    if (customer) {
      try {
        const [events, markers, equipments] = await Promise.all([
          api.post("/Evento/ObterListaEventos", {}),

          api.post("/Evento/ObterListaMarcadores", {
            codigoCliente: customer.codigoCliente,
          }),

          api.post("/Evento/ObterListaEquipamentos", {
            codigoCliente: customer.codigoCliente,
          }),
        ]);

        setOptions({
          ...options,
          events: transformEventsData(events.data),
          markers: transformMarkersData(markers.data),
          equipments: transformEquipmentsData(equipments.data),
        });
      } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
      }
    }
  };

  const fetchData = async () => {
    const data = {
      codigoCliente: customer?.codigoCliente,
      tipoIntervalo: 3,
      codigoUsuario: user?.codigoUsuario,
    };

    try {
      const response = await api.post("/Evento/ObterLista", data);

      setData(response.data.listaEventos);
    } catch (error) {
      if (axios.isAxiosError(error)) Alert.alert(`${error}`, `${error}`);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchDataLists();

      return () => {
        isActive = false;
      };
    }, [])
  );

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
    <>
      <GenericModal
        title="Buscar"
        isOpen={isOpenPrimaryModal}
        closeModal={closePrimaryModal}
      >
        {inputs.map((input) => (
          <SelectButton
            key={input.id}
            title={input.title}
            isActive={false}
            onPress={() => chooseModalOption(input.value)}
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

        <HStack w="full" justifyContent="space-between" mt={`${RFValue(4)}px`}>
          <ButtonDate
            date={format(search.start, "dd/MM/yyyy")}
            onPress={() => setSelectStartDate(!selectStartDate)}
          />

          <ButtonDate
            date={format(search.end, "dd/MM/yyyy")}
            onPress={() => setSelectFinalDate(!selectFinalDate)}
          />
        </HStack>

        {selectStartDate && (
          <DateTimePicker
            mode="date"
            value={search.start}
            maximumDate={new Date()}
            testID="dateTimePicker"
            display="default"
            onChange={handleStartSate}
          />
        )}

        {selectFinalDate && (
          <DateTimePicker
            mode="date"
            value={search.end}
            minimumDate={search.start}
            maximumDate={maximumDate()}
            testID="dateTimePicker"
            display="default"
            onChange={handleEndDate}
          />
        )}

        <Button
          h={`${RFValue(48)}px`}
          mt={`${RFValue(20)}px`}
          title="Buscar"
          width="100%"
          isDisabled={isLoading}
          isLoading={isLoading}
          onPress={fetchSearch}
        />
      </GenericModal>

      <GenericModal
        title="Selecione"
        isOpen={isOpenSecondaryModal}
        closeModal={() => setIsOpenSecondaryModal(false)}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          {options &&
            optionModal === "periods" &&
            options.periods.map((period) => (
              <ItemOption
                key={period.codigo}
                title={period.nome}
                onPress={() => choosePeriod(period.codigo)}
                isActive={search.period === period.codigo}
              />
            ))}

          {options &&
            optionModal === "eventTypes" &&
            options.eventTypes.map((eventType) => (
              <ItemOption
                key={eventType.codigo}
                title={eventType.nome}
                onPress={() => chooseEventType(eventType.codigo)}
                isActive={search.eventType === eventType.codigo}
              />
            ))}

          {options &&
            optionModal === "events" &&
            options.events.map((event) => (
              <ItemOption
                key={event.codigo}
                title={event.nome}
                onPress={() => includeEvents(event.codigo)}
                isActive={search.events.includes(event.codigo)}
              />
            ))}

          {options &&
            optionModal === "equipments" &&
            options.equipments.map((equipment) => (
              <ItemOption
                key={equipment.codigo}
                title={equipment.nome}
                onPress={() => includeEquipments(equipment.codigo)}
                isActive={search.equipments.includes(equipment.codigo)}
              />
            ))}

          {options &&
            optionModal === "markers" &&
            options.markers.map((marker) => (
              <ItemOption
                key={marker.codigo}
                title={marker.nome}
                onPress={() => includeMarkers(marker)}
                isActive={search.markers.some(
                  (marker) => marker.codigo === marker.codigo
                )}
              />
            ))}
        </ScrollView>

        <Button
          h={`${RFValue(48)}px`}
          mt={`${RFValue(20)}px`}
          width="100%"
          title="Selecionar"
          onPress={() => setIsOpenSecondaryModal(false)}
        />
      </GenericModal>

      {!data && <LoadingSpinner color={THEME.colors.blue[700]} />}

      {data && (
        <HeaderDefault title="Registro de Eventos">
          <ButtonFilter onPress={() => setIsOpenPrimaryModal(true)}>
            <FontAwesome
              name="sliders"
              size={24}
              color={THEME.colors.blue[700]}
            />
          </ButtonFilter>
        </HeaderDefault>
      )}

      {data && (
        <FlatList
          data={data}
          style={{ width: "100%", padding: 16 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.codigoEvento.toString()}
          renderItem={({ item }) => (
            <LogCard
              search={() => handleNextPage(item)}
              icon={item.tipoEvento === 0 ? "bell" : "flag"}
              html={item.mensagemHtml}
              date={item.criadoEmFormatado}
            />
          )}
        />
      )}
    </>
  );
}