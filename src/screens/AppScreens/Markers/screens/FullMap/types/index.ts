import { Region } from "react-native-maps";

import { Equipment, Geofence, Point } from "../../../types";

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

export { Modal, Key, State, Action, Button };
