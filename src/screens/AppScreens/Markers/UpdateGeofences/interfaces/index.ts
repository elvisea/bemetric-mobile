interface IPontoGeocerca {
  latitude: number;
  longitude: number;
}

interface IGeofence {
  incluir: boolean;
  codigoCliente: number;
  nomeGeocerca: string;
  descricao: string;
  alertaPermanencia: boolean;
  alertaEntradaSaida: boolean;
  alertaPermanenciaTempo?: number;
  alertaVelocidade: boolean;
  alertaVelocidadeQuilometro?: number;
  listaPontosGeocerca: IPontoGeocerca[] | [];
}

interface ICoordinate {
  latitude: number;
  longitude: number;
}

interface IParams {
  codigoGeocerca: number;
}

interface IDelta {
  latitudeDelta: number;
  longitudeDelta: number;
}

export { IPontoGeocerca, IGeofence, ICoordinate, IParams, IDelta };
