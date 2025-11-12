import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';


function WeatherCard () {

    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Fetch weather data on component mount
        fetchWeatherData();
    }, []);

    const fetchWeatherData = async() => {
        console.log("fetching weather data...");
        try {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=33.896151&longitude=35.483930&current=temperature_2m,relative_humidity_2m,wind_speed_10m");
            const result = await response.json();
            console.log(result);
            setWeather(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            
        }
    
    }



   if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  if (!weather || !weather.current) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.centerText}>
            Weather data not available
          </Text>
        </Card.Content>
      </Card>
    );
  }

  const { temperature_2m, relative_humidity_2m, wind_speed_10m } = weather.current;

  return (
    <Card style={styles.card} elevation={3}>
      <Card.Title
        title="Current Weather"
        left={(props) => (
          <MaterialCommunityIcons {...props} name="weather-partly-cloudy" size={28} color="#007AFF" />
        )}
      />
      <Card.Content>
        <View style={styles.row}>
          <MaterialCommunityIcons name="thermometer" size={22} color="#E53935" />
          <Text style={styles.value}>{temperature_2m}°C</Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="water-percent" size={22} color="#039BE5" />
          <Text style={styles.value}>{relative_humidity_2m}% Humidity</Text>
        </View>

        <View style={styles.row}>
          <MaterialCommunityIcons name="weather-windy" size={22} color="#009688" />
          <Text style={styles.value}>{wind_speed_10m} km/h Wind</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  centerText: {
    textAlign: 'center',
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  value: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});