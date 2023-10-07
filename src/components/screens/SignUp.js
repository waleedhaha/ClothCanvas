import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import signupbd from '../../../assets/signupbd.png';

const SignUp = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={signupbd} />
      <View style={styles.overlay}>
        <Text style={styles.head}>Sign Up</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter your Email" />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="Enter your username" />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput style={styles.input} placeholder="Confirm your password" secureTextEntry />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.otherButtons}>
          <Text style={styles.rememberMe}>Remember me</Text>
        </View>
        <View style={styles.alreadyHaveAccount}>
          <Text style={styles.linkText}>Already have an account?</Text>
          <Text style={styles.linkText}>Sign In</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    width: '80%',
    padding: 20,
    borderRadius: 10,
    top: 240,
  },
  head: {
    fontSize: 26,
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    color: 'blue',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
    color: '#000',
  },
  buttonContainer: {
    marginBottom: 30,
  },
  signUpButton: {
    backgroundColor: '#7D3DFD',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  otherButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMe: {
    color: 'blue',
  },
  alreadyHaveAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#7D3DFD',
    marginLeft: 10,
  },
});

export default SignUp;
