type Value = "periods" | "eventTypes" | "events" | "markers" | "equipments";

type Input = {
  id: number;
  title: string;
  value: Value;
};

type Event = {
  tipo: number;
  nome: string;
  codigo: number;
};

type Marker = {
  tipo: number;
  nome: string;
  codigo: number;
};

type Equipment = {
  tipo: number;
  nome: string;
  codigo: number;
};

type List = {
  tipo: number;
  nome: string;
  codigo: number;
};

type Options = {
  periods: List[];
  eventTypes: List[];
  events: List[];
  markers: List[];
  equipments: List[];
};

type Search = {
  period: number;
  eventType: number;
  events: number[];
  markers: Marker[];
  equipments: number[];
  start: Date;
  end: Date;
};

export { Event, Marker, Equipment, Options, Input, Value, List, Search };
