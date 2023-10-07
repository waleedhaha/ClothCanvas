import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Welcome from './src/components/screens/Welcome';
import Login from './src/components/screens/Login';
import SignUp from './src/components/screens/SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} 
          options={
            {headerShown: false}
          }/>
          <Stack.Screen name="Login" component={Login}
          options={
            {headerShown: false}
          }/>
          <Stack.Screen name="SignUp" component={SignUp}
          options={
            {headerShown: false}
          }/>
        </Stack.Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
