// SettingsScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser, setIsAuthenticated } from "../../../redux/authSlice";
import { useSelector, useDispatch } from 'react-redux'

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Clear session data from AsyncStorage or secure storage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
      dispatch(setUser(null))
      dispatch(setIsAuthenticated(false))

      Alert.alert(
        "Logout",
        "You have been logged out successfully.",
        [
          {
            text: "OK",
            onPress: () => navigation.replace('Login'),
          },
        ]
      );
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Button title="Edit Profile" onPress={() => {}} />
        <Button title="Security" onPress={() => {}} />
        <Button title="Notifications" onPress={() => {}} />
        <Button title="Privacy" onPress={() => {}} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support & About</Text>
        <Button title="My Subscription" onPress={() => {}} />
        <Button title="Help & Support" onPress={() => {}} />
        <Button title="Terms and Policies" onPress={() => {}} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cache & Cellular</Text>
        <Button title="Free up Space" onPress={() => {}} />
        <Button title="Data Saver" onPress={() => {}} />
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions</Text>
        <Button title="Report a Problem" onPress={() => {}} />
        <Button title="Add Account" onPress={() => {}} />
        <Button title="Logout" onPress={handleLogout} />
      </View>
      {/* Add more settings options as needed */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10
  },
  section: {
    marginVertical: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
});

export default SettingsScreen;
