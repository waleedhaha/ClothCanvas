import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios'; // Ensure axios is installed
import { Weather } from './src/constants/endpoints';

export default function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getPermissionsAndLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      fetchWeather(currentLocation.coords.latitude, currentLocation.coords.longitude);
    };

    getPermissionsAndLocation();
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await axios.get(`${Weather}?lat=${lat}&lon=${lon}`); // Replace with your backend URL
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <View style={styles.container}>
      {location && (
        <Text>Current Location: Latitude {location.coords.latitude}, Longitude {location.coords.longitude}</Text>
      )}
      {weather && (
        <Text>Weather: {weather.main.temp}°C, {weather.weather[0].description}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
