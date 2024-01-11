import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome'; // Make sure to install this package

const ProductDetailScreen = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const route = useRoute();
  const imageSource = route.params?.imageSource; 
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with Back Arrow and Like Icon */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="heart" size={24} color="#FF0000" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <Image
           source={imageSource || require('../../../assets/download.jpeg')}
          style={styles.productImage}
          resizeMode="contain"
        />

        {/* Product Title and Price */}
        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Black LeatherJacket</Text>
          <Text style={styles.productPrice}>$120</Text>
          <Text style={styles.productDescription}>
            
Introducing our sleek and stylish leather jacket, a timeless piece that seamlessly blends fashion and functionality. Crafted from high-quality genuine leather, this jacket promises durability and a luxurious feel. Its classic design features a zip-front closure, giving it a versatile and effortlessly cool look.
          </Text>
        </View>

        {/* Size Selector */}
        <View style={styles.sizeSelector}>
          <Text style={styles.sizeTitle}>CHOOSE SIZE</Text>
          <View style={styles.sizeOptions}>
            {['S', 'M', 'L', 'XL'].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.sizeOptionSelected,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Icon name="shopping-cart" size={24} color="#FFF" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  productDetails: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E91E63',
    marginVertical: 8,
  },
  productDescription: {
    fontSize: 16,
    color: '#333',
  },
  sizeSelector: {
    padding: 16,
  },
  sizeTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sizeOption: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 50,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeOptionSelected: {
    backgroundColor: '#333',
  },
  sizeText: {
    color: '#333',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#333',
    margin: 16,
    borderRadius: 50,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ProductDetailScreen;
