import uuid from "react-native-uuid";
import { Region } from "react-native-maps";

import {
  Coord,
  EquipmentReceived,
  GeofenceReceived,
  Equipment,
  Geofence,
  Point,
  PointReceived,
} from "../types";

import { calculateDelta, calculateInitialRegion } from "../../utils";

const normalizePoints = (points: PointReceived[]): Point[] => {
  if (typeof points === "string") return [];

  return points.map((point) => ({
    id: uuid.v4().toString(),
    name: point.nomePonto,
    code: point.codigoPontoInteresse,
    description: point.descricao,
    coord: { latitude: point.latitude, longitude: point.longitude },
    radius: point.raio,
  }));
};

const normalizeCoords = (coords: Coord[]): Coord[] => {
  return coords.map((coord) => ({
    latitude: coord.latitude,
    longitude: coord.longitude,
  }));
};

const normalizeGeofences = (geofences: GeofenceReceived[]): Geofence[] => {
  if (typeof geofences === "string") return [];

  return geofences.map((geofence) => ({
    id: uuid.v4().toString(),
    name: geofence.nomeGeocerca,
    code: geofence.codigoGeocerca,
    description: geofence.descricao,
    coords: normalizeCoords(geofence.listaPontosGeocerca),
  }));
};

const normalizeEquipments = (equipments: EquipmentReceived[]): Equipment[] => {
  if (typeof equipments === "string") return [];

  return equipments.map((equipment) => ({
    id: uuid.v4().toString(),
    name: equipment.nomeEquipamento,
    code: equipment.codigoEquipamento,
    coord: { latitude: equipment.latitude, longitude: equipment.longitude },
  }));
};

const generateListCoordinates = (
  points: Point[],
  geofences: Geofence[],
  equipment: Equipment[],
): Coord[] => {
  const coordsPoints = points.map(({ coord: { latitude, longitude } }) => ({
    latitude,
    longitude,
  }));

  const coordsEquipment = equipment.map(
    ({ coord: { latitude, longitude } }) => ({
      latitude,
      longitude,
    }),
  );

  const coordsGeofences = geofences.flatMap(({ coords }) =>
    coords.map(({ latitude, longitude }) => ({
      latitude,
      longitude,
    })),
  );

  return [...coordsPoints, ...coordsEquipment, ...coordsGeofences];
};

const setInitialRegion = (
  points: Point[],
  geofences: Geofence[],
  equipment: Equipment[],
): Region | undefined => {
  const coords = generateListCoordinates(points, geofences, equipment);

  if (coords.length === 0) return undefined;

  return {
    latitude: calculateInitialRegion(coords).latitude,
    longitude: calculateInitialRegion(coords).longitude,
    latitudeDelta: calculateDelta(coords).latitudeDelta,
    longitudeDelta: calculateDelta(coords).longitudeDelta,
  };
};

export {
  normalizePoints,
  normalizeGeofences,
  normalizeEquipments,
  generateListCoordinates,
  setInitialRegion,
};
