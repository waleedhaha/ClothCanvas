// ProfileScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import {baseUrlImage} from '../../constants/endpoints'

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user); // Access user data from the Redux store

  // Placeholder function for Edit Profile button
  const onEditProfile = () => {
    navigation.navigate('Settings');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: user?.avatarUrl?  baseUrlImage + user?.avatarUrl :'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        {/* Replace with user's profile image URI */}
        <Text style={styles.name}>Waleed Khalid</Text>
        {/* Replace with user's name */}
        <TouchableOpacity onPress={onEditProfile} style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.savedContainer}>
        <Text style={styles.savedTitle}>Saved</Text>
        <View style={styles.categories}>
          <View style={styles.category}>
            <View style={styles.categoryItems} />
            {/* Placeholder for category item */}
            <Text style={styles.categoryText}>Casual</Text>
          </View>
          <View style={styles.category}>
            <View style={styles.categoryItems} />
            {/* Placeholder for category item */}
            <Text style={styles.categoryText}>Formal</Text>
          </View>
        </View>
      </View>

      {/* Add bottom tab navigator if not already present */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // Make this half the width/height to get a circle
    borderWidth: 3,
    borderColor: '#fff',
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  editButton: {
    marginTop: 10,
    padding: 10,
  },
  editButtonText: {
    color: '#0000ff',
  },
  savedContainer: {
    paddingHorizontal: 20,
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  category: {
    alignItems: 'center',
    width: 100,
  },
  categoryItems: {
    width: 80,
    height: 80,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 16,
  },
  // Add more styles as needed
});

export default ProfileScreen;
