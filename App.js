import { StatusBar } from 'expo-status-bar';
import React , { useEffect }from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from './src/components/screens/Welcome';
import Login from './src/components/screens/Login';
import SignUp from './src/components/screens/SignUp';
import Verification from './src/components/screens/Verification';
import StylePreferences from './src/components/screens/StylePreferences';
import NewItemDetails from './src/components/screens/NewItemDetails';
import info from './src/components/screens/info';
import AddItems from './src/components/screens/additems';
import Mainpage from './src/components/screens/Mainpage';
import MyWardrobe from './src/components/screens/mywardrobe';
import ProfileScreen from './src/components/screens/Profile'
import SettingsScreen from './src/components/screens/Settings'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mainpage" component={Mainpage} />
      <Tab.Screen name="AddItems" component={AddItems} />
      <Tab.Screen name="MyWardrobe" component={MyWardrobe} />
      <Tab.Screen name = "Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
     useEffect(() => {
     checkToken();
   }, []);

   const checkToken = async () => {
     const userToken = await AsyncStorage.getItem('userToken');
     if (userToken) {
       // Token exists, navigate to Mainpage
       navigation.navigate('Mainpage');
     }
   };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator>
       <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          /> 
          <Stack.Screen
            name="Home"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{ headerShown: false }}
          /> 

                  <Stack.Screen
            name="StylePreferences"
            component={StylePreferences}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />  

           <Stack.Screen
            name="NewItemDetails"
            component={NewItemDetails}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="info"
            component={info}
            options={{ headerShown: false }}
          />   

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
