// WeatherComponent.js
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { Weather } from '../constants/endpoints' // Adjust the path as needed

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await axios.get(`${Weather}?lat=${lat}&lon=${lon}`);
        console.log(response.data);
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const getPermissionsAndLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      fetchWeather(currentLocation.coords.latitude, currentLocation.coords.longitude);
    };

    getPermissionsAndLocation();
  }, []);

  if (!weather) {
    return <Text>Loading weather data...</Text>;
  }
  return (
    <View style={styles.container}>
    {weather ? (
      <Text>Weather: {weather?.current?.temp_c}°C</Text>
    ) : (
      <Text>Loading weather data...</Text>
    )}
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    // Styles for your weather component
  }
});

export default WeatherComponent;
