import axios from 'axios';
import { WEATHER_API_URL, FORECAST_API_URL, API_KEY } from '../config/constants';
import { WeatherData, ForecastData } from '../types/weather';

interface WeatherError {
  message: string;
  status?: number;
}

export const getWeatherByCity = async (city: string): Promise<{ 
  weatherData?: WeatherData; 
  forecastData?: ForecastData;
  error?: WeatherError;
}> => {
  try {
    // Get current weather
    const weatherResponse = await axios.get(WEATHER_API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    // Get 5-day forecast
    const forecastResponse = await axios.get(FORECAST_API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return { 
      weatherData: weatherResponse.data,
      forecastData: forecastResponse.data
    };
  } catch (error: any) {
    return {
      error: {
        message: error.response?.status === 404
          ? 'City not found. Please check the spelling and try again.'
          : 'An error occurred while fetching weather data. Please try again.',
        status: error.response?.status
      }
    };
  }
};