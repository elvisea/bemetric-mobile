import { endOfDay } from "date-fns";

import {
  Foundation,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { THEME } from "@theme/theme";

import { Count, Input, Item, Key, State } from "../types";

const { colors } = THEME;

const inputs: Input[] = [
  { id: 1, key: "period", title: "Período" },
  { id: 2, key: "type", title: "Tipo de Evento" },
  { id: 3, key: "events", title: "Eventos" },
  { id: 4, key: "markers", title: "Marcadores" },
  { id: 5, key: "equipments", title: "Equipamentos" },
];

const period: Item[] = [
  { name: "Últimas 24 horas", code: 0, type: 0 },
  { name: "Últimos 7 dias", code: 1, type: 0 },
  { name: "Últimos 15 dias", code: 2, type: 0 },
  { name: "Últimos 30 dias", code: 3, type: 0 },
];

const types: Item[] = [
  { name: "Evento Comum", code: 0, type: 0 },
  { name: "Evento Alerta", code: 1, type: 0 },
];

const options: Record<Key, Item[]> = {
  type: types,
  period: period,
  events: [] as Item[],
  markers: [] as Item[],
  equipments: [] as Item[],
};

const search = {
  type: [{ name: "Evento Comum", code: 0, type: 0 }],
  period: [{ name: "Últimas 24 horas", code: 0, type: 0 }],
  events: [],
  equipments: [],
  markers: [],
};

const count: Count = {
  point: {
    icon: <FontAwesome name="gears" size={18} color={colors.white} />,
    title: "Equipamento",
    amount: 0,
    ignition: { on: 0, off: 0 },
    movement: 0,
    permanence: { exceeded: 0, obeyed: 0 },
    speed: 0,
  },
  equipment: {
    icon: <Foundation name="map" size={20} color={colors.white} />,
    title: "Outras Localizações",
    amount: 0,
    ignition: { on: 0, off: 0 },
    movement: 0,
    permanence: { exceeded: 0, obeyed: 0 },
    speed: 0,
  },
  geogence: {
    icon: (
      <MaterialCommunityIcons name="map-marker-path" size={22} color="white" />
    ),
    title: "Em Geocercas",
    amount: 0,
    ignition: { on: 0, off: 0 },
    movement: 0,
    permanence: { exceeded: 0, obeyed: 0 },
    speed: 0,
  },
  other: {
    icon: <FontAwesome5 color={colors.white} size={20} name="dot-circle" />,
    title: "Em Pontos de Interesse",
    amount: 0,
    ignition: { on: 0, off: 0 },
    movement: 0,
    permanence: { exceeded: 0, obeyed: 0 },
    speed: 0,
  },
};

const initialState: State = {
  search: search,
  count,
  options: options,
  isOpenModal: false,
  isVisible: false,
  picker: { date: "initial", isVisible: false },
  inputs: inputs,
  events: [],
  isLoading: false,
  modal: {
    isOpen: false,
    selected: "period",
  },
  date: {
    initial: new Date(),
    final: endOfDay(new Date()),
  },
};

export { initialState };
