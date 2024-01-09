import uuid from "react-native-uuid";

import { ListaEquipamento, TypeGrouping } from "../types";

const adicionarChaveParaCadaAgrupamento = (list: TypeGrouping[]) => {
  const agrupamentos = list.map((item) => ({
    key: uuid.v4().toString(),
    nome: item.nomeAgrupamento,
    novo: false,
    codigo: item.codigoAgrupamento,
  }));
  return agrupamentos;
};

const adicionarChaveParaCadaEquipamento = (list: ListaEquipamento[]) => {
  const equipamentos = list.map((item) => ({
    key: uuid.v4().toString(),
    tipo: item.tipoEquipamento,
  }));
  return equipamentos;
};

export { adicionarChaveParaCadaAgrupamento, adicionarChaveParaCadaEquipamento };
