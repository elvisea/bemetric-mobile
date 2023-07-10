import { Buffer } from "buffer";

const extractValidJson = (jsonString: string) => {
  const jsonRegex = /\{[\s\S]*\}/;
  const validJsonMatch = jsonString.match(jsonRegex);
  if (validJsonMatch) {
    return validJsonMatch[0];
  }
  return null;
};

const isValidJson = (jsonString: string) => {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};

export const processResponses = (
  data: string | null | undefined
): object | undefined => {
  if (data) {
    const response = Buffer.from(data, "base64").toString("utf8");

    const validJson = extractValidJson(response);

    const value = validJson
      ? validJson.replace(/[^{}[\]:,"0-9a-zA-Z]+/g, "")
      : "";

    const isValidJSON = isValidJson(value);

    try {
      if (isValidJSON) {
        const parsedResponse = JSON.parse(value);
        return parsedResponse;
      } else {
        console.log("Ainda não é um JSON válido: ", value);
      }
    } catch (error) {
      console.log("Não é um JSON válido. Error parsing JSON.", error);
    }
  }

  return undefined;
};
