import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons/'; // Make sure to install react-native-vector-icons
//import * as ImagePicker from 'expo-image-picker';

const AddItems = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);

  const pickImage = async (source) => {
    let result;
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled && result.assets && result.assets[0]) {
      setImage(result);
      // Navigate to NewItemDetails
      navigation.navigate('NewItemDetails', { image: result.assets[0] });
    }
  };

  return (
    <View style={styles.container}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon name="add-a-photo" size={30} color="#000" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalText}>Upload new clothes</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => pickImage('camera')}
            >
              <Icon name="camera-alt" size={24} color="#000" />
              <Text style={styles.optionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => pickImage('gallery')}
            >
              <Icon name="photo-library" size={24} color="#000" />
              <Text style={styles.optionText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  optionButton: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 18,
  },
  // ... add other styles you might need ...
});

export default AddItems;