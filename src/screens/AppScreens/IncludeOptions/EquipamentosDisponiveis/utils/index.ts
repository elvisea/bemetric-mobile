import uuid from "react-native-uuid";

import { TypeEquipment } from "../types";

const adicionarChaveParaCadaEquipamento = (equipamentos: TypeEquipment[]) => {
  const equipamentosComChave = equipamentos.map((equipamento) => ({
    ...equipamento,
    key: uuid.v4().toString(),
  }));

  return equipamentosComChave;
};

export { adicionarChaveParaCadaEquipamento };
