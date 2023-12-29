import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import wpbd from "../../../assets/wpbd.png";
import { button1, transparentButton } from "../../common/button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setIsAuthenticated, setUser } from "../../../redux/authSlice";

const Welcome = ({ navigation }) => {
 
  const dispatch  = useDispatch();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const user = await AsyncStorage.getItem("user");
    const userToken = await AsyncStorage.getItem("userToken");
    const detailsNotFilled = await AsyncStorage.getItem("detailsNotFilled");
    console.log(user, userToken, detailsNotFilled);
    if (userToken && user) {
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(user));
      if (detailsNotFilled) {
        navigation.navigate("info");
      } else {
        navigation.navigate("Home");
      }
    }
  };

  const handleAlreadyHaveAccount = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.wpbd} source={wpbd} />
      <View style={styles.overlay}>
        <Text
          style={[styles.head, { left: 52, top: 450, width: 307, height: 29 }]}
        >
          Welcome to ClothCanvas
        </Text>
        <Text
          style={[
            styles.subHead,
            { left: 75, top: 480, width: 310, height: 62 },
          ]}
        >
          Discover Your Perfect Look with a
        </Text>
        <Text
          style={[
            styles.sub1Head,
            { left: 128, top: 500, width: 307, height: 29 },
          ]}
        >
          Professional stylist
        </Text>
        <TouchableOpacity
          onPress={handleAlreadyHaveAccount}
          style={[transparentButton, styles.alreadyHaveAccountButton]}
        >
          <Text style={styles.buttonText}>Already have an account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={[button1, styles.button]}
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  wpbd: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  head: {
    fontSize: 26,
    color: "#000000",
    position: "absolute",
  },
  subHead: {
    fontSize: 16,
    color: "#000000",
    position: "absolute",
  },
  sub1Head: {
    fontSize: 16,
    color: "#000000",
    position: "absolute",
  },
  button: {
    position: "absolute",
    left: 150, // Adjust for X coordinate
    top: 616, // Adjust for Y coordinate
  },
  alreadyHaveAccountButton: {
    position: "absolute",
    left: 110, // Adjust for X coordinate
    top: 700, // Adjust for Y coordinate
  },
  buttonText: {
    color: "black",
    textAlign: "center",
  },
});
