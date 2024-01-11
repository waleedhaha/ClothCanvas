import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const FollowingListScreen = ({ route, navigation }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFollowing = async (userIds) => {
    setLoading(true);
    // Replace with your API call and logic to fetch user data    setLoading(false);
  };

  useEffect(() => {
    if (route.params?.userIds) {
      fetchFollowing(route.params.userIds);
    }
  }, [route.params?.userIds]);

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={following}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              {/* Display other user details as needed */}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default FollowingListScreen;
