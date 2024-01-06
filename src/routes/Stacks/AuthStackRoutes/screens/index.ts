import uuid from "react-native-uuid";

import { SignInScreen } from "@screens/AuthScreens/SignInScreen";
import { NameAndEmailScreen } from "@screens/AuthScreens/NameAndEmailScreen";
import { AcceptTermsScreen } from "@screens/AuthScreens/AcceptTermsScreen";
import { ChooseScreen } from "@screens/AuthScreens/ChooseScreen";
import { CreateAccountScreen } from "@screens/AuthScreens/CreateAccountScreen";
import { CreatePasswordScreen } from "@screens/AuthScreens/CreatePasswordScreen";
import { VerifyTokenScreen } from "@screens/AuthScreens/VerifyTokenScreen";
import { ClientCodeScreen } from "@screens/AuthScreens/ClientCodeScreen";
import { TemporaryPasswordScreen } from "@screens/AuthScreens/TemporaryPasswordScreen";
import { SendEmailScreen } from "@screens/AuthScreens/RedefinePassword/SendEmailScreen";
import { ValidateCodeScreen } from "@screens/AuthScreens/RedefinePassword/ValidateCodeScreen";
import { EnterNewPasswordScreen } from "@screens/AuthScreens/RedefinePassword/EnterNewPasswordScreen";

const screens = [
  {
    key: uuid.v4().toString(),
    name: "SignInScreen",
    component: SignInScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "NameAndEmailScreen",
    component: NameAndEmailScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "AcceptTermsScreen",
    component: AcceptTermsScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "ChooseScreen",
    component: ChooseScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "CreateAccountScreen",
    component: CreateAccountScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "CreatePasswordScreen",
    component: CreatePasswordScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "VerifyTokenScreen",
    component: VerifyTokenScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "ClientCodeScreen",
    component: ClientCodeScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "TemporaryPasswordScreen",
    component: TemporaryPasswordScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "SendEmailScreen",
    component: SendEmailScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "ValidateCodeScreen",
    component: ValidateCodeScreen,
  },
  {
    key: uuid.v4().toString(),
    name: "EnterNewPasswordScreen",
    component: EnterNewPasswordScreen,
  },
];

export { screens };
