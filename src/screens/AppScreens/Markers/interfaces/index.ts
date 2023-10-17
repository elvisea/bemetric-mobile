interface IPoint {
  codigoPontoInteresse: number;
  nomePonto: string;
  descricao: string;
  latitude: number;
  longitude: number;
  raio: number;
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
  latitude: number;
  longitude: number;
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

interface IInicialRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export { IPoint, IGeofence, IEquipment, IMarker, ISelected, IInicialRegion };
