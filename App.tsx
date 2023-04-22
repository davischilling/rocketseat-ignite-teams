import { Loading } from "@components/Loading";
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from "@expo-google-fonts/roboto";
import { Groups } from "@screens/Groups";
import { NewGroup } from "@screens/NewGroup";
import { Players } from "@screens/Players";
import theme from "@theme/index";
import { View, StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";

export default function App() {
  const [loadFont] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        {!loadFont ? <Loading /> : <Players />}
      </View>
    </ThemeProvider>
  );
}
