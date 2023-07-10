interface ILocation {
  latitude: number;
  longitude: number;
}

interface IPointsInterest {
  incluir: true;
  codigoCliente: number;
  nomePonto: string;
  descricao: string;
  raio: number;
  latitude: number | null;
  longitude: number | null;
  alertaEntradaSaida: boolean;
  alertaPermanencia: boolean;
  alertaPermanenciaTempo?: number;
}

export { ILocation, IPointsInterest };
