import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import AddItems from './additems';

import {
  fetchCategories,
  getUserWardrobe
} from "../../constants/endpoints";

import ImageList from './ImageList'; // Make sure to use the correct path to ImageList.js
import axios from "axios";

const MyWardrobe = () => {
  const user = useSelector((state) => state.auth.user);
  
  const [availableCategories, setAvailableCategories] = useState([]);
  const [wardrobeData, setWardrobeData] = useState([]);
   

  const [selectedCategory, setSelectedCategory] = useState(-1);

  const getCategories = async () => {
    try {
      const res = await axios.get(fetchCategories);
      // console.log(res);
      if (res && res.data.success) {
        setAvailableCategories(res.data.data);
      } else {
        setAvailableCategories([]);
      }
    } catch (err) {
      console.log(err);
      setAvailableCategories([]);
    }
  };

  const getWardrobeData = async () => {
    try {
      const url = selectedCategory === -1  ? `${getUserWardrobe}/${user?._id}` : `${getUserWardrobe}/${user?._id}?categoryId=${availableCategories[selectedCategory]._id}`
      const res = await axios.get(url);
      // console.log(res);
      if (res && res.data.success) {
        setWardrobeData(res.data.data);
      } else {
        setWardrobeData([]);
      }
    } catch (err) {
      console.log(err);
      setWardrobeData([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(()=>{
    getWardrobeData()
  },[selectedCategory])

  // These should be the URIs of your images
  const tShirtImages = [
    require('../../../assets/a.jpeg'),
    require('../../../assets/a.jpeg'),
    require('../../../assets/a.jpeg'),
    require('../../../assets/a.jpeg'),
  ];

  const shirtImages = [
    require('../../../assets/a.jpeg'),
    require('../../../assets/a.jpeg'),
    require('../../../assets/a.jpeg'),
    require('../../../assets/a.jpeg'),
  ];
  const JeansImages = [
    require('../../../assets/a.jpeg'),
    require('../../../assets/a.jpeg'),
    require('../../../assets/a.jpeg'),
    require('../../../assets/a.jpeg'),
  ];

  return (
    
    <SafeAreaView style={{ flex: 1 }}>

      <ScrollView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wardrobe</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tab} onPress={()=>setSelectedCategory(-1)}>
            <Text style={styles.tabText}>All</Text>
          </TouchableOpacity>
        
          {availableCategories && availableCategories.map((data, index)=>{return(
            <TouchableOpacity key={data._id} style={styles.tab} onPress={()=>setSelectedCategory(index)}>
            <Text style={styles.tabText}>{data.name}</Text>
          </TouchableOpacity>
          )})}
        </View>
      </View>
        <ImageList title="T-Shirts" imageList={wardrobeData} />
        {/* <ImageList title="Jackets" imageList={shirtImages} /> */}
        {/* <ImageList title="Jeans" imageList={JeansImages} /> */}
      </ScrollView>
      <View style={styles.addItemsContainer}>
      <AddItems />
    </View>
    </SafeAreaView>
  );
};

export default MyWardrobe;

const styles = StyleSheet.create({
  
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:10,
    // fontWeight:800
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    // paddingHorizontal:20
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E8E8E8',
  },
  tabText: {
    fontSize: 16,
  },
  addItemsContainer: {
    position: 'absolute', // Use absolute positioning
    right: 40, // For example, 10 pixels from the right
    bottom: 656, // For example, 10 pixels from the bottom
    // Adjust position as needed
  },


});







// import React, { useState, useEffect } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Image,
//   Alert,
// } from "react-native";
// import { useSelector } from "react-redux";
// import AddItems from "./additems";
// import axios from "axios";

// import {
//   fetchCategories,
//   getUserWardrobe,
//   removeWardrobeItem, // Import the endpoint to remove wardrobe items
// } from "../../constants/endpoints";

// import ImageList from "./ImageList"; // Make sure to use the correct path to ImageList.js

// const MyWardrobe = () => {
//   const user = useSelector((state) => state.auth.user);

//   const [availableCategories, setAvailableCategories] = useState([]);
//   const [wardrobeData, setWardrobeData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(-1);

//   const getCategories = async () => {
//     try {
//       const res = await axios.get(fetchCategories);
//       if (res && res.data.success) {
//         setAvailableCategories(res.data.data);
//       } else {
//         setAvailableCategories([]);
//       }
//     } catch (err) {
//       console.log(err);
//       setAvailableCategories([]);
//     }
//   };

//   const getWardrobeData = async () => {
//     try {
//       const url =
//         selectedCategory === -1
//           ? `${getUserWardrobe}/${user?._id}`
//           : `${getUserWardrobe}/${user?._id}?categoryId=${availableCategories[selectedCategory]._id}`;
//       const res = await axios.get(url);
//       if (res && res.data.success) {
//         setWardrobeData(res.data.data);
//       } else {
//         setWardrobeData([]);
//       }
//     } catch (err) {
//       console.log(err);
//       setWardrobeData([]);
//     }
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   useEffect(() => {
//     getWardrobeData();
//   }, [selectedCategory]);

//   const handleRemoveItem = async (itemId) => {
//     try {
//       // Call the endpoint to remove wardrobe item
//       const res = await axios.delete(`${removeWardrobeItem}/${itemId}`);
//       if (res && res.data.success) {
//         // Remove the item from the wardrobeData state
//         setWardrobeData((prevData) =>
//           prevData.filter((item) => item._id !== itemId)
//         );
//       } else {
//         console.log("Failed to remove item");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ScrollView style={{ flex: 1 }}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>My Wardrobe</Text>
//           <View style={styles.tabContainer}>
//             <TouchableOpacity
//               style={styles.tab}
//               onPress={() => setSelectedCategory(-1)}
//             >
//               <Text style={styles.tabText}>All</Text>
//             </TouchableOpacity>

//             {availableCategories &&
//               availableCategories.map((data, index) => {
//                 return (
//                   <TouchableOpacity
//                     key={data._id}
//                     style={styles.tab}
//                     onPress={() => setSelectedCategory(index)}
//                   >
//                     <Text style={styles.tabText}>{data.name}</Text>
//                   </TouchableOpacity>
//                 );
//               })}
//           </View>
//         </View>
//         <View style={styles.imageListContainer}>
//           {wardrobeData.map((item) => (
//             <PressableImageItem
//               key={item._id}
//               item={item}
//               onRemove={handleRemoveItem}
//             />
//           ))}
//         </View>
//       </ScrollView>
//       <View style={styles.addItemsContainer}>
//         <AddItems />
//       </View>
//     </SafeAreaView>
//   );
// };

// // Create a new component for each pressable image item
// const PressableImageItem = ({ item, onRemove }) => {
//   const handlePress = () => {
//     // You can implement the logic to edit the photo here
//     // For example, navigate to the edit screen
//     // You can also display options like 'Edit' and 'Remove' in an Alert or modal
//     Alert.alert(
//       "Options",
//       "Choose an action",
//       [
//         {
//           text: "Edit",
//           onPress: () => {
//             // Implement edit logic or navigation
//           },
//         },
//         {
//           text: "Remove",
//           onPress: () => {
//             // Call the onRemove function to remove the item
//             onRemove(item._id);
//           },
//         },
//       ],
//       { cancelable: true }
//     );
//   };

//   return (
//     <TouchableOpacity style={styles.imageItem} onPress={handlePress}>
//       <Image
//         source={{ uri: item.imageUri }} // Replace with your image URI
//         style={styles.image}
//       />
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     paddingHorizontal: 16,
//     paddingTop: 10,
//   },
//   headerTitle: {
//     fontSize: 40,
//     fontWeight: "bold",
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 40,
//   },
//   tab: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     backgroundColor: "#E8E8E8",
//   },
//   tabText: {
//     fontSize: 16,
//   },
//   addItemsContainer: {
//     position: "absolute",
//     right: 40,
//     bottom: 656,
//   },
//   imageListContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     marginTop: 20,
//   },
//   imageItem: {
//     width: "48%",
//     aspectRatio: 1,
//     marginBottom: 16,
//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
// });

// export default MyWardrobe;
