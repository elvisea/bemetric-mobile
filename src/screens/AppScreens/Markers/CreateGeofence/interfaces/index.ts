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

export { IGeofence, IPontoGeocerca };
