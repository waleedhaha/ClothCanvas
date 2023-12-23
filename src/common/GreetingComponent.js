import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const GreetingComponent = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const currentTime = new Date().getHours();

      // Set the greeting based on the time of day
      if (currentTime >= 5 && currentTime < 12) {
        setGreeting(" Good " + " morning");
      } else if (currentTime >= 12 && currentTime < 18) {
        setGreeting(" Good afternoon");
      } else {
        setGreeting(" Good " + " evening");
      }
    };

    // Update the greeting initially
    updateGreeting();

    // Update the greeting every minute (you can adjust the interval as needed)
    const intervalId = setInterval(updateGreeting, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that this effect runs only once on mount

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>{greeting}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingText: {
    fontSize: 36,
    fontWeight: "900",
  },
});

export default GreetingComponent;
