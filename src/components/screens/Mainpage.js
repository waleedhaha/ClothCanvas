import React from "react";
import { SafeAreaView,StyleSheet, Text, View } from "react-native";
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
  // require('../../images/a.jpeg'),
  // require('../../images/a.jpeg'),
  // require('../../images/a.jpeg'),
  // require('../../images/a.jpeg'),
  // require('./assets/image5.png'),
];
//
function Mainpage() {
  return (
    <>
    <SafeAreaView>

      <View style={styles.mainTop}>
        <View style={styles.date}>
          <Date />
        </View>
        <View style={styles.a}>
          <GreetingComponent />
          <Text style={styles.slogan}>Looks insspired by your wardrobe</Text>
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
    </SafeAreaView>
    </>
  );
}



const styles = StyleSheet.create({
  mainTop: {
    paddingLeft: 15,
    paddingTop: 15,
    marginBottom:40
  },
  date: { paddingLeft: 12 },
  a: { width: 300 },
  slogan: { textAlign: "center" },
  imageSlider: {
    width:'100vW',
   
  }
});
export default Mainpage;
