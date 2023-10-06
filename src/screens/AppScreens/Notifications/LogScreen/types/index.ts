type IEvento = {
  angulo: number;
  codigoCliente: number;
  codigoDispositivo: number;
  codigoEquipamento: number;
  codigoEvento: number;
  codigoParceiro: number;
  codigoUsuario: number;
  criadoEmFormatado: string;
  eventoLido: false;
  latitude: number;
  listaEquipamentos: number[];

  listaEventos: number[];

  listaMarcadores: number[];

  localDashboard: number;
  longitude: number;
  latitudeFormatada: string;
  longitudeFormatada: string;
  mensagemHtml: string;
  periodoAte: string;
  periodoDe: string;
  tipoEvento: number;
  tipoIntervalo: number;
};

export { IEvento };
