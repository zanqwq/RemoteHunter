import { useGlobalContext } from "@/hooks/useGlobalContext";
import { Redirect, Stack, router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import { } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  const { ctx } = useGlobalContext();
  // return <Redirect href={ctx.isLogIn ? 'seek_job' : 'sign_in'} />
  return <Redirect href={'sign_in'} />
};

export default App;