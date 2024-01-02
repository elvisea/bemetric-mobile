import { Buffer } from "buffer";

const REGEX = /[\u0000-\u001F]/g;

const limparStrings = (strings: string[]) => {
  return strings.map((item) => item.replace(REGEX, ""));
};

const arraySemItensDuplicados = (array: string[]): string[] => {
  return Array.from(new Set(array));
};

const processReceivedValues = (values: string[]): object => {
  if (values.length === 0) {
    return {};
  }

  const stringsDecodificadas = values.map((value) =>
    Buffer.from(value, "base64").toString("utf8"),
  );

  const arrayComItensUnicos = arraySemItensDuplicados(stringsDecodificadas);

  const stringsLimpas = limparStrings(arrayComItensUnicos);

  try {
    const isValidJSON = JSON.parse(stringsLimpas.join(""));
    return isValidJSON;
  } catch (error) {
    return {};
  }
};

export { processReceivedValues };
