import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthStackRoutes from "./auth.stack.routes";

const Routes = () => {
  return (
    <NavigationContainer>
      <AuthStackRoutes />
    </NavigationContainer>
  );
};

export { Routes };
