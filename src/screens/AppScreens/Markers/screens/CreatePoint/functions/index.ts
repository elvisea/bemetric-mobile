import { Point, PointForSubmission } from "../types";

const transformPointForSubmission = (
  point: Point,
  client: number,
): PointForSubmission => {
  const data: PointForSubmission = {
    incluir: point.include,
    codigoCliente: client,
    nomePonto: point.name,
    descricao: point.description,
    raio: point.radius,
    latitude: point.coord.latitude,
    longitude: point.coord.longitude,
    alertaEntradaSaida: point.alert,
    alertaPermanencia: point.permanence,
    alertaPermanenciaTempo: point.duration,
  };

  !data.alertaPermanencia && delete data.alertaPermanenciaTempo;

  return data;
};

export { transformPointForSubmission };
