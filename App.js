import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Ghibli from './component/Ghibli';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <Ghibli/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    backgroundColor: "lightblue",
    height: "100%",
  },
});
