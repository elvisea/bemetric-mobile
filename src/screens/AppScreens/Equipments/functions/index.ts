import uuid from "react-native-uuid";

import {
  Count,
  CountReceived,
  Equipment,
  EquipmentReceived,
  Group,
  GroupingReceived,
} from "../types";

function transformEquipmentData(equipments: EquipmentReceived[]): Equipment[] {
  return equipments.map((equipment) => ({
    key: uuid.v4().toString(),
    code: equipment.codigoEquipamento,
    name: equipment.nomeEquipamento,
    speed: equipment.velocidade,
    online: equipment.ligado,
  }));
}

function transformGroupingData(groupings: GroupingReceived[]): Group[] {
  return groupings.map((group) => ({
    key: uuid.v4().toString(),
    name: group.nomeAgrupamento,
    description: group.descricao,
    equipments: transformEquipmentData(group.listaEquipamentos),
  }));
}

function transformCountData(data: CountReceived): Count {
  return {
    events: data.contadorEvento,
    messages: data.contadorMensagem,
  };
}

export { transformEquipmentData, transformGroupingData, transformCountData };
