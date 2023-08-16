type EventData = {
  tipoEvento: number;
  codigoEvento: number;
  nomeEvento: string;
};

type DataTransform = {
  tipo: number;
  nome: string;
  codigo: number;
};

const transformEventsData = (eventData: EventData[]): DataTransform[] => {
  const data: DataTransform[] = [];

  for (let index = 0; index < eventData.length; index++) {
    const item = eventData[index];

    data.push({
      tipo: item.tipoEvento,
      nome: item.nomeEvento,
      codigo: item.codigoEvento,
    });
  }

  return data;
};

type MarkerData = {
  tipoMarcador: number;
  codigoMarcador: number;
  nomeMarcador: string;
};

const transformMarkersData = (markerData: MarkerData[]): DataTransform[] => {
  const data: DataTransform[] = [];

  for (let index = 0; index < markerData.length; index++) {
    const item = markerData[index];

    data.push({
      tipo: item.tipoMarcador,
      nome: item.nomeMarcador,
      codigo: item.codigoMarcador,
    });
  }

  return data;
};

type EquipmentData = {
  codigoEquipamento: number;
  nomeEquipamento: string;
};

const transformEquipmentsData = (
  equipmentData: EquipmentData[]
): DataTransform[] => {
  const data: DataTransform[] = [];

  for (let index = 0; index < equipmentData.length; index++) {
    const item = equipmentData[index];

    data.push({
      tipo: 0,
      nome: item.nomeEquipamento,
      codigo: item.codigoEquipamento,
    });
  }

  return data;
};

export { transformEventsData, transformMarkersData, transformEquipmentsData };
