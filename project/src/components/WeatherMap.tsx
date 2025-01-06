import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Paper, Alert } from '@mui/material';
import { MAPBOX_TOKEN } from '../config/constants';

interface WeatherMapProps {
  lat: number;
  lon: number;
}

export const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!mapContainer.current) return;

    // Validate coordinates
    if (!isFinite(lat) || !isFinite(lon) || 
        lat < -90 || lat > 90 || lon < -180 || lon > 180) {
      setError('Invalid coordinates provided');
      return;
    }

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12', // Using streets style instead of dark
        center: [lon, lat],
        zoom: 10,
        attributionControl: true
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add marker
      new mapboxgl.Marker({
        color: '#FF0000',
        scale: 0.8
      })
        .setLngLat([lon, lat])
        .addTo(map.current);

      // Handle load errors
      map.current.on('error', () => {
        setError('Error loading map. Please try again later.');
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Unable to initialize map');
    }

    return () => {
      map.current?.remove();
    };
  }, [lat, lon]);

  return (
    <Paper 
      elevation={3}
      className="glass-effect"
      sx={{ 
        mt: 3,
        width: '100%',
        maxWidth: '800px',
        height: '300px',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {error ? (
        <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
      ) : (
        <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      )}
    </Paper>
  );
};