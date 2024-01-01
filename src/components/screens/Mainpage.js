import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import Date from "../../common/Date";
import GreetingComponent from "../../common/GreetingComponent";
import Slider from "../../common/Slider";
//import WeatherComponent from "../../Api/WeatherComponent"; // Adjust the path accordingly

const images = [
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
  require('../../../assets/a.jpeg'),
];

function Mainpage() {
  // const [weather, setWeather] = useState(null);

  // useEffect(() => {
  //   // Fetch weather data using WeatherComponent
  //   WeatherComponent().then(weatherData => {
  //     setWeather(weatherData);
  //   }).catch(error => {
  //     console.error('Error fetching weather data', error);
  //   });
  // }, []); // Ensure this runs only once when the component mounts

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.mainTop}>
          <View style={styles.date}>
            <Date />
            {/* {weather && (
              <Text style={styles.weather}>
                Weather: {weather.main.temp}°C, {weather.weather[0].description}
              </Text>
            )} */}
          </View>
          <View style={styles.a}>
            <GreetingComponent />
            <Text style={styles.slogan}>Looks inspired by your wardrobe</Text>
          </View>
        </View>
        <View style={styles.imageSlider}>
          <Slider title={"Outfits of the day"} images={images} />
        </View>
        <View style={styles.imageSlider}>
          <Slider title={"Outfits of the week"} images={images} />
        </View>
        <View style={styles.imageSlider}>
          <Slider title={"Trending"} images={images} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainTop: {
    paddingLeft: 15,
    paddingTop: 15,
    marginBottom: 40,
  },
  date: { paddingLeft: 12 },
  a: { width: 300 },
  slogan: { textAlign: "center" },
  weather: { textAlign: "center", marginTop: 10 },
  imageSlider: {
    width: '100%',
  },
});

export default Mainpage;