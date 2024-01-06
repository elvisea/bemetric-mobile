import uuid from "react-native-uuid";

import { AccountDetailsScreen } from "@screens/AppScreens/AccountDetailsScreen";
import { ChangePasswordScreen } from "@screens/AppScreens/ChangePasswordScreen";

const screens = [
  {
    key: uuid.v4().toString(),
    name: "AccountDetailsScreen",
    component: AccountDetailsScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "ChangePasswordScreen",
    component: ChangePasswordScreen,
  },
];

export { screens };
