// AuthScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from './actions'; // Adjust the path as needed

const AuthScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    // Perform authentication logic here
    const user = { username: username }; // Replace with actual user data

    // Save user data to AsyncStorage
    await AsyncStorage.setItem('user', JSON.stringify(user));

    // Dispatch login action to update Redux store
    dispatch(login(user));
  };

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default AuthScreen;
