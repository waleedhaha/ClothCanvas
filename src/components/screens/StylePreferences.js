import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import {addUserStyle} from '../../constants/endpoints'

const StylePreferences = ({ navigation }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedClothes, setSelectedClothes] = useState([]);

  const handleFavoriteColorsChange = (option) => {
    const selectedColor = option.label;
    setSelectedColors((prevColors) => [...prevColors, selectedColor]);
  };

  const handleFavoriteClothesChange = (option) => {
    const selectedClothing = option.label;
    setSelectedClothes((prevClothes) => [...prevClothes, selectedClothing]);
  };

  const handleSavePreferences = async () => {
    const userId = "user_id_here"; // Replace with the actual user ID

    // Prepare the request body
    const requestBody = {
      userId,
      name: "John Doe", // Replace with the actual user's name
      favoriteColors: selectedColors,
      favoriteClothes: selectedClothes,
    };

    // Make the POST request to save preferences
    try {
      const response = await fetch(addUserStyle, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 201) {
        console.log('Style preferences saved successfully');
        // Navigate to MainPage.js
        navigation.navigate('Home');
      } else {
        console.error('Error saving style preferences');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Style Preferences</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Favorite Colors:</Text>
        <ModalSelector
          data={[
            { key: 1, label: 'Red' },
            { key: 2, label: 'Blue' },
            { key: 3, label: 'Green' },
            // Add more color options as needed
          ]}
          initValue="Select Colors"
          onChange={(option) => handleFavoriteColorsChange(option)}
          multiple
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Clothes You Like to Wear:</Text>
        <ModalSelector
          data={[
            { key: 1, label: 'T-Shirts' },
            { key: 2, label: 'Dresses' },
            { key: 3, label: 'Jeans' },
            // Add more clothing options as needed
          ]}
          initValue="Select Clothes"
          onChange={(option) => handleFavoriteClothesChange(option)}
          multiple
        />
      </View>

      {/* Display selected colors */}
      <View style={styles.selectedItemsContainer}>
        <Text style={styles.label}>Selected Colors:</Text>
        {selectedColors.map((color, index) => (
          <Text key={index}>{color}</Text>
        ))}
      </View>

      {/* Display selected clothes */}
      <View style={styles.selectedItemsContainer}>
        <Text style={styles.label}>Selected Clothes:</Text>
        {selectedClothes.map((clothing, index) => (
          <Text key={index}>{clothing}</Text>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSavePreferences}>
        <Text style={styles.buttonText}>Save Preferences</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  selectedItemsContainer: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default StylePreferences;
