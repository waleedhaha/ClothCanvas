import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CurrentDateComponent = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Function to update the current date
    const updateCurrentDate = () => {
      const now = new Date();

      // Format the date as "Sunday, November 12"
      const formattedDate = `${getDayName(now)}, ${getMonthName(now)} ${now.getDate()}`;

      setCurrentDate(formattedDate);
    };

    // Function to get the day name (e.g., "Sunday")
    const getDayName = (date) => {
      const days = ['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'];
      return days[date.getDay()];
    };

    // Function to get the month name (e.g., "November")
    const getMonthName = (date) => {
      const months = [
        'JAN', 'FEB', 'MAR', 'APR',
        'MAY', 'JUNE', 'JULY', 'AUG',
        'SEP', 'OCT', 'NOV', 'DEC'
      ];
      return months[date.getMonth()];
    };

    // Update the current date initially
    updateCurrentDate();

    // Update the current date every second (you can adjust the interval as needed)
    const intervalId = setInterval(updateCurrentDate, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  return (
    <View style={styles.container}>
     
      <Text style={styles.dateText}>{currentDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CurrentDateComponent;
