import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Welcome from "./src/components/screens/Welcome";
import Login from "./src/components/screens/Login";
import SignUp from "./src/components/screens/SignUp";
import Verification from "./src/components/screens/Verification";
import StylePreferences from "./src/components/screens/StylePreferences";
import NewItemDetails from "./src/components/screens/NewItemDetails";
import info from "./src/components/screens/info";
import AddItems from "./src/components/screens/additems";
import Mainpage from "./src/components/screens/Mainpage";
import MyWardrobe from "./src/components/screens/mywardrobe";
import ProfileScreen from "./src/components/screens/Profile";
import SettingsScreen from "./src/components/screens/Settings";
import { Provider } from "react-redux";
import store from "./redux/store"; // Adjust the path as needed
import { useSelector, useDispatch } from "react-redux"; // Import your selector
import { setIsAuthenticated, setUser, setDetailsNotFilled } from "./redux/authSlice"; // Adjust the path as needed
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mainpage" component={Mainpage} />
      <Tab.Screen name="AddItems" component={AddItems} />
      <Tab.Screen name="MyWardrobe" component={MyWardrobe} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const detailsNotFilledRd = useSelector((state) => state.auth.detailsNotFilledRd);


  const checkIsAuthenticated = async () => {
    const user = await AsyncStorage.getItem("user");
    const userToken = await AsyncStorage.getItem("userToken");
    const detailsNotFilled = await AsyncStorage.getItem("detailsNotFilled");
    if (userToken && user) {
      if (detailsNotFilled) {
        dispatch(setDetailsNotFilled(true));
      }
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(JSON.parse(user)));
    }
  };

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <>
        {detailsNotFilledRd ?
            <Stack.Screen
            name="info"
            component={info}
            options={{ headerShown: false }}
          />
    :
    <>
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
            name="StylePreferences"
            component={StylePreferences}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="NewItemDetails"
            component={NewItemDetails}
            options={{ headerShown: false }}
          />
        </>
}
        </>
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={Welcome}
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
            name="Verification"
            component={Verification}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <Navigation />
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
