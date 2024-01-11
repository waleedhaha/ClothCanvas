import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const OutfitIcon = ({ date, outfit }) => {
  return (
    <View style={styles.outfitContainer}>
      {/* Replace with your own image source */}
      <Image source={require('../../../assets/wardrobeicon.png')} style={styles.outfitImage} />
      <Text style={styles.outfitDate}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outfitContainer: {
    alignItems: 'center',
    margin: 5,
  },
  outfitImage: {
    width: 50,
    height: 50,
    // Add any additional styling for the image
  },
  outfitDate: {
    // Add any additional styling for the date text
  },
});

export default OutfitIcon;
