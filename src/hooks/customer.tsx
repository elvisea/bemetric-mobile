import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CUSTOMER } from "@constants/storage";
import { Customer } from "@interfaces/Customer";

type CustomerContextData = {
  customer: Customer | null;
  addCustomer: (customer: Customer) => Promise<void>;
  resetCustomerState: () => void;
};

type CustomerProviderProps = {
  children: ReactNode;
};

export const CustomerContext = createContext({} as CustomerContextData);

const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  const addCustomer = async (customer: Customer) => {
    setCustomer(customer);
    await AsyncStorage.setItem(CUSTOMER, JSON.stringify(customer));
  };

  const resetCustomerState = () => setCustomer(null);

  const loadCustomerStorage = async () => {
    const storage = await AsyncStorage.getItem(CUSTOMER);
    if (storage) {
      const data = (await JSON.parse(storage)) as Customer;
      setCustomer(data);
    }
  };

  useEffect(() => {
    loadCustomerStorage();
  }, []);

  return (
    <CustomerContext.Provider
      value={{
        customer,
        addCustomer,
        resetCustomerState,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

function useCustomer() {
  const context = useContext(CustomerContext);

  return context;
}

export { CustomerProvider, useCustomer };
