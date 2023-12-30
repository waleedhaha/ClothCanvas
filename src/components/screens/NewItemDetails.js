import { useSelector } from 'react-redux'
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import axios from "axios";
import {
  fetchCategories,
  fetchSubCategoriesByCategory,
  uploadFileUrl,
  addUserWardrobe,
} from "../../constants/endpoints";
import { Picker } from "@react-native-picker/picker";

const NewItemDetails = ({ route ,navigation}) => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)


  const { image } = route.params;
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [waistSize, setWaistSize] = useState(undefined);

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(-1);
  const [selectedSubCategory, setSelectedSubCategory] = useState(-1);

  // Mock data for suggestions
  const categorySuggestions = [
    "Textured Hoodie",
    "Simple Hoodie",
    "Zipper Hoodie",
  ];
  const colorSuggestions = ["Light Blue", "Sky Blue", "Navy Blue"];
  const sizeSuggestions = [
    { key: "none", value: "None" },
    { key: "small", value: "Small" },
    { key: "medium", value: "Medium" },
    { key: "large", value: "Large" },
    { key: "xl", value: "XL" },
    { key: "xxl", value: "XXL" },
    { key: "xxxl", value: "XXXL" },
  ];

  const getCategories = async () => {
    try {
      const res = await axios.get(fetchCategories);
      // console.log(res);
      if (res && res.data.success) {
        setAvailableCategories(res.data.data);
        if (res.data.data.length > 0) setSelectedCategory(0);
      } else {
        setAvailableCategories([]);
      }
    } catch (err) {
      console.log(err);
      setAvailableCategories([]);
    }
  };

  const getSubCategories = async () => {
    try {
      const res = await axios.get(
        fetchSubCategoriesByCategory +
          `/${availableCategories[selectedCategory]?._id}`
      );
      // console.log(res.data.success);
      if (res && res.data.success) {
        setAvailableSubCategories(res.data.data);
        if (res.data.data.length > 0) setSelectedSubCategory(0);
      } else {
        setAvailableSubCategories([]);
      }
    } catch (err) {
      console.log(
        err,
        fetchSubCategoriesByCategory +
          `/${availableCategories[selectedCategory]?._id}`
      );
      setAvailableSubCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== -1) {
      getSubCategories();
      setSelectedSubCategory(-1);
    }
  }, [selectedCategory]);

  const renderSuggestions = (suggestions, onSelect) => {
    return suggestions.map((item) => (
      <TouchableOpacity
        key={item._id}
        style={styles.suggestionItem}
        onPress={() => onSelect(item)}
      >
        <Text>{item?.name}</Text>
      </TouchableOpacity>
    ));
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

  const validateForm = () => {
    if (
      !image ||
      selectedCategory === -1 ||
      selectedSubCategory === -1 ||
      !name
    ) {
      return false;
    }
    return true;
  };
  const handleFormSubmit = async () => {
    if(validateForm()){
    const imageUploadRes = await uploadFile(image);
    if (imageUploadRes && imageUploadRes.success && imageUploadRes.imageUrl) {
      console.log(imageUploadRes.imageUrl);
      const object = {
        name,
        waistSize: parseInt(waistSize),
        description,
        categoryId: availableCategories[selectedCategory]._id,
        subCategoryId: availableSubCategories[selectedSubCategory]._id,
        shoeSize: 0,
        imageUrl: imageUploadRes.imageUrl,
        userId: user?._id,
        size
      }
      const res = await axios.post(addUserWardrobe,{...object})
      console.log(res.data)
      navigation.navigate('MyWardrobe');
    } else {
      // console.log(imageUploadRes)
    }
  }
  else{
   
  }
  };

  console.log("category data", selectedCategory, selectedSubCategory);
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <Text style={styles.title}>Item Details</Text>
        <Image source={{ uri: image?.uri || image }} style={styles.image} />

        {/* Category input */}
        {/* <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
       */}

        <View style={styles.suggestionsContainer}>
          <Text>Select Category</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemIndex)
            }
          >
            {availableCategories.length > 0 &&
              availableCategories.map((data, index) => {
                return (
                  // <View style={styles.suggestionsContainer}>
                  //   {renderSuggestions(availableCategories, setSelectedCategory)}
                  // </View>
                  <Picker.Item
                    key={data?._id}
                    label={data?.name}
                    value={index}
                  />
                );
              })}
          </Picker>
        </View>

        <View style={styles.suggestionsContainer}>
          <Text>Select Sub Category</Text>
          <Picker
            selectedValue={selectedSubCategory}
            // style={{ height: 200 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedSubCategory(itemIndex)
            }
          >
            {availableSubCategories.length > 0 &&
              availableSubCategories.map((data, index) => {
                return (
                  // <View style={styles.suggestionsContainer}>
                  //   {renderSuggestions(availableCategories, setSelectedCategory)}
                  // </View>
                  <Picker.Item
                    key={data?._id}
                    label={data?.name}
                    value={index}
                  />
                );
              })}
          </Picker>
        </View>

        <View style={styles.suggestionsContainer}>
          <Text>Select Size</Text>
          <Picker
            selectedValue={size}
            onValueChange={(itemValue, itemIndex) => setSize(itemIndex)}
          >
            {sizeSuggestions.length > 0 &&
              sizeSuggestions.map((data, index) => {
                return (
                  <Picker.Item
                    key={data?.key}
                    label={data?.value}
                    value={index}
                  />
                );
              })}
          </Picker>
        </View>

        {/* Color input */}
        {/* <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={setColor}
      />
      {color.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {renderSuggestions(colorSuggestions, setColor)}
        </View>
      )} */}

        {/* Size input */}
        {/* <TextInput
        style={styles.input}
        placeholder="Size"
        value={size}
        onChangeText={setSize}
      />
      {size.length > 0 && (
        <View style={styles.suggestionsContainer}>
          {renderSuggestions(sizeSuggestions, setSize)}
        </View>
      )} */}

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Waist Size(if any)"
          value={waistSize}
          onChangeText={setWaistSize}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <TouchableOpacity
          onPress={handleFormSubmit}
          style={styles.button}
          disabled={!validateForm()}
        >
          <Text style={styles.text}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginVertical: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "gray",
    width: "80%",
    padding: 10,
  },
  suggestionsContainer: {
    width: "80%",
    marginTop: 5,
  },
  suggestionItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 35,
    width: "90%",
  },
  text: {
    fontSize: 16,
    color: "#000000",
  },
});

export default NewItemDetails;
