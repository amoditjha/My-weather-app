import React, { useState } from 'react';
import { Cloud } from 'lucide-react';
import { Alert } from '@mui/material';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { DailyForecast } from './components/DailyForecast';
// import { WeatherMap } from './components/WeatherMap';
import { TemperatureChart } from './components/charts/TemperatureChart';
import { HumidityChart } from './components/charts/HumidityChart';
import { WeatherData, ForecastData } from './types/weather';
import { getWeatherByCity } from './services/weatherService';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const searchWeather = async (city: string) => {
    setLoading(true);
    setError('');
    
    const { weatherData, forecastData, error: weatherError } = await getWeatherByCity(city);
    
    if (weatherError) {
      setError(weatherError.message);
      setWeather(null);
      setForecast(null);
    } else if (weatherData && forecastData) {
      setWeather(weatherData);
      setForecast(forecastData);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-blue-600 to-blue-900 text-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Cloud className="text-accent w-12 h-12 mr-3" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white">
              Weather Dashboard
            </h1>
          </div>
          <SearchBar onSearch={searchWeather} />
        </div>

        <div className="flex flex-col items-center">
          {loading && (
            <div className="loading-spinner" />
          )}

          {error && (
            <Alert 
              severity="error" 
              className="w-full max-w-2xl mb-4 glass"
            >
              {error}
            </Alert>
          )}

          {weather && !loading && !error && (
            <>
              <WeatherCard data={weather} />
              {forecast && (
                <>
                  <DailyForecast forecasts={forecast.list} />
                  <TemperatureChart forecasts={forecast.list} />
                  <HumidityChart forecasts={forecast.list} />
                  {/* <WeatherMap lat={weather.coord.lat} lon={weather.coord.lon} /> */}
                </>
              )}
              <Footer />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
