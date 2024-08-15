import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { query } = useLocalSearchParams();
  const q = JSON.parse(query as string);
  return (
    <SafeAreaView>
      <Text>{JSON.stringify(q)}</Text>
    </SafeAreaView>
  )
};

export default Search;