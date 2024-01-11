import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import {
  baseUrlImage,
  getSpecificProfile,
  followRequest,
  followRequestCheck,
  getFollowData,
  getFollowers
} from "../../constants/endpoints";

// Import your new wardrobe endpoint
import { getUserWardrobe } from "../../constants/endpoints"; 

const subImages = require("../../../assets/customAvatar.jpg");
const Counter = ({ number, title }) => (
  <View style={styles.counterContainer}>
    <Text style={styles.counterNumber}>{number}</Text>
    <Text style={styles.counterTitle}>{title}</Text>
  </View>
);


const UserFollowProfile = ({ route }) => {
  const user = useSelector((state) => state.auth.user);
  const { userId, name, avatarUrl } = route.params;
  const navigation = useNavigation();
  const loggedInUser = useSelector((state) => state.auth.user);

  const [users, setUsers] = useState([]);
  const [followData, setFollowData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [followStatus, setFollowStatus] = useState("none");
  const [wardrobeData, setWardrobeData] = useState([]); // State to store wardrobe data

  const fetchData = async () => {
    try {
      const response = await axios.get(`${getSpecificProfile}/${userId}`);
      if (!response.data.success) {
        throw new Error("Network response was not ok");
      }
      setUsers(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching user data: ", error);
      setIsLoading(false);
    }
  };

  const fetchFollowData = async () => {
    try {
      const response = await axios.get(`${getFollowers}/${userId}`);
      if (response.data.data && response.data.success) {
        setFollowData(response.data.data);
      }
      if (!response.data.success) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log("Error fetching follow data: ", error);
      setFollowData(null);
    }
  };

  const fetchWardrobeData = async () => {
    try {
      const response = await axios.get(`${getUserWardrobe}/${userId}`);
      if (response.data.success) {
        setWardrobeData(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching wardrobe data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    checkFollowStatus();
    fetchFollowData();
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    if (followStatus === "accepted") {
      fetchWardrobeData();
    }
  }, [followStatus]);

  const handleFollow = async () => {
    if (followStatus === "none") {
      const res = await axios.post(`${followRequest}`, {
        fromUserId: loggedInUser._id,
        toUserId: userId,
      });
      console.log("follow res", res.data);
      if (res && res.data.success) {
        checkFollowStatus();
      }
    } else if (followStatus === "pending") {
      const res = await axios.delete(
        `${followRequest}?fromUser=${loggedInUser._id}&toUser=${userId}`
      );
      console.log("follow delete res", res.data);
      if (res && res.data.success) {
        checkFollowStatus();
      }
    }
  };

  const checkFollowStatus = async () => {
    try {
      const response = await axios.get(
        `${followRequestCheck}/${loggedInUser._id}/${userId}`
      );
      console.log("followRequestCheck ", response.data.data);
      if (response && response?.data?.success) {
        if (response?.data?.data === null) {
          setFollowStatus("none");
        } else if (
          response?.data?.data &&
          response?.data?.data?.status === "pending"
        ) {
          setFollowStatus("pending");
        } else if (
          response?.data?.data &&
          response?.data?.data?.status === "accepted"
        ) {
          setFollowStatus("accepted");
        }
      }

      if (!response.data.success) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.log(" Error fetching data: ", error);
      setFollowStatus("none");
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  

  return (
    <>
      <View style={styles.container}>
        <Image
          source={
            users && users.avatarUrl
              ? { uri: baseUrlImage + users.avatarUrl }
              : subImages
          }
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={styles.username}>{name}</Text>

        <TouchableOpacity style={styles.followButton} onPress={handleFollow}>
          <Text style={styles.followButtonText}>
            {followStatus === "none"
              ? "Follow"
              : followStatus === "pending"
              ? "Requested"
              : followStatus === "accepted"
              ? "Following"
              : ""}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <Counter number="0" title="Items" />
        <Counter number={user?.followers?.length || 0} title="Followers" />
        <Counter number={user?.following?.length || 0} title="Followings" />
      </View>
      {/* <View style={styles.container1}>
        <Text style={styles.counterTitle}>Followers</Text>
        <Text style={styles.counterNumber}>
          {followData?.followers?.length || 0}
        </Text>
        <Text style={styles.counterTitle}>Followings</Text>
        <Text style={styles.counterNumber}>
          {followData?.followings?.length || 0}
        </Text>
      </View> */}
      {followStatus === "accepted" && wardrobeData.length > 0 ? (
        // Display wardrobe data when the user is followed and has wardrobe items
        <View style={styles.container}>
          <Text style={styles.headerText}>Wardrobe Data</Text>
          {wardrobeData.map((item) => (
            <Text key={item._id}>{item.name}</Text>
          ))}
        </View>
      ) : followStatus === "accepted" && wardrobeData.length === 0 ? (
        // Display a message when the user is followed but has no wardrobe items
        <View style={styles.container}>
          <Text style={styles.headerText}>This user has no wardrobe items.</Text>
        </View>
      ) : (
        // Display "This account is private" message if not followed
        <View style={styles.container}>
          <Icon name="lock" size={30} color="black" />
          <Text style={styles.headerText}>This account is private</Text>
          <Text style={styles.subText}>
            Follow this account to see their wardrobe.
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  username: {
    fontSize: 20,
    marginVertical: 10,
  },
  followButton: {
    backgroundColor: "lightblue",
    padding: 12,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  followButtonText: {
    fontSize: 15,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  counterTitle: {
    fontSize: 16,
  },
  counterNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default UserFollowProfile;
