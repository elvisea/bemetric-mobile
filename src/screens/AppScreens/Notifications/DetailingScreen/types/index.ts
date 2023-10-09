type Data = {
  atividade: number;
  criadoEmFormatado: string;
  hodometro: number;
  horimetro: string;
  identificador: string;
  jsonCoordenads: string;
  latitude: number;
  latitudeFormatada: string;
  longitude: number;
  longitudeFormatada: string;
  mensagemHtml: string;
  nomeCliente: string;
  nomeEquipamento: string;
  raioPI: number;
  tipoCoordenadas: number;
  velocidade: number;
  registroApp: string;
  marcadorApp: string;
  geoFence: [{ latitude: number; longitude: number }];
  pointFence: { latitude: number; longitude: number; raio: number };
  horimetroFormatado: string;
};

type IParams = {
  codigoEvento: number;
  codigoEquipamento: number;
  codigoDispositivo: number;
};

export { Data, IParams };
