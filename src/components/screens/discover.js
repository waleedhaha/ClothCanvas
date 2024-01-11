// ImageList.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { baseUrlImage, getAllUsers } from "../../constants/endpoints";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const subImages = require("../../../assets/customAvatar.jpg");

const ImageList = ({}) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${getAllUsers}/${user?._id}`);
      //   console.log("response ", response.data.data);
      if (!response.data.success) {
        throw new Error("Network response was not ok");
      }
      const filteredUsers = response.data.data.filter((item) => !item.isFriend); // Filter out friends
      setUsers(filteredUsers);
      setIsLoading(false);
    } catch (error) {
      console.log(" Error fetching data: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("userFollowScreen", { userId: item._id })
        }
      >
        <Image
          source={
            item.avatarUrl ? { uri: baseUrlImage + item.avatarUrl } : subImages
          }
          style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ImageList;
