import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Weather from '../constants/endpoints';

const WeatherComponent = () => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = (latitude, longitude) => {
    fetch(`${Weather}?lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => setWeather(data))
      .catch(error => console.error(error));
  };

  const getLocationAndWeather = () => {
    Geolocation.getCurrentPosition(
      position => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <View>
      <Button title="Get Weather" onPress={getLocationAndWeather} />
      {weather && <Text>Weather: {JSON.stringify(weather)}</Text>}
    </View>
  );
};

export default WeatherComponent;
