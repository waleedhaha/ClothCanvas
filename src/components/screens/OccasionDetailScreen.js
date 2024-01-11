import React, { useState,useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import {navigation} from '@react-navigation/native';
import OccasionContext  from '../screens/OccasionContext';
import calendar from './calendar';
const OccasionDetailScreen = ({ route, navigation }) => {
    const [occasion, setOccasion] = useState('');
    const [notes, setNotes] = useState('');
    const { date } = route.params;
    const { addOccasion } = useContext(OccasionContext);
  
    const saveOccasion = () => {
      addOccasion(date, { occasion, notes, icon: '👔' }); // You can extend this with actual occasion data
      navigation.navigate('calendar'); // Ensure this matches the name of your Calendar screen in the navigator
    };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Occasion Details</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          editable={false}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Occasion</Text>
        <TextInput
          style={styles.input}
          onChangeText={setOccasion}
          value={occasion}
          placeholder="Enter the occasion"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          onChangeText={setNotes}
          value={notes}
          placeholder="Additional notes"
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={saveOccasion}>
        <Text style={styles.buttonText}>Save Occasion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingTop: 50,
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: 'white',
  },
  textArea: {
    paddingTop: 16,
    height: 120,
    textAlignVertical: 'top', // Align text at the top on Android
  },
  button: {
    backgroundColor: '#0066cc',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  placeholder: {
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#999',
  },
});

export default OccasionDetailScreen;
