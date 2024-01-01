import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios'; // Ensure axios is installed
import Date from "../../common/Date";
import GreetingComponent from "../../common/GreetingComponent";
import Slider from "../../common/Slider";

const images = [
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
  // ... other images
];

function Mainpage() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        fetchWeather(latitude, longitude);
      },
      error => {
        Alert.alert("Error", "Unable to fetch location");
        console.error(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const fetchWeather = (lat, lon) => {
    axios.get(`Weather?lat=${lat}&lon=${lon}`) // Replace with your backend URL
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.mainTop}>
          <View style={styles.date}>
            <Date />
            {location && (
              <Text style={styles.location}>
                Location: {location.latitude}, {location.longitude}
              </Text>
            )}
            {weather && (
              <Text style={styles.weather}>
                Weather: {weather.main.temp}°C, {weather.weather[0].description}
              </Text>
            )}
          </View>
          <View style={styles.greeting}>
            <GreetingComponent />
            <Text style={styles.slogan}>Looks inspired by your wardrobe</Text>
          </View>
        </View>
        <View style={styles.imageSlider}>
          <Slider title={"Outfits of the day"} images={images} />
        </View>
        {/* ... other sliders */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainTop: {
    paddingLeft: 15,
    paddingTop: 15,
    marginBottom: 40,
  },
  date: {
    paddingLeft: 12,
  },
  location: {
    textAlign: "center",
    marginTop: 10,
  },
  greeting: { 
    width: 300 
  },
  slogan: { 
    textAlign: "center" 
  },
  weather: { 
    textAlign: "center", 
    marginTop: 10 
  },
  imageSlider: {
    width: '100%',
  },
});

export default Mainpage;
