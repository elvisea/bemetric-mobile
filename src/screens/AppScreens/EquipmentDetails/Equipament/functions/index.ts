import { DataReceived, Equipment, InputData, TransformedData } from "../types";

function extractEquipmentData(data: InputData): Equipment {
  return {
    client: data.nomeCliente,
    name: data.nomeEquipamento,
    type: data.tipoEquipamento,
    acquisition: data.dataAquisicaoFormatado,
    plate: data.placa,
    identifier: data.identificador,
    model: data.modelo,
    year: data.ano,
    initial: {
      hourmeter: data.horimetroIncial,
      odometer: data.hodometroIncial,
    },
  };
}

function transformData(data: DataReceived): TransformedData {
  return {
    odometer: data.hodometro,
    hourmeter: data.horimetro,
    status: data.status,
    speedometer: data.velocimetro,
    hourmeterFormatted: data.horimetroFormatado,
  };
}

export { extractEquipmentData, transformData };
