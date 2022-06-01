import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ghibli from './component/Ghibli';

export default function App() {
  return (
    <View style={styles.container}>
      <Ghibli/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "lightblue",
    height: "100%",
  },
});
