type TypeForm = {
  equipmentName: string;
  equipmentIdentifier: string;
  equipmentModel: string;
  equipmentPlate: string;
  equipmentYear: string;
  deviceSerial: string;
  devicekey: string;
  initialHourMeter: string;
  acquisitionDate: string;
  initialOdometer: string;
};

type TypeGrouping = {
  codigoAgrupamento?: number;
  nomeAgrupamento: string;
  nomeCliente?: string;
  nomeParceiro?: string;
  criadoEmFormatado?: string;
};

type TypeEquipment = {
  tipoEquipamento: string;
};

type Typeparams = { chave: string; serial: string };

export { TypeForm, TypeGrouping, TypeEquipment, Typeparams };
