import { StyleSheet, Text, View } from "react-native";
import Home from "./components/Home";

export default function App() {
  console.log(53498);
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", backgroundColor: "blue" },
});
