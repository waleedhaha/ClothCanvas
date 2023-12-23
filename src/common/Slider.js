import React from 'react';
import { View, ScrollView, Image, Dimensions, StyleSheet,Text } from 'react-native';

// Get the full width of the device screen
const { width } = Dimensions.get('window');

const Slider = ({title, images }) => {
  // Calculate the width of each image as 48% of the screen width
  const imageWidth = width * 0.48;
  // Calculate the space between images

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
      >
      {images.map((image, index) => (
        <View key={index} style={{ borderCurve: 30 }}>
          <Image source={image} style={[styles.image, { width: imageWidth, borderCurve: 20, borderRadius: 30 }]} />
        </View>
      ))}
    </ScrollView>
      </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',

  },
  image: {
    height: 300, // Set the height according to your requirement
    resizeMode: 'contain',
    marginLeft: 5,
   borderRadius: 30

  },
  container: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:10,
    marginBottom:-20 
  },
});

export default Slider;