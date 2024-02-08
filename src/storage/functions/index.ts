import AsyncStorage from "@react-native-async-storage/async-storage";

import { Customer, User } from "@typings/index";

import { CUSTOMER, TOKEN, USER } from "@storage/constants";

export async function storageUserSave(user: User) {
  try {
    await AsyncStorage.setItem(USER, JSON.stringify(user));
  } catch (error) {
    console.error("Failed to save user from local storage.", error);
  }
}

export async function storageUserGet() {
  try {
    const storage = await AsyncStorage.getItem(USER);
    const user: User = storage ? JSON.parse(storage) : null;
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

export async function storageCustomerSave(customer: Customer) {
  try {
    await AsyncStorage.setItem(CUSTOMER, JSON.stringify(customer));
  } catch (error) {
    console.error("Failed to save customer from local storage.", error);
  }
}

export async function storageCustomerGet() {
  try {
    const storage = await AsyncStorage.getItem(CUSTOMER);
    const customer: Customer = storage ? JSON.parse(storage) : null;
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
