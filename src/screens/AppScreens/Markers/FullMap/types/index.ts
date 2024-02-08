import { Region } from "react-native-maps";

type Coord = { latitude: number; longitude: number };

type Area = {
  id: string;
  code: number;
  name: string;
};

type PointReceived = {
  codigoPontoInteresse: number;
  nomePonto: string;
  descricao: string;
  latitude: number;
  longitude: number;
  raio: number;
};

type GeofenceReceived = {
  descricao: string;
  nomeGeocerca: string;
  codigoGeocerca: number;
  listaPontosGeocerca: Coord[];
};

type Geofence = Area & {
  description: string;
  coords: Coord[];
};

type Point = Area & {
  radius: number;
  description: string;
  coord: Coord;
};

type EquipmentReceived = {
  nomeEquipamento: string;
  codigoEquipamento: number;
  codigoCliente: number;
  latitude: number;
  longitude: number;
};

type Equipment = Area & {
  coord: Coord;
};

type Key = "points" | "geofences" | "equipment";

type Modal = {
  title: string;
  key: Key;
};

type Markers = {
  points: Point[];
  geofences: Geofence[];
  equipment: Equipment[];
};

type State = {
  markers: Markers;

  filters: Markers;

  modal: Modal;

  isLoading: boolean;
  isOpenModal: boolean;

  initialRegion: Region | undefined;
};

type Button = { icon: JSX.Element; key: Key; title: string };

type Action =
  | { type: "SET_MARKERS"; payload: Markers }
  | { type: "SET_FILTERS"; payload: Markers }
  | { type: "ADD_FILTER"; payload: Point | Geofence | Equipment }
  | { type: "REMOVE_FILTER"; payload: string }
  | { type: "SET_MODAL"; payload: Modal }
  | { type: "SET_INITIAL_REGION"; payload: Markers }
  | { type: "TOGGLE_MODAL" }
  | { type: "TOGGLE_LOADING" };

export {
  PointReceived,
  Point,
  GeofenceReceived,
  Geofence,
  Coord,
  EquipmentReceived,
  Equipment,
  Modal,
  Key,
  State,
  Action,
  Button,
};
