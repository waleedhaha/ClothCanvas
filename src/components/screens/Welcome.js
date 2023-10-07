import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import wpbd from '../../../assets/wpbd.png';
import { button1, transparentButton } from '../../common/button';

const Welcome = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.wpbd} source={wpbd} />
      <View style={styles.overlay}>
        <Text style={[styles.head, { left: 52, top: 450, width: 307, height: 29 }]}>
          Welcome to ClothCanvas
        </Text>
        <Text style={[styles.subHead, { left: 75, top: 480, width: 310, height: 62 }]}>
          Discover Your Perfect Look with a
        </Text>
        <Text style={[styles.sub1Head, { left: 128, top: 500, width: 307, height: 29 }]}>
          Professional stylist
        </Text>
        <View style={[button1, styles.button]}>
          <Text style={{ color: '#FFFFFF', textAlign: 'center' }}>Get Started</Text>
        </View>

        <View style={[transparentButton, styles.alreadyHaveAccountButton]}>
  <Text style={styles.buttonText}>Already have an account</Text>
</View>

      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  wpbd: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  head: {
    fontSize: 26,
    color: '#000000',
    position: 'absolute',
  },
  subHead: {
    fontSize: 16,
    color: '#000000',
    position: 'absolute',
  },
  sub1Head: {
    fontSize: 16,
    color: '#000000',
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    left: 150,  // Adjust for X coordinate
    top: 616,  // Adjust for Y coordinate
  },
  alreadyHaveAccountButton: {
    position: 'absolute',
    left: 110,  // Adjust for X coordinate
    top: 700,  // Adjust for Y coordinate
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
  }
});
