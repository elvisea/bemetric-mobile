import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Equipament from '@screens/AppScreens/Equipament/Equipament';
import TelemetryData from '@screens/AppScreens/Equipament/TelemetryData';
import PeriodOfStay from '@screens/AppScreens/Equipament/PeriodOfStay';
import Track from '@screens/AppScreens/Equipament/Track';
import TelemetryDevice from '@screens/AppScreens/Equipament/TelemetryDevice';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export default function EquipamentsTopTabRoutes() {
  return (
    <Navigator initialRouteName='Equipament'>
      <Screen name="Equipament" component={Equipament} />
      <Screen name="TelemetryDevice" component={TelemetryDevice} />
      <Screen name="PeriodOfStay" component={PeriodOfStay} />
      <Screen name="Track" component={Track} />
      <Screen name="TelemetryData" component={TelemetryData} />
    </Navigator>
  );
}