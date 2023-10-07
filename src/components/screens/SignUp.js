import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import signupbd from '../../../assets/signupbd.png';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();

  const handleAlreadyHaveAccount = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
          <TouchableOpacity onPress={handleAlreadyHaveAccount} style={styles.alreadyHaveAccountButton}>
            <Text style={styles.buttonText}>Already have an account?</Text>
          </TouchableOpacity>
          <View style={styles.rememberMe}>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signUpButton}>
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 240,
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
  rememberMe: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    color: 'blue',
  },
  alreadyHaveAccountButton: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#7D3DFD',
  },
});

export default SignUp;
