import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const App = () => {
 return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: 'https://www.pinterest.com/pin/cute-spring-nails--950822540051183572/' }}
      />
      <Text style={styles.welcome}>Good morning</Text>
      <Text style={styles.description}>
        Looks Inspired by your wardrobe
      </Text>
      <View style={styles.outfitContainer}>
        <Text style={styles.outfitTitle}>Outfits of the day</Text>
        <Text style={styles.outfitTitle}>Outfits for the week</Text>
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
 },
 image: {
    width: 100,
    height: 100,
    marginBottom: 20,
 },
 welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
 },
 description: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
 },
 outfitContainer: {
    alignItems: 'center',
    marginTop: 20,
 },
 outfitTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
 },
});

export default App;