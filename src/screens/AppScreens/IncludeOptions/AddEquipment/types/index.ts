type ITypeForm = {
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

type IGrouping = {
  codigoAgrupamento?: number;
  nomeAgrupamento: string;
  nomeCliente?: string;
  nomeParceiro?: string;
  criadoEmFormatado?: string;
};

type ITypesEquipment = {
  tipoEquipamento: string;
};

export { ITypeForm, IGrouping, ITypesEquipment };
