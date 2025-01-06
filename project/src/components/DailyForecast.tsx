import React from 'react';
import { Paper, Typography, Box, Grid } from '@mui/material';
import { ForecastItem } from '../types/weather';
import { DAYS_OF_WEEK } from '../config/constants';

interface DailyForecastProps {
  forecast: ForecastItem;
}

const DailyForecastItem: React.FC<DailyForecastProps> = ({ forecast }) => {
  const date = new Date(forecast.dt * 1000);
  const dayName = DAYS_OF_WEEK[date.getDay()];
  let textColorcode = "#e9e9f0";
  return (
    <Box className="forecast-item glass-effect" sx={{ 
      textAlign: 'center', 
      p: 2,
      borderRadius: '12px',
      height: '100%'
    }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: `${textColorcode}` }}>
        {dayName}
      </Typography>
      <Box className="scaling-content"
        component="img"
        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
        alt={forecast.weather[0].description}
        sx={{ 
          width: 50, 
          height: 50, 
          margin: '0.5rem auto',
        }}
      />
      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
        <span style={{ color: '#d32f2f' }}>{Math.round(forecast.main.temp_max)}°</span>
        {' / '}
        <span style={{ color: '#93C5FD' }}>{Math.round(forecast.main.temp_min)}°</span>
      </Typography>
      <Typography variant="caption" sx={{  color: `${textColorcode}`, display: 'block', mt: 1 }}>
        {forecast.weather[0].description}
      </Typography>
    </Box>
  );
};

interface ForecastListProps {
  forecasts: ForecastItem[];
}

const getDailyForecasts = (forecasts: ForecastItem[]): ForecastItem[] => {
  const dailyForecasts: ForecastItem[] = [];
  const seenDates = new Set();

  for (const forecast of forecasts) {
    const date = new Date(forecast.dt * 1000).toDateString();
    if (!seenDates.has(date)) {
      seenDates.add(date);
      dailyForecasts.push(forecast);
    }
  }

  return dailyForecasts.slice(1, 6);
};

export const DailyForecast: React.FC<ForecastListProps> = ({ forecasts }) => {
  const dailyForecasts = getDailyForecasts(forecasts);
  let textColorcode = "#e9e9f0";

  return (
    <Paper 
      elevation={3}
      className="weather-card glass-effect"
      sx={{
        p: 3,
        mt: 3,
        width: '100%',
        maxWidth: '800px',
        backgroundColor: "rgba(72, 172, 235, 0.07)",
        borderRadius: '16px',
       filter: "drop-shadow(2px 2px 1px rgba(2, 2, 2, 0.31))"
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          pl: 1, 
          color: `${textColorcode}`,
          fontWeight: 'bold'
        }}
      >
        5-Day Forecast
      </Typography>
      <Grid container spacing={2}>
        {dailyForecasts.map((forecast, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md 
            key={forecast.dt}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <DailyForecastItem forecast={forecast} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};