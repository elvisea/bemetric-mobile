import { Alert, ScrollView } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { HStack, Text } from "native-base";

import {
  addDays,
  differenceInDays,
  endOfDay,
  format,
  startOfDay,
} from "date-fns";

import { RFValue } from "react-native-responsive-fontsize";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import {
  Foundation,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import api from "@services/api";
import { THEME } from "@theme/theme";

import { useCustomer } from "@hooks/customer";
import { useAuth } from "@hooks/authentication";

import { date } from "@constants/date";

import { Button } from "@components/Button";
import { ItemOption } from "@components/ItemOption";
import { ButtonDate } from "@components/ButtonDate";
import { SelectButton } from "@components/SelectButton";
import { GenericModal } from "@components/GenericModal";
import { HeaderDefault } from "@components/HeaderDefault";
import { CardEventLog } from "./components/CardEventLog";
import { LoadingSpinner } from "@components/LoadingSpinner";

import { Marker, Options, Search, Value } from "./types";

import {
  inputs,
  inicialOptionsState,
  inicialSearchState,
} from "./constants/inputs";

import { ButtonFilter } from "./styles";

import {
  transformEquipmentsData,
  transformEventsData,
  transformMarkersData,
} from "./utils";

export function EventLog() {
  const { colors } = THEME;

  const { user } = useAuth();
  const { customer } = useCustomer();

  const [data, setData] = useState<any | null>();

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

  const handleSetStartDate = (date: Date) => {
    setSelectStartDate(false);
    setSearch((rest) => ({ ...rest, start: startOfDay(date) }));
  };

  const handleSetFinalDate = (date: Date) => {
    setSelectFinalDate(false);
    setSearch((rest) => ({ ...rest, end: endOfDay(date) }));
  };

  const chooseModalOption = (modalOption: Value) => {
    setIsOpenSecondaryModal(true);
    setOptionModal(modalOption);
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
        (equipment) => equipment !== codigo,
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
      (marker) => marker.codigo === marker.codigo,
    );

    if (include) {
      const filtered = search.markers.filter(
        (marker) => marker.codigo !== marker.codigo,
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

  const choosePeriod = (codigo: number) => {
    setSearch((rest) => ({ ...rest, period: codigo }));
    setSearch((rest) => ({ ...rest, start: date[codigo] }));
  };

  const chooseEventType = (codigo: number) => {
    setSearch((rest) => ({ ...rest, eventType: codigo }));
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
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    } finally {
      setIsLoading(false);
      setIsOpenPrimaryModal(false);
      setSearch(inicialSearchState);
    }
  }, [search]);

  const fetchData = async () => {
    const data = {
      tipoIntervalo: 3,
      codigoCliente: customer?.codigoCliente,
      codigoUsuario: user?.codigoUsuario,
    };

    try {
      const response = await api.post("/Evento/ObterLista", data);
      setData(response.data);
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        Alert.alert(
          "Erro de Comunicação",
          "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
        );
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      isActive && fetchDataLists();

      return () => {
        isActive = false;
      };
    }, []),
  );

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

        <DateTimePickerModal
          isVisible={selectStartDate}
          mode="date"
          date={search.start}
          maximumDate={new Date()}
          onCancel={() => setSelectStartDate(false)}
          onConfirm={handleSetStartDate}
        />

        <DateTimePickerModal
          isVisible={selectFinalDate}
          mode="date"
          date={search.end}
          minimumDate={search.start}
          maximumDate={maximumDate()}
          onCancel={() => setSelectFinalDate(false)}
          onConfirm={handleSetFinalDate}
        />

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
                  (marker) => marker.codigo === marker.codigo,
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
        <ScrollView
          style={{ flex: 1, paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <CardEventLog
            title={"Equipamento"}
            icon={<FontAwesome name="gears" size={18} color={colors.white} />}
            totalEquip={data?.totalEquipamentos}
            stopOFF={
              data?.totalEquipamentoMovimentoEquipamentosParadoIgnicaoDesligada
            }
            movement={data?.totalEquipamentosMovimento}
            stopON={data?.totalEquipamentosParadoIgnicaoLigada}
            speedExcd={data?.totalEquipamentosVelocidadeExcedida}
          />

          <CardEventLog
            title={"Outras localizações"}
            icon={<Foundation name="map" size={20} color={colors.white} />}
            stopOFF={data?.intOutraLocalizacaoParadoIgnicaoDesligada}
            stopON={data?.totalOutraLocalizacaoParadoIgnicaoLiagada}
          />

          <CardEventLog
            title={"Em geocercas"}
            icon={
              <MaterialCommunityIcons
                name="map-marker-path"
                size={22}
                color="white"
              />
            }
            stopOFF={data?.totalGeocercaParadoIgnicaoDesligada}
            stayExcd={data?.totalGeocercaPermanenciaExcedida}
            stopON={data?.totalGeocercaParadoIgnicaoLigada}
            stayObd={data?.totalGeocercaPermanenciaObedecida}
          />

          <CardEventLog
            title={"Em pontos de interesse"}
            icon={
              <FontAwesome5 color={colors.white} size={20} name="dot-circle" />
            }
            stopOFF={data?.totalPontoInteresseParadoIgnicaoDesligada}
            stayExcd={data?.totalPontoInteressePermanenciaExcedida}
            stopON={data?.totalPontoInteresseParadoIgnicaoLiagada}
            stayObd={data?.totalPontoInteressePermanenciaObedecida}
          />
        </ScrollView>
      )}
    </>
  );
}
