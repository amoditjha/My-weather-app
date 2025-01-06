import React, { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

interface WeatherStatProps {
  icon: React.ReactNode; // Allow any JSX for the icon
  value: string | React.ReactNode; // Allow either a string or an element for value
  label: string | React.ReactNode;
  primary?: boolean;
}

export const WeatherStat: React.FC<WeatherStatProps> = ({ icon, value, label, primary }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {icon}
      <Box>
        <Typography 
          variant={primary ? "h4" : "h5"} 
          component="p" 
          sx={{ fontWeight: primary ? 'bold' : 'medium' }}
        >
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Box>
  );
};