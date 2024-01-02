import { IEquipment } from "../types";

const removerEquipamentosDuplicados = (equipamentos: IEquipment[]) => {
  const uniqueEquipmentArray = Array.from(
    new Set(equipamentos.map((equipment) => equipment.codigoEquipamento)),
  ).map(
    (codigoEquipamento) =>
      equipamentos.find(
        (equipment) => equipment.codigoEquipamento === codigoEquipamento,
      )!,
  );

  return uniqueEquipmentArray;
};

export { removerEquipamentosDuplicados };
