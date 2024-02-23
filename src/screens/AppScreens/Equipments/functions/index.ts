import uuid from "react-native-uuid";

import {
  Count,
  CountReceived,
  Equipment,
  EquipmentReceived,
  Group,
  GroupingReceived,
} from "../types";

function normalizeEquipment(equipments: EquipmentReceived[]): Equipment[] {
  return equipments.map((equipment) => ({
    key: uuid.v4().toString(),
    code: equipment.codigoEquipamento,
    name: equipment.nomeEquipamento,
    speed: equipment.velocidade,
    online: equipment.ligado,
  }));
}

function normalizeGroupings(groupings: GroupingReceived[]): Group[] {
  if (typeof groupings === "string") return [];

  return groupings.map((group) => ({
    key: uuid.v4().toString(),
    name: group.nomeAgrupamento,
    description: group.descricao,
    equipments: normalizeEquipment(group.listaEquipamentos),
  }));
}

function normalizeCount(data: CountReceived): Count {
  return {
    events: data.contadorEvento,
    messages: data.contadorMensagem,
  };
}

export { normalizeEquipment, normalizeGroupings, normalizeCount };
