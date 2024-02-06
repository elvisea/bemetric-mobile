import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import HomeStackRoutes from "@routes/home.stack.routes";
import { ChangeClient } from "@screens/AppScreens/ChangeClient";
import { SupportService } from "@screens/AppScreens/SupportService";
import AccountDetailsStackRoutes from "@routes/Stacks/AccountDetailsStackRoutes";

import { THEME } from "@theme/theme";

const itemsDrawer = [
  {
    title: "Início",
    name: "HomeTabRoutes",
    component: HomeStackRoutes,
    icon: <FontAwesome name="home" size={18} color={THEME.colors.white} />,
  },
  {
    icon: <FontAwesome name="user" size={18} color={THEME.colors.white} />,
    title: "Detalhes da Conta",
    name: "AccountDetailsStackRoutes",
    component: AccountDetailsStackRoutes,
  },
  {
    icon: <FontAwesome name="users" size={18} color={THEME.colors.white} />,
    title: "Alterar Cliente",
    name: "ChangeClient",
    component: ChangeClient,
  },
  {
    icon: <MaterialIcons name="email" size={18} color={THEME.colors.white} />,
    title: "Atendimento de Suporte",
    name: "SupportService",
    component: SupportService,
  },
];

export { itemsDrawer };
