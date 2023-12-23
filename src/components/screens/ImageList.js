// ImageList.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  baseUrlImage
} from "../../constants/endpoints";

const ImageList = ({ title, imageList }) => {
  console.log(imageList)
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <View style={styles.imageContainer}>
        {imageList.map((data, index) => (
          <Image
            key={index}
            source={{uri:baseUrlImage +  data.imageUrl}}
            style={styles.image}
          />
          // <Text>{data.name}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal:20
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingHorizontal:20
  },
  image: {
    width: '48%', // Adjust the width as per your design grid
    height: 140, // Adjust the height as per your design grid
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default ImageList;