import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    // For simplicity, let's assume you're using a function to log out
    // Example: logoutUser()
    // This function should handle clearing user authentication data and navigating to the login screen
    // Replace this with your actual logout logic
    console.log('Logging out...');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Page!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Home;
