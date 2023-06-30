import { Buffer } from "buffer";

function extractValidJson(jsonString: string) {
  // Encontra a posição da primeira chave abrindo '{'
  const startIndex = jsonString.indexOf("{");
  // Encontra a posição da última chave fechando '}'
  const endIndex = jsonString.lastIndexOf("}");

  // Extrai o JSON válido entre as posições encontradas
  const validJson = jsonString.slice(startIndex, endIndex + 1);

  return validJson;
}

function isValidJson(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

export const processResponses = (data: string): object | undefined => {
  let response = Buffer.from(
    data,
    "base64"
  ).toString("utf8");

  console.log("Response => =", response);


  const jsonValido = extractValidJson(response);

  console.log("jsonValido=>", jsonValido);


  // const limpo = responses.join("").replace(/\n/g, "").replace(/\t/g, "").replace(/[^a-zA-Z0-9\-_{}:\".,[\]\s]/g, "").replace(/[^\x20-\x7E]/g, '')
  // responses.map(item => item.replace(/\n/g, "").replace(/\t/g, ""))

  // console.log("LIMPO", limpo);

  const value = jsonValido
    .replace(/^M\W/, "")
    .replace(/[^{}[\]:,"0-9a-zA-Z]+/g, "");

  console.log("Value", value);

  const isValidJSON = isValidJson(value);

  console.log("isValidJSON:", isValidJSON);

  // if (isValidJSON) {
  //   const parsedResponse = JSON.parse(value);
  //   setMonitoringResponse(parsedResponse);
  // } else {
  //   console.log("Ainda não é um JSON válido: ", value)
  // }

  // Combinar as respostas em um JSON válido e realizar o processamento final
  // const combinedResponse = limpo
  //   .join("")
  //   .replace(/[\n\t�]/g, "") // Remover quebras de linha, tabs e caracteres inválidos
  //   .replace(/\s*\"(\w+)\"\s*:\s*/g, '"$1": ') // Remover espaços antes e depois dos nomes das chaves
  //   .replace(/\s*:\s*\"(\w+)\"/g, ': "$1"') // Remover espaços antes e depois dos valores das chaves
  //   .replace(/([^\"])(\s*[,{}[\]])/g, "$1$2 ") // Adicionar um espaço após as vírgulas, colchetes e chaves
  //   .replace(/\"WIFI_AP_AUTH\":\s*\"\s*(\d+)\s*\"/g, '"WIFI_AP_AUTH": $1'); // Remover as aspas em torno dos valores numéricos das chaves

  try {
    const parsedResponse = JSON.parse(value);
    return parsedResponse;
  } catch (error) {
    console.log("Não é um JSON válido. Error parsing JSON.", error);
  }
  // if (responses.length > 2) {
  // }
};