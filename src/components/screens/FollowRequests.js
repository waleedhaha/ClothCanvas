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
import {
  baseUrlImage,
  getFollowComingRequests,
  acceptFollowRequest,
  followRequest,
} from "../../constants/endpoints";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome

const subImages = require("../../../assets/customAvatar.jpg");

const ImageList = ({}) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${getFollowComingRequests}/${user?._id}`
      );
      console.log("response requests ", response.data.data);
      if (!response.data.success) {
        throw new Error("Network response was not ok");
      }
      setUsers(response.data.data);
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

  const handleReject = async (item) => {
    const res = await axios.delete(
      `${followRequest}?fromUser=${item.fromUser._id}&toUser=${item.toUser}`
    );
    console.log("follow delete res", res.data);
    if (res && res.data.success) {
      fetchData();
    }
  };

  const handleAccept = async (item) => {
    const res = await axios.put(`${acceptFollowRequest}/${item._id}`);
    console.log("follow delete res", res.data);
    if (res && res.data.success) {
      fetchData();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={
            item?.fromUser?.avatarUrl
              ? { uri: baseUrlImage + item?.fromUser?.avatarUrl }
              : subImages
          }
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleAccept(item)}
            style={styles.iconButtonStyle}
          >
            <Icon
              name="check"
              size={28}
              color="white"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleReject(item)}
            style={styles.iconButtonStyle}
          >
            <Icon
              name="close"
              size={28}
              color="white"
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.name}>
        {item?.fromUser?.name} has requested to follow you.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {users && users.length > 0 ? (
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={1}
          />
        ) : (
          <Text>No Data Found</Text>
        )}
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
    // alignItems: "center",
    // justifyContent: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
  },
  requestButton: {
    backgroundColor: "lightblue",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconStyle: {
    // backgroundColor:'red',
  },
  iconButtonStyle: {
    backgroundColor: "purple",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 50,
    width: 40,
    height: 40,
    alignContent: "center",
    // padding:5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ImageList;
