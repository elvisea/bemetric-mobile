import { IEquipment } from "./IEquipment";

export interface IGrouping {
  incluir: boolean;
  codigoAgrupamento: number;
  nomeAgrupamento: string;
  listaEquipamentos: IEquipment[];
}
