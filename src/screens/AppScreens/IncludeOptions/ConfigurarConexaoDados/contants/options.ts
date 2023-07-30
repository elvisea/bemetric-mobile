type TypeScreen = "ListaRedes" | "ConexaoRedesMoveis" | "ConexaoManual";

type Option = {
  mt: number;
  title: string;
  screen: TypeScreen;
};

const options: Option[] = [
  {
    mt: 16,
    title: "Conexão WIFI",
    screen: "ListaRedes",
  },
  {
    mt: 8,
    title: "Conexão Redes Móveis",
    screen: "ConexaoRedesMoveis",
  },
  {
    mt: 8,
    title: "Conexão Manual",
    screen: "ConexaoManual",
  },
];

export { options };
