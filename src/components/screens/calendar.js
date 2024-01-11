import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';


const CalendarScreen = ({ navigation }) => {
  const markedDates = {
    '2024-01-10': {
      selected: true,
      customStyles: {
        container: {},
        text: {},
      },
    },
    // ...other marked dates
  };
  const CalendarHeader = () => {
    return (
      <LinearGradient
        colors={['#120318', '#221a36']}
        style={styles.headerContainer}
      >
        <Text style={styles.headerText}>Your outfits added in calendar.</Text>
      </LinearGradient>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Your outfits added in calendar.</Text> */}
      <Calendar
        current={'2024-01-10'}
        onDayPress={(day) => {
          navigation.navigate('OccasionDetailScreen', { date: day.dateString });
        }}
        renderArrow={(direction) => (
          <TouchableOpacity>
            <Text style={styles.arrow}>{direction === 'left' ? '<' : '>'}</Text>
          </TouchableOpacity>
        )}
        monthFormat={'MMMM yyyy'}
        hideExtraDays={true}
        disableMonthChange={true}
        hideDayNames={true}
        showWeekNumbers={false}
        disableAllTouchEventsForDisabledDays={true}
        theme={themeStyles}
        markedDates={markedDates}
        markingType={'custom'}
        dayComponent={({ date, state }) => {
          let dayContents = (
            <Text style={{
              textAlign: 'center',
              color: state === 'disabled' ? 'gray' : 'black',
            }}>
              {date.day}
            </Text>
          );

          if (date.dateString === '2024-01-10') {
            dayContents = (
              <View style={styles.customDay}>
                {dayContents}
                <Text style={styles.outfitIcon}>👔</Text>
              </View>
            );
          }

          return (
            <TouchableOpacity style={styles.day} onPress={() => navigation.navigate('OccasionDetailScreen', { date: date.dateString })}>
              {dayContents}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const themeStyles = {
  backgroundColor: '#ffffff',
  calendarBackground: '#ffffff',
  textSectionTitleColor: '#b6c1cd',
  textSectionTitleDisabledColor: '#d9e1e8',
  selectedDayBackgroundColor: '#00adf5',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  arrowColor: 'orange',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: 'blue',
  indicatorColor: 'blue',
  textDayFontWeight: '300',
  textMonthFontWeight: 'bold',
  textDayHeaderFontWeight: '300',
  textDayFontSize: 16,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 16
};

const styles = StyleSheet.create({
  headerContainer: {
        paddingVertical: 20, // Adjust the padding as needed
        paddingHorizontal: 10, // Adjust the padding as needed
        alignItems: 'center', // Centers the text horizontally
        justifyContent: 'center', // Centers the text vertically
        // Additional styles to make it look more like the image can be added here
      },
headerText: {
        color: 'white', // Text color
        fontSize: 20, // Adjust the size as needed
        fontWeight: 'bold', // Makes the text bold
        textAlign: 'center', // Aligns the text to center
        // Additional text styles to make it look more like the image can be added here
      },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  arrow: {
    fontSize: 24,
    color: '#2d4150',
  },
  customDay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  day: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outfitIcon: {
    fontSize: 20,
  },
});

export default CalendarScreen;
