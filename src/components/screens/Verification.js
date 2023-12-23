import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { signUp } from '../../constants/endpoints'

const Verification = ({ navigation, route }) => {
  const {userdata} = route.params;

  const [errormsg, setErrormsg] = useState(null);
  const [userCode, setUserCode] = useState('XXXX');
  const [actualCode, setActualCode] = useState(null);

  useEffect(() => {
    console.log('useEffect is running');
    console.log('Received userdata:', userdata);
      setActualCode(userdata[0]?.verificationCode);
  }, [userdata])
  const SendToBackend = () => {
    //console.log(userCode)
    //console.log(actualCode)
    if (userCode == 'XXXX' || userCode == '') {
      setErrormsg('Please enter the code');
      return;
  }
  
  
    else if (userCode == actualCode) {
      // Correct code, proceed with backend request
      const fdata = {
        email: userdata[0]?.email,
        password: userdata[0]?.password,
        name: userdata[0]?.name,   
         }
  
      fetch(signUp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fdata),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === 'User Registered Successfully') {
            alert(data.message);
            navigation.navigate('Login');
          } else {
            alert('Something went wrong! Try Signing Up Again');
          }
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    } else {
      setErrormsg('Incorrect code');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.head}>Verification</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>A code has been sent to you</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter 6 digit code"
            keyboardType="numeric"
            maxLength={6}
            onChangeText={(text) => setUserCode(text)}
            value={userCode}
          />
        </View>
        {errormsg && (
          <Text style={styles.errorMessage}>{errormsg}</Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={SendToBackend}>
            <Text style={styles.loginButtonText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  head: {
    fontSize: 16,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: 20,
    width: '80%',
  },
  label: {
    fontSize: 17,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
    width: '100%',
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
  errorMessage: {
    color: 'red',
  },
});

export default Verification;
