import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TemperatureChartProps {
  forecasts: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
  }>;
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ forecasts }) => {
  const data = {
    labels: forecasts.map(f => {
      const date = new Date(f.dt * 1000);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }),
    datasets: [
      {
        label: 'Temperature',
        data: forecasts.map(f => f.main.temp),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Max Temperature',
        data: forecasts.map(f => f.main.temp_max),
        borderColor: 'rgba(255, 99, 132, 0.8)',
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      },
      {
        label: 'Min Temperature',
        data: forecasts.map(f => f.main.temp_min),
        borderColor: 'rgba(54, 162, 235, 0.8)',
        borderDash: [5, 5],
        tension: 0.4,
        fill: false,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature (°C)'
        }
      }
    }
  };

  return (
    <Paper 
      elevation={3}
      className="glass-effect"
      sx={{
        p: 3,
        mt: 3,
        width: '100%',
        maxWidth: '800px',
        borderRadius: '16px'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ mb: 2, color: '#1a237e', fontWeight: 'bold' }}
      >
        Temperature Forecast
      </Typography>
      <Line data={data} options={options} />
    </Paper>
  );
};