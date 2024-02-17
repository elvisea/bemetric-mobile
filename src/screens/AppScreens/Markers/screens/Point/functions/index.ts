import { NormalizedPoint, PointReceived } from "../types";

const normalizeReceivedPoint = (data: PointReceived): NormalizedPoint => {
  return {
    name: data.nomePonto,
    client: data.codigoCliente,
    description: data.descricao,
    radius: data.raio,
    coord: { latitude: data.latitude, longitude: data.longitude },
    alert: data.alertaEntradaSaida,
    permanence: data.alertaPermanencia,
    duration: data.alertaPermanenciaTempo,
    code: data.codigoPontoInteresse,
    partner: data.codigoParceiro,
  };
};

const transformDataSend = (point: NormalizedPoint): PointReceived => {
  const data: PointReceived = {
    alertaEntradaSaida: point.alert,
    alertaPermanencia: point.permanence,
    alertaPermanenciaTempo: point.duration,
    codigoCliente: point.client,
    codigoParceiro: point.partner,
    codigoPontoInteresse: point.code,
    descricao: point.description,
    latitude: point.coord.latitude,
    longitude: point.coord.longitude,
    nomePonto: point.name,
    raio: point.radius,
  };

  !data.alertaPermanencia && delete data.alertaPermanenciaTempo;

  return data;
};

export { normalizeReceivedPoint, transformDataSend };
