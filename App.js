import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Welcome from './src/components/screens/Welcome';
import Login from './src/components/screens/Login';
import SignUp from './src/components/screens/SignUp';

export default function App() {
  return (
    <View style={styles.container}>
      {/*<Welcome />*/}
      {/*<Login/>*/}
      <SignUp/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
