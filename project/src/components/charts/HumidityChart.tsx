import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface HumidityChartProps {
  forecasts: Array<{
    dt: number;
    main: {
      humidity: number;
    };
  }>;
}

export const HumidityChart: React.FC<HumidityChartProps> = ({ forecasts }) => {
  const data = {
    labels: forecasts.map(f => {
      const date = new Date(f.dt * 1000);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }),
    datasets: [
      {
        label: 'Humidity',
        data: forecasts.map(f => f.main.humidity),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
    ],
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
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Humidity (%)'
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
        Humidity Forecast
      </Typography>
      <Bar data={data} options={options} />
    </Paper>
  );
};