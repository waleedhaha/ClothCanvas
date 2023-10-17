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

const SignUp = () => {
  const [fdata, setfdata] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    cpassword: null,
  });

  const handleFieldFocus = (field) => {
    setErrors({
      ...errors,
      [field]: null,
    });
  };

  const Sentobackend = () => {
    
    const newErrors = {};
  
    if (!fdata.name) {
      newErrors.name = 'Name is required';
    }
    if (!fdata.email) {
      newErrors.email = 'Email is required';
    }
    if (!fdata.password) {
      newErrors.password = 'Password is required';
    }
    if (!fdata.cpassword) {
      newErrors.cpassword = 'Confirm Password is required';
    }
  
    setErrors(newErrors);
  
    if (Object.values(newErrors).some((error) => error !== null)) {
      return;
    } else {
      if (fdata.password !== fdata.cpassword) {
        setErrors({
          ...errors,
          cpassword: 'Password and Confirm Password must be the same',
        });
        return;
      } 
      else {
        fetch('http://192.168.18.164:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fdata),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              setErrors({ ...errors, general: data.error });
            } else {
              alert('Account created successfully');
              navigation.navigate('Login');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
  };
  

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
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              onChangeText={(text) => setfdata({ ...fdata, email: text })}
              onFocus={() => handleFieldFocus('email')}
            />
            {errors.email && <Text style={styles.errormessage}>{errors.email}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              onChangeText={(text) => setfdata({ ...fdata, name: text })}
              onFocus={() => handleFieldFocus('name')}
            />
            {errors.name && <Text style={styles.errormessage}>{errors.name}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => setfdata({ ...fdata, password: text })}
              onFocus={() => handleFieldFocus('password')}
            />
            {errors.password && <Text style={styles.errormessage}>{errors.password}</Text>}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              secureTextEntry={true}
              onChangeText={(text) => setfdata({ ...fdata, cpassword: text })}
              onFocus={() => handleFieldFocus('cpassword')}
            />
            {errors.cpassword && <Text style={styles.errormessage}>{errors.cpassword}</Text>}
          </View>

          <TouchableOpacity
            onPress={handleAlreadyHaveAccount}
            style={styles.alreadyHaveAccountButton}>
            <Text style={styles.buttonText}>Already have an account?</Text>
          </TouchableOpacity>

          <View style={styles.rememberMe}>
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.signUpButton}
              onPress={() => {
                Sentobackend();
              }}>
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
