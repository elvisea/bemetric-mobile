import { Customer, User } from "@typings/index";

type ListEvents = {
  codigoEvento: number;
  tipoEvento: number;
  mensagemHtml: string;
  criadoEmFormatado: string;
  eventoLido: boolean;
};

type EventListResponse = {
  intOutraLocalizacaoParadoIgnicaoDesligada: number;
  listaEventos: ListEvents[];
  totalEquipamentoMovimentoEquipamentosParadoIgnicaoDesligada: number;
  totalEquipamentos: number;
  totalEquipamentosMovimento: number;
  totalEquipamentosParadoIgnicaoLigada: number;
  totalEquipamentosVelocidadeExcedida: number;
  totalGeocercaParadoIgnicaoDesligada: number;
  totalGeocercaParadoIgnicaoLigada: number;
  totalGeocercaPermanenciaExcedida: number;
  totalGeocercaPermanenciaObedecida: number;
  totalOutraLocalizacaoParadoIgnicaoLiagada: number;
  totalPontoInteresseParadoIgnicaoDesligada: number;
  totalPontoInteresseParadoIgnicaoLiagada: number;
  totalPontoInteressePermanenciaExcedida: number;
  totalPontoInteressePermanenciaObedecida: number;
};

type ReceivedEvents = {
  angulo: number;
  codigoCliente: number;
  codigoDispositivo: number;
  codigoEquipamento: number;
  codigoEvento: number;
  codigoParceiro: number;
  codigoUsuario: number;
  criadoEmFormatado: string;
  eventoLido: false;
  latitude: number;
  listaEquipamentos: number[];

  listaEventos: number[];

  listaMarcadores: number[];

  localDashboard: number;
  longitude: number;
  latitudeFormatada: string;
  longitudeFormatada: string;
  mensagemHtml: string;
  periodoAte: string;
  periodoDe: string;
  tipoEvento: number;
  tipoIntervalo: number;
};

type Event = {
  key: string;
  type: number;
  date: string;
  html: string;
  event: number;
  device: number;
  equipment: number;
};

type EquipmentReceived = {
  codigoEquipamento: number;
  nomeEquipamento: string;
};

type MarkerReceived = {
  tipoMarcador: number;
  codigoMarcador: number;
  nomeMarcador: string;
};

type EventReceived = {
  tipoEvento: number;
  codigoEvento: number;
  nomeEvento: string;
};

type ObjectSearch = {
  codigoCliente: number;
  localDashboard: number;
  tipoEvento: number;
  tipoIntervalo: number;
  periodoDe: string;
  periodoAte: string;
  listaEventos: number[];
  listaMarcadores: MarkerReceived[];
  listaEquipamentos: number[];
  codigoUsuario: number;
};

type Search = {
  period: Item[];
  type: Item[];
  events: Item[];
  equipments: Item[];
  markers: Item[];
};

type Key = keyof Search;

type Input = { id: number; key: Key; title: string };

type Item = { name: string; code: number; type: number };

type Options = Record<Key, Item[]>;

type SearchDate = { initial: Date; final: Date };

type DateRange = "initial" | "final";

type Picker = { isVisible: boolean; date: DateRange };

type CountKey = "point" | "equipment" | "geogence" | "other";

type PropsCountKey = {
  icon: JSX.Element;
  title: string;
  amount: number;
  ignition: { on: number; off: number };
  permanence: { exceeded: number; obeyed: number };
  movement: number;
  speed: number;
};

type Count = Record<CountKey, PropsCountKey>;

type State = {
  search: Search;
  count: Count;
  inputs: Input[];
  options: Options;
  isOpenModal: boolean;
  picker: Picker;
  isVisible: boolean;
  events: Event[];
  isLoading: boolean;
  date: SearchDate;
  modal: {
    isOpen: boolean;
    selected: Key;
  };
};

type PickerState = {
  date: string;
};

type FetchEventParams = {
  customer: Customer | null;
  user: User | null;
  search: Search;
  date: SearchDate;
};

type SearchState = {
  [key: string]: { code: number }[];
};

type ModalState = {
  selected: string;
};

type Action =
  | { type: "PRESS_DATE"; payload: "initial" | "final" }
  | { type: "CONFIRM_DATE"; payload: Date }
  | { type: "CANCEL_DATE" }
  | { type: "CLOSE_MAIN_MODAL" }
  | { type: "OPEN_MAIN_MODAL" }
  | { type: "CLOSE_SECONDARY_MODAL" }
  | { type: "OPEN_SECONDARY_MODAL" }
  | { type: "SELECT_TYPE"; payload: Item }
  | { type: "SELECT_PERIOD"; payload: Item }
  | { type: "SET_EVENTS"; payload: Event[] }
  | { type: "UPDATE_ITEM"; payload: { key: Key; item: Item } }
  | { type: "SELECT_MODAL"; payload: Key }
  | {
      type: "SET_DATA";
      payload: {
        count: Count;
        events: Event[];
        options: { events: Item[]; markers: Item[]; equipments: Item[] };
      };
    }
  | { type: "TOGGLE_LOADING" }
  | { type: "RESET_STATE" }
  | {
      type: "SET_OPTIONS";
      payload: { events: Item[]; markers: Item[]; equipments: Item[] };
    };

export {
  ReceivedEvents,
  Event,
  State,
  Action,
  Search,
  Input,
  ObjectSearch,
  Key,
  Item,
  SearchDate,
  EventReceived,
  MarkerReceived,
  EquipmentReceived,
  PickerState,
  SearchState,
  ModalState,
  FetchEventParams,
  Picker,
  DateRange,
  Count,
  CountKey,
  PropsCountKey,
  EventListResponse,
};
