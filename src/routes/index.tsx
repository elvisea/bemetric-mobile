import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStackRoutes from "./auth.stack.routes";
import AppDrawerRoutes from "./app.drawer.routes";
import ClientsStackRoutes from "./clients.stack.routes";

import { useAuth } from "@hooks/auth";
import { useCustomer } from "@hooks/customer";

const Routes = () => {
  const { user } = useAuth();
  const { customer } = useCustomer();

  const switchNavigation = () => {
    if (!user) {
      return <AuthStackRoutes />;
    }

    if (user && !customer) {
      return <ClientsStackRoutes />;
    }

    if (user && customer) {
      return <AppDrawerRoutes />;
    }
  };

  return <NavigationContainer>{switchNavigation()}</NavigationContainer>;
};

export { Routes };
