// api.js

export const getWeatherData = async () => {
    try {
      const apiKey = 'your-api-key'; // Replace with your actual API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${apiKey}`;
  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
  
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      throw error;
    }
  };
  