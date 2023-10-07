import React from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import logbd from '../../../assets/logbd.png';

const Login = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={logbd} />
      <View style={styles.overlay}>
        <Text style={styles.head}>Login to ClothCanvas</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter your email" />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </View>
        <View style={styles.otherButtons}>
          <Text style={styles.rememberMe}>Remember me</Text>
          <Text style={styles.linkText}>Forgot Password</Text>
        </View>
        <View style={styles.alreadyHaveAccount}>
          <Text style={styles.linkText}>Don't have an account?</Text>
          <Text style={styles.linkText}>Sign Up</Text>
        </View>
      </View>
    </View>
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
    position: 'absolute',
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
    marginBottom: 20,
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
});

export default Login;
