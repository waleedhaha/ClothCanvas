// ProfileScreen.js
import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you have this library installed
import {baseUrlImage} from '../../constants/endpoints'
import * as ImagePicker from "expo-image-picker";
//import FollowerListScreen from "../screens/FollowerListScreen";
//import FollowingListScreen from "../screens/FollowingListScreen";
const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user); // Access user data from the Redux store
  const [formData, setFormData] = useState({

    profilePicture: null,
    // ... other form fields
  });
  const [image, setImage] = useState(null);

  
  const pickImage = async () => {
    // ImagePicker functionality as provided in your snippet
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
  // Placeholder function for Share Profile button
  const onShareProfile = () => {
    // Implementation for Share Profile
  };
  const navigateToFollowerList = () => {
    navigation.navigate('followerListScreen', { userIds: user?.followers });
  };

  const navigateToFollowingList = () => {
    navigation.navigate('followingListScreen', { userIds: user?.following });
  };
  // Placeholder function for Edit Profile button
  const onEditProfile = () => {
    navigation.navigate('Settings');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Icon name="arrow-left" size={20} color="#000" style={styles.backIcon} />
        <Text style={styles.headerTitle}>Profile</Text>
        <Icon name="heart" size={20} color="#000" style={styles.settingsIcon} 
         onPress={() =>
          navigation.navigate("followRequests")
        }
        />

        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: user?.avatarUrl ? baseUrlImage + user?.avatarUrl : 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text style={styles.bio}>Hello, my name is {user?.name}. Welcome to my Profile!</Text>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{user?.posts}</Text>
            <Text style={styles.statLabel}>Items</Text>
          </View>
          <TouchableOpacity style={styles.stat} onPress={() => navigateToFollowerList()}>
    <Text style={styles.statValue}>{user?.followers?.length || 0}</Text>
    <Text style={styles.statLabel}>Followers</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.stat} onPress={() => navigateToFollowingList()}>
    <Text style={styles.statValue}>{user?.following?.length || 0}</Text>
    <Text style={styles.statLabel}>Following</Text>
</TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={onEditProfile} style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onShareProfile} style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
          
        </View>
      </View>
  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:20
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  settingsIcon: {
    position: 'absolute',
    top: 39,
    right: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#A020F0', // Purple border color
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  username: {
    color: '#555',
    marginBottom: 8,
  },
  bio: {
    textAlign: 'center',
    marginVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  editButton: {
    backgroundColor: '#A020F0', // Purple background color
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  shareButton: {
    backgroundColor: '#A020F0', // Purple background color
    padding: 10,
    borderRadius: 5,
    // Style similar to editButton but with different colors if needed
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    // Style similar to editButtonText but with different colors if needed
  },
  // ... (rest of your styles)
});

export default ProfileScreen;
