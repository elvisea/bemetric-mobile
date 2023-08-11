import WebView from "react-native-webview";
import { TouchableOpacity, View } from "react-native";
import { Ionicons, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import { THEME } from "@theme/theme";
import { Date, ViewBox, FlexView, StackView } from "../styles";

interface ICustomBox {
  Icon: "bell" | "flag";
  Html: string;
  date: string;
  func: () => void;
}

export default function CustomBoxDetail({
  Icon,
  Html,
  date,
  func,
}: ICustomBox) {

  const icones = {
    bell: <MaterialCommunityIcons name="bell-ring" color={THEME.colors.yellow[100]} size={20} />,
    flag: <Ionicons name="flag" size={20} color={THEME.colors.blue[700]} />,
  };

  return (
    <ViewBox>
      <FlexView>
        <StackView>
          {icones[Icon]}
          <Date>{date}</Date>
        </StackView>
        <TouchableOpacity
          onPress={func}
          style={{ width: 30, alignItems: "flex-end" }}
        >
          <Entypo
            name="magnifying-glass"
            size={20}
            color={THEME.colors.blue[700]}
          />
        </TouchableOpacity>
      </FlexView>
      <View style={{ flex: 1, width: "100%", height: "100%" }}>
        <WebView
          style={{ flex: 1, width: "100%", height: "100%" }}
          originWhitelist={["*"]}
          scalesPageToFit={false}
          showsVerticalScrollIndicator={false}
          source={{ html: Html }}
        />
      </View>
    </ViewBox>
  );
}
