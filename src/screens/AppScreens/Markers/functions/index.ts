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
  Delta,
} from "../types";

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

const checkSize = (arrays: Array<any[]>): boolean => {
  return arrays.every((arr) => arr.length === 0);
};

const calculateDelta = (coords: Coord[]): Delta => {
  const margemAjuste = 1;
  const minLatitude = Math.min(...coords.map((coord) => coord.latitude));
  const maxLatitude = Math.max(...coords.map((coord) => coord.latitude));
  const minLongitude = Math.min(...coords.map((coord) => coord.longitude));
  const maxLongitude = Math.max(...coords.map((coord) => coord.longitude));

  const amplitudeLatitude = maxLatitude - minLatitude;
  const amplitudeLongitude = maxLongitude - minLongitude;

  const margemLatitude = margemAjuste * amplitudeLatitude;
  const margemLongitude = margemAjuste * amplitudeLongitude;

  const latitudeDelta = amplitudeLatitude + margemLatitude;
  const longitudeDelta = amplitudeLongitude + margemLongitude;

  return { latitudeDelta, longitudeDelta };
};

const calculateInitialRegion = (coords: Coord[]) => {
  const numCoordenadas = coords.length;

  let somaLatitudes = 0;
  let somaLongitudes = 0;

  coords.forEach((coord) => {
    somaLatitudes += coord.latitude;
    somaLongitudes += coord.longitude;
  });

  const mediaLatitude = somaLatitudes / numCoordenadas;
  const mediaLongitude = somaLongitudes / numCoordenadas;

  const pontoCentral = {
    latitude: mediaLatitude,
    longitude: mediaLongitude,
  };

  return pontoCentral;
};

const getDeltaFromRadius = (center: Coord, radius: number): Coord => {
  const earthCircumference = 40075016.686;

  const latDelta = (radius / earthCircumference) * 360;

  const lonDelta =
    (radius /
      (Math.cos((center.latitude * Math.PI) / 180) * earthCircumference)) *
    360;

  return { latitude: latDelta * 5, longitude: lonDelta * 5 };
};

export {
  checkSize,
  calculateDelta,
  normalizePoints,
  setInitialRegion,
  normalizeGeofences,
  getDeltaFromRadius,
  normalizeEquipments,
  generateListCoordinates,
  calculateInitialRegion,
};
