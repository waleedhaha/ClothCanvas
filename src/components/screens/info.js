import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModalSelector from "react-native-modal-selector";
import {
  addUserPreferences,
  uploadFileUrl,
  getUserByJwt,
} from "../../constants/endpoints";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import UserImg from "../../../assets/account.png";
import axios from "axios";
import { setUser, setDetailsNotFilled } from "../../../redux/authSlice";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const UserPreferences = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Access user data from the Redux store

  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    dob: new Date(),
    height: "",
    occupation: "",
    weight: "",
    bodyType: "",
    skinTone: "",
    profilePicture: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showHeightPicker, setShowHeightPicker] = useState(false);
  const handleHeightChange = (selectedHeight) => {
    setFormData({ ...formData, height: selectedHeight });
    setShowHeightPicker(false); // Hide picker after selection
  };


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // Keep the picker open on iOS
    if (selectedDate) {
      setFormData({ ...formData, dob: selectedDate });
      setShowDatePicker(false); // Hide picker after date is selected
    }
  };
  const [height, setHeight] = useState("170"); // Default height as a string

  // Function to render height options
  const renderHeightOptions = () => {
    let heightOptions = [];
    for (let i = 100; i <= 250; i++) { // Heights from 100cm to 250cm
      heightOptions.push(<Picker.Item key={i} label={`${i} cm`} value={`${i}`} />);
    }
    return heightOptions;
  };
  const heightData = Array.from({ length: 151 }, (_, i) => ({
    key: i,
    label: `${100 + i} cm`,
  }));

  const isDetailsNotFilled = async () => {
    const detailsNotFilled = await AsyncStorage.getItem("detailsNotFilled");
    if (!detailsNotFilled) {
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    isDetailsNotFilled();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = async () => {
    // ImagePicker.showImagePicker({ title: 'Select Avatar' }, (response) => {
    //   if (!response.didCancel) {
    //     // Set the selected image URI in state
    //     setFormData({ ...formData, profilePicture: response.uri });
    //   }
    // });

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled && result.assets && result.assets[0]) {
      setFormData({ ...formData, profilePicture: result.assets[0] });
    }
  };

  const getUser = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await axios.get(getUserByJwt, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response?.data?.user ? response?.data?.user : null;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  const uploadFile = async (image) => {
    const formData = new FormData();
    formData.append("file", {
      uri: image?.uri,
      type: "image/jpeg", // or whatever your file type is
      name: `${Date.now()}.jpg`, // or any name you want to assign to the file
    });

    try {
      const response = await fetch(uploadFileUrl, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      // console.log(responseData); // Handle the response data
      return responseData;
    } catch (error) {
      // console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!formData?.profilePicture) {
      return;
    }

    try {
      // Perform validation here if needed
      const imageUploadRes = await uploadFile(formData?.profilePicture);
      if (imageUploadRes && imageUploadRes.success && imageUploadRes.imageUrl) {
        console.log("imageUploadRes.imageUrl", imageUploadRes.imageUrl);
        const response = await fetch(addUserPreferences, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            userId: user?._id,
            setIsFilledUserFlag: true,
            avatarUrl: imageUploadRes.imageUrl,
          }),
        });

        if (response.status === 201) {
          // User preferences saved successfully
          const updatedUserDetails = await getUser();
          if (updatedUserDetails) {
            dispatch(setUser(updatedUserDetails));
            dispatch(setDetailsNotFilled(false));
            await AsyncStorage.setItem(
              "user",
              JSON.stringify(updatedUserDetails)
            );
            await AsyncStorage.removeItem("detailsNotFilled");
            navigation.navigate("StylePreferences");
          }
        } else {
          // Handle errors or display error messages
          console.error("Error saving user preferences");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.heading}>Set Your User Preferences</Text>
        <View
          // style={styles.formGroup}
          style={{}}
        >
          <TouchableOpacity onPress={handleImageUpload}>
            <Image
              source={
                formData?.profilePicture
                  ? { uri: formData?.profilePicture?.uri }
                  : UserImg
              }
              style={{ width: 120, height: 120, borderRadius: 50 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={formData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
        </View>

        <View style={styles.formGroup}>
  <Text style={styles.label}>Date of Birth:</Text>
  <TouchableOpacity
    style={styles.datePickerButton}
    onPress={() => setShowDatePicker(true)}
  >
    <Text style={styles.datePickerText}>
      {formData.dob instanceof Date ? formData.dob.toLocaleDateString() : 'Select a date'}
    </Text>
  </TouchableOpacity>
  {showDatePicker && (
    <View style={styles.datePickerContainer}>
      <DateTimePicker
        value={formData.dob instanceof Date ? formData.dob : new Date()}
        mode="date"
        display="default"
        onChange={handleDateChange}
      />
    </View>
  )}
</View>


<View style={styles.formGroup}>
  <Text style={styles.label}>Height (in cm):</Text>
  <ModalSelector
    data={heightData}
    initValue="Select Height"
    onChange={(option) => handleChange('height', option.label)}
  />
  <TextInput
    style={styles.input}
    placeholder="Your height"
    value={formData.height}
    editable={false} // Make it read-only
  />
</View>

<View style={styles.formGroup}>
  <Text style={styles.label}>Occupation:</Text>
  <ModalSelector
    data={[
      { key: 'student', label: "Student" },
      { key: 'jobHolder', label: "Job Holder" },
      { key: 'businessMan', label: "Business" },
      { key: 'Teacher', label: "Teacher" },
      { key: 'Doctor', label: "Doctor" },
      { key: 'Engineer', label: "Engineer" },
      { key: 'Lawyer', label: "Lawyer" },
      { key: 'Others', label: "Others" },
      // ... other options ...
    ]}
    initValue="Select Occupation"
    onChange={(option) => handleChange("occupation", option.label)}
  />
  <TextInput
    style={styles.input}
    placeholder="Your Occupation"
    value={formData.occupation}
    editable={false} // Make it read-only
  />
</View>

<View style={styles.formGroup}>
  <Text style={styles.label}>Body Type:</Text>
  <ModalSelector
    data={[
      { key: 'athletic', label: "Athletic" },
      { key: 'obese', label: "Obese" },
      { key: 'normal', label: "Normal" },
      // ... other options ...
    ]}
    initValue="Select Body Type"
    onChange={(option) => handleChange("bodyType", option.label)}
  />
  <TextInput
    style={styles.input}
    placeholder="Your Body Type"
    value={formData.bodyType}
    editable={false} // Make it read-only
  />
</View>

        <View style={styles.formGroup}>
  <Text style={styles.label}>Skin Tone:</Text>
  <ModalSelector
    data={[
      { key: 'dark', label: "Dark" },
      { key: 'pale', label: "Pale" },
      { key: 'brown', label: "Brown" },
      // ... other options ...
    ]}
    initValue="Select Skin Tone"
    onChange={(option) => handleChange("skinTone", option.label)}
  />
  <TextInput
    style={styles.input}
    placeholder="Your Skin Tone"
    value={formData.skinTone}
    editable={false} // Make it read-only
  />
</View>


        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    top: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  datePickerContainer: {
    alignItems: 'flex-start', // Aligns DateTimePicker to the left
  },
});

export default UserPreferences;
