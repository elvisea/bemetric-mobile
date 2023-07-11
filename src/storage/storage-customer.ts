import AsyncStorage from "@react-native-async-storage/async-storage";

import { CUSTOMER } from "../constants/storage";
import { ICustomer } from "../interfaces/ICustomer";

export async function storageCustomerSave(customer: ICustomer) {
  try {
    await AsyncStorage.setItem(CUSTOMER, JSON.stringify(customer));
  } catch (error) {
    console.error("Failed to save customer from local storage.", error);
  }
}

export async function storageCustomerGet() {
  try {
    const storage = await AsyncStorage.getItem(CUSTOMER);
    const customer: ICustomer = storage ? JSON.parse(storage) : null;
    return customer;
  } catch (error) {
    console.error("Failed to fetch customer from local storage.", error);
    return;
  }
}

export async function storageCustomerRemove() {
  try {
    await AsyncStorage.removeItem(CUSTOMER);
  } catch (error) {
    console.error("Failed to remove customer from local storage.", error);
  }
}
