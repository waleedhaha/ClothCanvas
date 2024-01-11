import React from 'react';
import {
  SafeAreaView,
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import WeatherComponent from '../../Api/WeatherComponent';
import { useNavigation } from '@react-navigation/native';

const onlineRecommendations = [
  
  // Array of recommendation images
  // Replace these with your actual image imports
  require('../../../assets/71VFs2XrDVL._AC_UY350_.jpg'),
  require('../../../assets/download.jpeg'),
  require('../../../assets/81e0546690cac64bb804c53a210a9544.jpg'),
  // Add more as needed
];

// Replace these with your actual image 
const handleSave = () =>
    Alert.alert('Save', 'Your outfit has been saved.', [{ text: 'OK' }]);

  const handleLike = () =>
    Alert.alert('Like', 'You liked this outfit!', [{ text: 'OK' }]);

  const handleDislike = () =>
    Alert.alert('Dislike', 'You disliked this outfit.', [{ text: 'OK' }]);
const mainImage = require('../../../assets/61QMBTwEi9L._AC_SL1001_.jpg');
const subImages = [
  require('../../../assets/2.jpg'),
  require('../../../assets/3.jpeg'),
  
];
const saveIcon = require('../../../assets/save.png'); // Replace with your actual save icon
const likeIcon = require('../../../assets/like.png'); // Replace with your actual like icon
const dislikeIcon = require('../../../assets/dislike.png'); 
const outfitsOfWeek = [
  {
    day: 'Monday',
    mainImage: require('../../../assets/wardrobeicon.png'), // Replace with actual image for Monday
    subImages: [
      require('../../../assets/png-transparent-chino-cloth-pants-khaki-shorts-clothing-jeans-boy-active-pants-trousers-thumbnail.png'), // Replace with actual sub-image for Monday
      require('../../../assets/3.jpeg'), // Replace with actual sub-image for Monday
    ],
  },
  {
    day: 'Tuesday',
    mainImage: require('../../../assets/81e0546690cac64bb804c53a210a9544.jpg'), // Replace with actual image for Tuesday
    subImages: [
      require('../../../assets/2.png.jpeg'), // Replace with actual sub-image for Tuesday
      require('../../../assets/3.jpeg'), // Replace with actual sub-image for Tuesday
    ],
  },
  {
    day: 'Wednesday',
    mainImage: require('../../../assets/61zYHbMrzYL._AC_UY1100_.jpg'), // Replace with actual image for Tuesday
    subImages: [
      require('../../../assets/png-transparent-chino-cloth-pants-khaki-shorts-clothing-jeans-boy-active-pants-trousers-thumbnail.png'), // Replace with actual sub-image for Tuesday
      require('../../../assets/111.jpg'), // Replace with actual sub-image for Tuesday
    ],
  },
  {
    day: 'Thursday',
    mainImage: require('../../../assets/suit.png'), // Replace with actual image for Tuesday
    subImages: [
      require('../../../assets/01_19e40005-f33c-4b6b-aa1b-c796ce0f0054.jpg.webp'), // Replace with actual sub-image for Tuesday
      require('../../../assets/44-formal_shoes_1_1000x.jpg.webp'), // Replace with actual sub-image for Tuesday
    ],
  },
  {
    day: 'Friday',
    mainImage: require('../../../assets/black1.png'), // Replace with actual image for Tuesday
    subImages: [
      require('../../../assets/Lot-wool-swati-Shawl-with-Gray-color-with-attractive-pattern-1.jpeg'), // Replace with actual sub-image for Tuesday
      require('../../../assets/WhatsAppImage2022-04-21at8.56.02PM_1.jpg.webp'), // Replace with actual sub-image for Tuesday
    ],
  },
  
  // ... Repeat structure for Wednesday, Thursday, and Friday
];


const windowWidth = Dimensions.get('window').width;
const Mainpage = () => {
  const navigation = useNavigation();
  const handleSave = () => console.log('Save pressed');
  const handleLike = () => console.log('Like pressed');
  const handleDislike = () => console.log('Dislike pressed');
  const renderOutfitsOfWeek = ({ item }) => (
    <View style={styles.outfitOfWeekSlide}>
      <View style={styles.dayContainer}>
        <Text style={styles.dayLabel}>{item.day}</Text>
        <TouchableOpacity onPress={() => handleSave(item.day)} style={styles.saveButton}>
          <Image source={saveIcon} style={styles.bookmark} />
        </TouchableOpacity>
      </View>
      <View style={styles.outfitsContainer}>
       <View style={styles.firstImagesContainer}>
        <Image source={item.mainImage} style={styles.mainOutfitImage} /> 
      </View>
        <View style={styles.subImagesContainer}>
          {item.subImages.map((img, index) => (
            <Image key={index} source={img} style={styles.subOutfitImage} />
          ))}
        </View>
      </View>
    </View>
  );
  const renderOnlineRecommendations = ({ item, index }) => (
    <TouchableOpacity
      style={styles.recommendationSlide}
      onPress={() => navigation.navigate('buyitem', { imageSource: require('../../../assets/71VFs2XrDVL._AC_UY350_.jpg') })} 
    >
      <Image source={item} style={styles.recommendationImage} />
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
      
        <View style={styles.header}>
          <Text style={styles.dateText}>WED, Jan 10</Text>
          <Text style={styles.greetingText}>Good morning</Text>
          <WeatherComponent />
        </View>
        

        {/* Outfits of the day */}
        <View style={styles.outfitSection}>
        <Text style={styles.sectionTitle}>Outfits of the day</Text>
        <View style={styles.outfitsContainer}>
        <View style={styles.firstImagesContainer}>
          <Image source={mainImage} style={styles.mainOutfitImage} />
        </View>
          <View style={styles.subImagesContainer}>
            {subImages.map((img, index) => (
              <Image key={index} source={img} style={styles.subOutfitImage} />
            ))}
          </View>
        </View>
        <View style={styles.reactionBar}>
            <TouchableOpacity onPress={handleSave} style={styles.iconButton}>
              <Image source={saveIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDislike} style={styles.iconButton}>
              <Image source={dislikeIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLike} style={styles.iconButton}>
              <Image source={likeIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        
        

         {/* Outfits for the week */}
        <View >
         <Text style={styles.sectionTitle}>Outfits of the Week</Text>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={outfitsOfWeek}
          renderItem={renderOutfitsOfWeek}
          keyExtractor={(item, index) => `${item.day}-${index}`}
          snapToAlignment={'start'}
          snapToInterval={windowWidth + 20} // Include the space in the snap interval
          decelerationRate="fast"
          contentContainerStyle={styles.flatListContentContainer}
          
          
        />
        </View>
        <View style={styles.recommendationSection}>
          <Text style={styles.sectionTitle}>Online Recommendations</Text>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            data={onlineRecommendations}
            renderItem={renderOnlineRecommendations}
            keyExtractor={(item, index) => `recommendation-${index}`}
            snapToAlignment={'start'}
            snapToInterval={windowWidth + 20} // Include the space in the snap interval
            decelerationRate="fast"
            contentContainerStyle={styles.flatListContentContainer}
          />
        </View>

      </ScrollView>

      {/* Navigation Bar */}
      {/* You'll need to add your own navigation bar component here */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  weatherText: {
    fontSize: 24,
    fontWeight: '300',
  },
  outfitSection:{
    backgroundColor:"lightgray",
    borderRadius:10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  outfitsContainer: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20,
  },
  mainOutfitImage: {
    width: '100%', // Adjust the width percentage as needed
    height: 300, // Adjust the height as needed
    marginRight: 10,
    borderRadius: 10, 
  },
  subImagesContainer: {
    justifyContent: 'space-between',
    flex: 1,
    flexDirection:'column',
    // backgroundColor:'blue',
    padding: 5,
  },
  firstImagesContainer: {
    flex: 2,
    // backgroundColor:'red',
    padding:5,
    paddingLeft:0
  },
  subOutfitImage: {
    borderRadius: 10, 
    // flex: 1,
    width: '100%', // The width will be determined by the flex parent
    height: 145,
    // aspectRatio: 1, // Adjust the aspect ratio as needed
    // resizeMode: 'cover',
  },
  reactionBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingVertical: 10,
    // paddingTop:0,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    // marginBottom:20
  },
  iconButton: {
    padding: 10,
    
    // Add any additional styling if needed
  },
  saveButton: {
    padding: 10,
    // ... styling for the save button, if needed
  },
  icon: {
    width: 25, // Adjust based on the size of your icons
    height: 25, // Adjust based on the size of your icons
    resizeMode: 'contain',
  },
  bookmark: {
    width: 25, // Adjust based on the size of your icons
    height: 25, // Adjust based on the size of your icons
    resizeMode: 'contain',
    alignSelf:'flex-end'
  },

  outfitOfWeekSlide: {
    width: 300, // Set a fixed width or use screen dimensions
    backgroundColor: 'lightgray',
    marginHorizontal:5,
    padding:5,
    borderRadius:10
    // Additional styles for the weekly outfits slide
    // width: windowWidth - 20,

  },
  dayContainer:{
    // width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  dayLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    // Additional styles for the day label
  },
  outfitOfWeekSlideContainer: {
    // Adding horizontal margin to the container
    paddingHorizontal: 10, // This will create space between the slides
  },

  flatListContentContainer: {
    paddingHorizontal: 10, // Padding to the container
  },
  recommendationSection: {
    marginTop: 20, // Add space above the section
  },
  recommendationSlide: {
    width: windowWidth * 0.8, // 80% of the screen width
    marginRight: 20, // Add right margin for space between items
  },
  recommendationImage: {
    width: '100%', // Take up all of the width of the parent
    height: 200, // Fixed height, can be adjusted
    borderRadius: 10, // Round the corners
  },
});

export default Mainpage;
