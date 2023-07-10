import AsyncStorage from "@react-native-async-storage/async-storage";

import { TOKEN } from "../constants/storage";

export async function storageTokenSave(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN, token);
  } catch (error) {
    console.error("Failed to save token from local storage.", error);
  }
}

export async function storageTokenGet() {
  try {
    const token = await AsyncStorage.getItem(TOKEN);
    return token;
  } catch (error) {
    console.error("Failed to fetch token from local storage.", error);
    return;
  }
}

export async function storageTokenRemove() {
  try {
    await AsyncStorage.removeItem(TOKEN);
  } catch (error) {
    console.error("Failed to remove token from local storage.", error);
  }
}
