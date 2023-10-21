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
} from 'react-native';
import signupbd from '../../../assets/signupbd.png';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const [fdata, setFdata] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [errormsg, setErrormsg] = useState(null);

  const navigation = useNavigation();

  const handleAlreadyHaveAccount = () => {
    navigation.navigate('Login');
  };

  const Sendtobackend = async () => {
    if (!fdata.name || !fdata.email || !fdata.password || !fdata.cpassword) {
      setErrormsg('All fields are required');
      return;
    } else if (fdata.password !== fdata.cpassword) {
      setErrormsg('Password and Confirm Password must be the same');
      return;
    } else {
      try {
        const response = await fetch('http://192.168.18.164:3000/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fdata),
        });

        const data = await response.json();

        if (data.error === 'Invalid Credentials') {
          setErrormsg('Invalid Credentials');
        } else if (data.message === 'Verification Code Sent to your Email') {
          alert(data.message);
          navigation.navigate('verification', { userdata: data.udata });
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image style={styles.backgroundImage} source={signupbd} />
        <View style={styles.overlay}>
          <Text style={styles.head}>Sign Up</Text>
          {errormsg && <Text style={styles.errormessage}>{errormsg}</Text>}

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              onChangeText={(text) => setFdata({ ...fdata, email: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              onChangeText={(text) => setFdata({ ...fdata, name: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, password: text })}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry={true}
              onChangeText={(text) => setFdata({ ...fdata, cpassword: text })}
            />
          </View>

          <TouchableOpacity
            onPress={handleAlreadyHaveAccount}
            style={styles.alreadyHaveAccountButton}>
            <Text style={styles.buttonText}>Already have an account?</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.signUpButton} onPress={Sendtobackend}>
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
  errormessage: {
    color: 'red',
  },
});

export default Signup;
