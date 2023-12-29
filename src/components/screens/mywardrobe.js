import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

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

});