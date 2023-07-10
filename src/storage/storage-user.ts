import AsyncStorage from "@react-native-async-storage/async-storage";

import { IUser } from "../interfaces/IUser";
import { USER } from "../constants/storage";

export async function storageUserSave(user: IUser) {
  try {
    await AsyncStorage.setItem(USER, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user from local storage.", error);
  }
}

export async function storageUserGet() {
  try {
    const storage = await AsyncStorage.getItem(USER);
    const user: IUser = storage ? JSON.parse(storage) : null;
    return user;
  } catch (error) {
    console.error("Failed to fetch user from local storage.", error);
    return;
  }
}

export async function storageUserRemove() {
  try {
    await AsyncStorage.removeItem(USER);
  } catch (error) {
    console.error("Failed to remove user from local storage.", error);
  }
}
