import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
} from 'react-native';
import logbd from '../../../assets/logbd.png';
import { signIn } from '../../constants/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
//import info from '../screens/info';
import {
  setIsAuthenticated,
  setUser,
  setDetailsNotFilled,
} from '../../../redux/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [fdata, setFdata] = useState({
    email: 'iluvzoyi@gmail.com',
    password: '1234',
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const Sentobackend = async () => {
    const newErrors = {};
  
    if (!fdata.email) {
      newErrors.email = 'Email is required';
    }
    if (!fdata.password) {
      newErrors.password = 'Password is required';
    }
  
    setErrors(newErrors);
  
    if (Object.values(newErrors).some((error) => error !== null)) {
      return;
    } else {
      try {
        const response = await fetch(signIn, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fdata),
        });
  
        const data = await response.json();
  
        if (data.error === 'Email Not Found') {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Email Not Found',
            password: null,
          }));
        } else if (data.error) {
          if (data.error === 'Incorrect Password') {
            setErrors((prevErrors) => ({
              ...prevErrors,
              password: 'Incorrect Password',
              email: null,
            }));
          }
  
          Platform.OS === 'android' && ToastAndroid.show(data.error, ToastAndroid.SHORT);
        } else {
          if (data && data.user && data.token) {
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            dispatch(setIsAuthenticated(true));
            dispatch(setUser(data.user));
  
            if (!data.detailsFilled) {
              await AsyncStorage.setItem('detailsNotFilled', JSON.stringify(true));
              dispatch(setDetailsNotFilled(true));
              navigation.navigate('info');
            } else {
              navigation.navigate('Home');
            }
          } else {
            Platform.OS === 'android' && ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
          }
        }
      } catch (error) {
        console.error('Error:', error);
        Platform.OS === 'android' && ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    }
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.backgroundImage} source={logbd} />
      <View style={styles.overlay}>
        <Text style={styles.head}></Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              onPressIn={() => setErrors({ ...errors, email: null })}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
              onFocus={() => setErrors({ ...errors, email: null })}
              value={fdata.email}
            />
            {errors.email && (
              <Text style={styles.errorMessage}>{errors.email}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
              onFocus={() => setErrors({ ...errors, password: null })}
              value={fdata.password}
            />
            {errors.password && (
              <Text style={styles.errorMessage}>{errors.password}</Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => Sentobackend()}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.otherButtons}>
            <Text style={styles.rememberMe}>Remember me</Text>
            <Text style={styles.linkText}>Forgot Password</Text>
          </View>
          <View style={styles.alreadyHaveAccount}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.linkText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "black",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    top: 180,
    color: "black",
  },
  head: {
    fontSize: 16,
    color: "black",
    marginBottom: 30,
    //textAlign: "center",
    fontWeight: "bold",
    top: 250,
  },
  formGroup: {
    marginBottom: 20,
    width: "80%",
    color: "black",
  },
  label: {
    fontSize: 17,
    color: "#FFFFFF",
    marginBottom: 10,
    color: "black",
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    padding: 10,
    color: "black",
  },
  buttonContainer: {
    marginBottom: 20,
    width: "80%",
  },
  loginButton: {
    backgroundColor: "#7D3DFD",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
  },
  otherButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 40,
    color: "black",
  },
  rememberMe: {
    color: "black",
  },
  linkText: {
    color: "#7D3DFD",
  },
  alreadyHaveAccount: {
    flexDirection: "row",
    justifyContent: "center",
    width: "80%",
  },
  scrollViewContent: {
    flexGrow: 3,
    justifyContent: "center",
    top: 20,
    left: 18,
  },
  errorMessage: {
    color: "red",
    fontSize: 15,
    textAlign: "center",
    backgroundColor: "white",
    padding: 3,
    borderRadius: 10,
    marginTop: 8,
  },
});

export default Login;
