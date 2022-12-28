import { IEquipment } from "./IEquipment";

export interface IGrouping {
  incluir: boolean;
  codigoAgrupamento: number;
  nomeAgrupamento: string;
  descricao: string;
  listaEquipamentos: IEquipment[];
}
