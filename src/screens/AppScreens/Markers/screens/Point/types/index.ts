interface IPointsInterest {
  incluir: boolean;
  codigoCliente: number;
  nomePonto: string;
  descricao: string;
  raio: number;
  latitude: number;
  longitude: number;
  alertaEntradaSaida: boolean;
  alertaPermanencia: boolean;
  alertaPermanenciaTempo?: number;
}

export { IPointsInterest };
