import { endOfDay } from "date-fns";
import { Input, List, Marker } from "../types";

const inputs: Input[] = [
  { id: 1, value: "periods", title: "Período" },
  { id: 2, value: "eventTypes", title: "Tipo de Evento" },
  { id: 3, value: "events", title: "Eventos" },
  { id: 4, value: "markers", title: "Marcadores" },
  { id: 5, value: "equipments", title: "Equipamentos" },
];

const periods: List[] = [
  { nome: "Últimas 24 horas", codigo: 0, tipo: 0 },
  { nome: "Últimos 7 dias", codigo: 1, tipo: 0 },
  { nome: "Últimos 15 dias", codigo: 2, tipo: 0 },
  { nome: "Últimos 30 dias", codigo: 3, tipo: 0 },
];

const eventTypes: List[] = [
  { nome: "Evento Alerta", codigo: 1, tipo: 0 },
  { nome: "Evento Comum", codigo: 0, tipo: 0 },
];

const inicialOptionsState = {
  periods: periods,
  eventTypes: eventTypes,
  events: [],
  markers: [],
  equipments: [],
};

const inicialSearchState = {
  period: 0,
  eventType: 0,

  events: [],
  markers: [] as Marker[],
  equipments: [],

  start: new Date(),
  end: endOfDay(new Date()),
};

export { inputs, periods, eventTypes, inicialSearchState, inicialOptionsState };
