import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import logbd from '../../../assets/logbd.png';
import {signIn} from '../../constants/endpoints'
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
  const [fdata, setFdata] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const Sentobackend = () => {
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
      // Check if the user already has details filled
      fetch(signIn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fdata)
      })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          if (data.error === 'Password does not match') {
            setErrors({ ...errors, password: 'Incorrect Password' });
            setErrors({ ...errors, email: null }); // Reset email error
          } else if (data.error === 'Email Not Found') {
            setErrors({ ...errors, email: 'Email Not Found' });
            setErrors({ ...errors, password: null }); // Reset password error
          }
        } else {
          // Check if the user already has details filled
          if (data.detailsFilled) {
            // User has details filled, navigate to Homepage
            AsyncStorage.setItem('userToken', data.token);
            alert('Login successfully');
            navigation.navigate('Home');
          } else {
            // User is new, navigate to Info page
            alert('Login successfully, but user is new');
            navigation.navigate('info');
          }
        }
      });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image style={styles.backgroundImage} source={logbd} />
      <View style={styles.overlay}>
        <Text style={styles.head}>Login to ClothCanvas</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              onPressIn={() => setErrors({ ...errors, email: null })}
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
              onFocus={() => setErrors({ ...errors, email: null })}
            />
            {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
              onFocus={() => setErrors({ ...errors, password: null })}
            />
            {errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={() => Sentobackend()}>
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
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    top: 180,
    color: 'black',
  },
  head: {
    fontSize: 16,
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    top: 250,
  },
  formGroup: {
    marginBottom: 20,
    width: '80%',
    color: 'black',
  },
  label: {
    fontSize: 17,
    color: '#FFFFFF',
    marginBottom: 10,
    color: 'black',
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
    color: 'black',
  },
  buttonContainer: {
    marginBottom: 20,
    width: '80%',
  },
  loginButton: {
    backgroundColor: '#7D3DFD',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  otherButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 40,
    color: 'black',
  },
  rememberMe: {
    color: 'black',
  },
  linkText: {
    color: '#7D3DFD',
  },
  alreadyHaveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
  },
  scrollViewContent: {
    flexGrow: 3,
    justifyContent: 'center',
    top: 20,
    left: 18,
  },
  errorMessage: {
    color: 'red',
    fontSize: 15,
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 10,
    marginTop: 8,
  },
});

export default Login;