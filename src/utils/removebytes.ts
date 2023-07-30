import { Buffer } from "buffer";

const removeBytes = (base64String: string) => {
  console.log("############### REMOVE BYTES ###############");

  const mensagem = Buffer.from(base64String, "base64");

  // Verifica se o segundo byte é igual a 0x04
  if (mensagem[1] === 0x04) {
    console.log("1° IF...");

    const novaMensagem = Buffer.allocUnsafe(mensagem.length - 4);
    mensagem.copy(novaMensagem, 0, 4, mensagem.length);
    // mensagem.copy(novaMensagem, 2, 6);
    console.log("novaMensagem => ", novaMensagem);
    return novaMensagem.toString("base64");
  }
  // Verifica se o segundo byte é igual a 0x14
  else if (mensagem[1] === 0x14) {
    console.log("2° IF...");
    // Remove os próximos 6 bytes (índices 2 a 7) usando o método copy()
    const novaMensagem = Buffer.allocUnsafe(mensagem.length - 6);
    mensagem.copy(novaMensagem, 0, 6, mensagem.length);
    // mensagem.copy(novaMensagem, 2, 8);
    console.log("novaMensagem => ", novaMensagem);

    return novaMensagem.toString("base64");
  } else {
    console.log("ELSE...");
    console.log(
      "O segundo byte não é igual a 0x04 nem 0x14. Retornando a mensagem original."
    );
    return base64String; // Retorna a mensagem original, pois nenhuma modificação foi feita.
  }
};

export { removeBytes };
