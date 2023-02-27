import AsyncStorage from "@react-native-async-storage/async-storage";

import { WHATSAPP } from "../constants";

export async function storageWhatsAppSave(whatsapp: string) {
  try {
    await AsyncStorage.setItem(WHATSAPP, JSON.stringify(whatsapp));
  } catch (error) {
    console.log("Falha ao Salvar WhatsApp!", error);
  }
}

export async function storageWhatsAppGet() {
  try {
    const whatsapp = await AsyncStorage.getItem(WHATSAPP);
    return whatsapp;
  } catch (error) {
    console.log("Falha ao Buscar WhatsApp!", error);
    return;
  }
}

export async function storageWhatsAppRemove() {
  try {
    await AsyncStorage.removeItem(WHATSAPP);
  } catch (error) {
    console.log("Falha ao Remover WhatsApp!", error);
  }
}
