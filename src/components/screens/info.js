import React, { useState } from "react";
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
import { setUser } from "../../../redux/authSlice";

const UserPreferences = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user); // Access user data from the Redux store

  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    height: "",
    occupation: "",
    weight: "",
    bodyType: "",
    skinTone: "",
    profilePicture: null,
  });

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
          <TextInput
            style={styles.input}
            placeholder="Enter your date of birth"
            value={formData.dob}
            onChangeText={(text) => handleChange("dob", text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Height (in cm):</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your height"
            value={formData.height}
            onChangeText={(text) => handleChange("height", text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Occupation:</Text>
          <ModalSelector
            data={[
              { key: 0, label: "Select Occupation" },
              { key: 1, label: "Student" },
              { key: 2, label: "Job Holder" },
              // Add more options as needed
            ]}
            initValue="Select Occupation"
            onChange={(option) => handleChange("occupation", option.label)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Weight (in kg):</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your weight"
            value={formData.weight}
            onChangeText={(text) => handleChange("weight", text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Body Type:</Text>
          <ModalSelector
            data={[
              { key: 0, label: "Select Body Type" },
              { key: 1, label: "Athletic" },
              { key: 2, label: "Obese" },
              { key: 3, label: "Normal" },
              // Add more options as needed
            ]}
            initValue="Select Body Type"
            onChange={(option) => handleChange("bodyType", option.label)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Skin Tone:</Text>
          <ModalSelector
            data={[
              { key: 0, label: "Select Skin Tone" },
              { key: 1, label: "Dark" },
              { key: 2, label: "Pale" },
              { key: 3, label: "Brown" },
              // Add more options as needed
            ]}
            initValue="Select Skin Tone"
            onChange={(option) => handleChange("skinTone", option.label)}
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
    marginBottom: 20,
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
});

export default UserPreferences;
