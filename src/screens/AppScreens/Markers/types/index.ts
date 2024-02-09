type Coord = { latitude: number; longitude: number };

type Delta = { latitudeDelta: number; longitudeDelta: number };

type Area = {
  id: string;
  code: number;
  name: string;
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

type Equipment = Area & {
  coord: Coord;
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

type EquipmentReceived = {
  nomeEquipamento: string;
  codigoEquipamento: number;
  codigoCliente: number;
  latitude: number;
  longitude: number;
};

export {
  Area,
  Coord,
  Delta,
  Point,
  Geofence,
  Equipment,
  GeofenceReceived,
  EquipmentReceived,
  PointReceived,
};
