import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStackRoutes from "./Stacks/AuthStackRoutes";

import AppDrawerRoutes from "./app.drawer.routes";
import ClientsStackRoutes from "./clients.stack.routes";

import { useAuth } from "@hooks/authentication";
import { useCustomer } from "@hooks/customer";

const Routes = () => {
  const { isAuthenticated } = useAuth();
  const { customer } = useCustomer();

  const switchNavigation = () => {
    if (!isAuthenticated) {
      return <AuthStackRoutes />;
    }

    if (isAuthenticated && !customer) {
      return <ClientsStackRoutes />;
    }

    if (isAuthenticated && customer) {
      return <AppDrawerRoutes />;
    }
  };

  return <NavigationContainer>{switchNavigation()}</NavigationContainer>;
};

export { Routes };
