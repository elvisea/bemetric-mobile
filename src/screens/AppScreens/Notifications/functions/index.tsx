import { useCallback } from "react";
import { Alert } from "react-native";

import uuid from "react-native-uuid";
import { addDays, differenceInDays } from "date-fns";

import api from "@services/api";

import {
  Action,
  EquipmentReceived,
  Event,
  EventReceived,
  FetchEventParams,
  Item,
  Key,
  MarkerReceived,
  ModalState,
  ObjectSearch,
  Picker,
  ReceivedEvents,
  Search,
  SearchDate,
  SearchState,
} from "../types";

export const normalizeEvents = (events: ReceivedEvents[]): Event[] => {
  return events.map((event) => ({
    key: uuid.v4().toString(),
    event: event.codigoEvento,
    device: event.codigoDispositivo,
    equipment: event.codigoEquipamento,
    date: event.criadoEmFormatado,
    html: event.mensagemHtml,
    type: event.tipoEvento,
  }));
};

const mountMarkers = (items: Item[]): MarkerReceived[] => {
  return items.map((item) => ({
    tipoMarcador: item.type,
    nomeMarcador: item.name,
    codigoMarcador: item.code,
  }));
};

export const mountSearchObject = (
  search: Search,
  user: number,
  client: number,
  date: SearchDate,
): ObjectSearch => {
  return {
    codigoCliente: client,
    localDashboard: 3,
    tipoEvento: search.type[0].code,
    tipoIntervalo: 4,
    codigoUsuario: user,
    periodoAte: date.final.toISOString(),
    periodoDe: date.initial.toISOString(),
    listaEventos: search.events.map((item) => item.code),
    listaMarcadores: mountMarkers(search.markers),
    listaEquipamentos: search.equipments.map((item) => item.code),
  };
};

export const normalizeEventsReceived = (data: EventReceived[]): Item[] => {
  return data.map((event) => ({
    type: event.tipoEvento,
    name: event.nomeEvento,
    code: event.codigoEvento,
  }));
};

export const normalizeMarkers = (data: MarkerReceived[]): Item[] => {
  return data.map((marker) => ({
    type: marker.tipoMarcador,
    name: marker.nomeMarcador,
    code: marker.codigoMarcador,
  }));
};

export const normalizeEquipment = (data: EquipmentReceived[]): Item[] => {
  return data.map((equipment) => ({
    type: 0,
    name: equipment.nomeEquipamento,
    code: equipment.codigoEquipamento,
  }));
};

export const useShowMaximumDate = (picker: Picker, maximumDate: () => Date) => {
  const showMaximumDate = useCallback(() => {
    return picker.date === "initial" ? new Date() : maximumDate();
  }, [picker]);

  return showMaximumDate;
};

export const useShowMinimumDate = (picker: Picker, dateState: SearchDate) => {
  const showMinimumDate = useCallback(() => {
    return picker.date === "initial" ? undefined : dateState.initial;
  }, [picker, dateState]);

  return showMinimumDate;
};

export const useIsSelected = (
  searchState: SearchState,
  modalState: ModalState,
) => {
  const isSelected = useCallback(
    (code: number) => {
      return searchState[modalState.selected]?.some(
        (item) => item.code === code,
      );
    },
    [searchState, modalState],
  );

  return isSelected;
};

export const useMaximumDate = (dateState: SearchDate) => {
  const maximumDate = useCallback(() => {
    const difference = differenceInDays(new Date(), dateState.initial);
    return difference < 30 ? new Date() : addDays(dateState.initial, 30);
  }, [dateState.initial]);

  return maximumDate;
};

export const useShowDate = (dateState: SearchDate, picker: Picker) => {
  const showDate = useCallback(() => {
    return picker.date === "initial" ? dateState.initial : dateState.final;
  }, [dateState, picker]);

  return showDate;
};

export const useSelectModal = (key: Key, dispatch: React.Dispatch<Action>) => {
  dispatch({ type: "SELECT_MODAL", payload: key });
};

export const useFetchData = (
  { customer, user, search, date }: FetchEventParams,
  dispatch: React.Dispatch<Action>,
) => {
  const fetchData = useCallback(async () => {
    dispatch({ type: "TOGGLE_LOADING" });
    dispatch({ type: "CLOSE_MAIN_MODAL" });
    const result = await fetchEvent({ customer, user, search, date });
    dispatch({ type: "TOGGLE_LOADING" });
    if (result) {
      dispatch({ type: "SET_EVENTS", payload: result.events });
      dispatch({ type: "SET_OPTIONS", payload: result.options });
    }
  }, [customer, user, search, date, dispatch]);

  return fetchData;
};

export const useChooseOption = (
  selected: keyof Search,
  dispatch: React.Dispatch<Action>,
) => {
  const chooseOption = useCallback(
    (item: Item) => {
      switch (selected) {
        case "type":
          dispatch({ type: "SELECT_TYPE", payload: item });
          break;
        case "period":
          dispatch({ type: "SELECT_PERIOD", payload: item });
          break;
        default:
          dispatch({
            type: "UPDATE_ITEM",
            payload: { key: selected, item },
          });
          break;
      }
    },
    [selected, dispatch],
  );
  return chooseOption;
};

export const fetchEvent = async (params: FetchEventParams) => {
  if (params.customer && params.user) {
    try {
      const data = mountSearchObject(
        params.search,
        params.user.codigoUsuario,
        params.customer.codigoCliente,
        params.date,
      );

      console.log("Objeto Montado:", data);

      const response = await Promise.all([
        api.post("/Evento/ObterListaEventos", {}),
        api.post("/Evento/ObterListaMarcadores", {
          codigoCliente: params.customer.codigoCliente,
        }),
        api.post("/Evento/ObterListaEquipamentos", {
          codigoCliente: params.customer.codigoCliente,
        }),
        api.post("/Evento/ObterLista", data),
      ]);

      const normalizedEvents = normalizeEvents(response[3].data.listaEventos);

      return {
        events: normalizedEvents,
        options: {
          events: normalizeEventsReceived(response[0].data),
          markers: normalizeMarkers(response[1].data),
          equipments: normalizeEquipment(response[2].data),
        },
      };
    } catch (error) {
      Alert.alert(
        "Erro de Comunicação",
        "Não foi possível completar a solicitação. Por favor, tente novamente mais tarde.",
      );
      return null;
    }
  }
};
