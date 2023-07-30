import { Buffer } from "buffer";

const sanitizeStringsForJSON = (arrayOfStrings: string[]): string[] => {
  const sanitizedStrings: string[] = [];
  const regex = /[\u0000-\u001F\u007F-\u009F]/g;

  for (const str of arrayOfStrings) {
    const sanitizedStr = str
      .replace(/[^\x20-\x7E]/g, "")
      .replace(/\t/g, "")
      .replace(regex, "");
    sanitizedStrings.push(sanitizedStr);
  }

  return sanitizedStrings;
};

const sanitizeStringForJSON = (inputString: string): string => {
  const regex = /[\u0000-\u001F\u007F-\u009F]/g;
  const novaString = inputString.replace(regex, "");

  // Verificar se a string está bem formatada para um JSON válido
  const firstBracketIndex = novaString.indexOf("{");
  const lastBracketIndex = novaString.lastIndexOf("}");
  if (firstBracketIndex >= 0 && lastBracketIndex > firstBracketIndex) {
    return novaString.substring(firstBracketIndex, lastBracketIndex + 1);
  }

  return "";
};

const extractValidJson = (jsonString: string) => {
  const jsonRegex = /\{[\s\S]*\}/;
  const validJsonMatch = jsonString.match(jsonRegex);
  if (validJsonMatch) {
    return validJsonMatch[0];
  }
  return null;
};

const removeCharactersOutsideBraces = (inputString: string): string => {
  const startIndex = inputString.indexOf("{");
  const endIndex = inputString.lastIndexOf("}");

  if (startIndex === -1 || endIndex === -1 || startIndex >= endIndex) {
    throw new Error("Invalid inputString. No opening or closing brace found.");
  }

  const sanitizedString = inputString.slice(startIndex, endIndex + 1);
  return sanitizedString;
};

const processReturnValues = (values: string[]): object | null | undefined => {
  const arrayDecoded = values.map((value) =>
    Buffer.from(value, "base64").toString("utf8")
  );

  const clearString = sanitizeStringsForJSON(arrayDecoded);

  const validString = extractValidJson(clearString.join(""));

  const sanitizedString = validString && sanitizeStringForJSON(validString);

  const ultimaLimpeza =
    sanitizedString && removeCharactersOutsideBraces(sanitizedString);

  console.log("Ultimo Passo =>", ultimaLimpeza);

  if (validString) {
    try {
      const objetoBonito: object = ultimaLimpeza && JSON.parse(ultimaLimpeza);
      console.log(objetoBonito);
      return objetoBonito;
    } catch (error) {
      console.log("😩", error);
    }
  }

  return;
};

export { processReturnValues };
