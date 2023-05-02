interface IPoint {
  codigoPontoInteresse: number;
  nomePonto: string;
  descricao: string;
  latitude: number;
  longitude: number;
}

interface IListaPontosGeocerca {
  latitude: number;
  longitude: number;
}

interface IGeofence {
  descricao: string;
  nomeGeocerca: string;
  codigoGeocerca: number;
  listaPontosGeocerca: IListaPontosGeocerca[];
}

interface IEquipment {
  nomeEquipamento: string;
  codigoEquipamento: number;
  codigoCliente: number;
  status: number;
  velocidade: number;
  lat: number;
  lon: number;
}

interface IMarker {
  points: IPoint[];
  geofences: IGeofence[];
  equipments: IEquipment[];
}

interface ISelected {
  title: string;
  type: "points" | "geofences" | "equipments";
}

export { IPoint, IGeofence, IEquipment, IMarker, ISelected };
