const updateResponse: { [index: number]: string } = {
  0: "Ponto de Interesse atualizado com sucesso.",
  1: "Cliente não localizado.",
  2: "Nome do Ponto de Interesse já cadastrado.",
  3: "Falha ao tentar atualizar Ponto de Interesse.",
};

const deleteResponse: { [index: number]: string } = {
  0: "Ponto de Interesse excluído com sucesso!",
  1: "Falha ao tentar excluir Ponto de Interesse!",
};

export { updateResponse, deleteResponse };
