import React from "react";
import {
  Thermometer,
  Wind,
  Droplets,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import { Paper, Grid, Typography, Box, Divider } from "@mui/material";
import { WeatherData } from "../types/weather";
import { WeatherStat } from "./WeatherStat";
import { FaTachometerAlt } from "react-icons/fa"; // FontAwesome tachometer for pressure
// import { FiTarget } from "react-icons/fi"; // Feather's target for a general measurement icon

interface WeatherCardProps {
  data: WeatherData;

}


export const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  let textColorcode = "#e9e9f0";
  return (
    <Paper
      elevation={3}
      className="weather-card glass-effect"
      sx={{
        p: 3,
        width: "100%",
        maxWidth: "800px",
        backgroundColor: "rgba(72, 172, 235, 0.07)",
        borderRadius: "16px",
        overflow: "hidden",
        filter: "drop-shadow(2px 2px 1px rgba(2, 2, 2, 0.31))"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{width:400}}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ color: `${textColorcode}`, fontWeight: "bold" }}
          >
            {data.name}, {data.sys.country}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: `${textColorcode}` }}>
            {data.weather[0].description}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
          <Box className="scaling-content"
            component="img"
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
            sx={{
              width: { xs: 60, sm: 80, md: 100 }, // Adjust image size based on screen size
              height: { xs: 60, sm: 80, md: 100 }, // Adjust height similarly
            }}
          />
          <Typography 
            variant="h2" 
            sx={{
              fontWeight: "bold",
              color: `${textColorcode}`,
              fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
            }}
          >
            {Math.round(data.main.temp)}°C
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }} className="stat-item">
        <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ArrowUp className="text-red-500 floating_content" size={24} />
            <Typography variant="h5" sx={{ color: `${textColorcode}` }}>
              {Math.round(data.main.temp_max)}°C
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <ArrowDown className="text-blue-300 floating_down" size={24} />
            <Typography variant="h5" sx={{ color: `${textColorcode}` }}>
              {Math.round(data.main.temp_min)}°C
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="subtitle2"
          sx={{ color: `${textColorcode}`, marginLeft: 4.6 }}
          gutterBottom
        >
          High/Low
        </Typography>
      </Box>

      <Divider 
        sx={{
          my: 5,
          opacity: 0.4,
          borderColor: `${textColorcode}`,
          borderWidth: 1,
          filter: "drop-shadow(2px 3px 1px rgba(2, 2, 2, 0.48))"
        }}
      />

      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          sm={6}
          className="stat-item "
          style={{ animationDelay: "0.1s" }}
        >
          <WeatherStat 
            icon={<Thermometer className="text-orange-500 scaling-content" size={28} />}
            value={
              <span style={{ color: textColorcode }}
              className={`text-md`}> {/* Styling the value */} {/* Styling the value */}
                {`${Math.round(data.main.feels_like)}°C`}
              </span>
            }
            label={
              <span style={{ color: textColorcode }} className="text-sm "> {/* Styling the label */}
                Feels Like
              </span>
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          className="stat-item"
          style={{ animationDelay: "0.2s" }}
        >
          <WeatherStat
            icon={<Wind className="text-blue-100 scaling-content" size={28} />}
            value={
              <span style={{ color: textColorcode }}
              className={`text-md`}> {/* Styling the value */}
                {`${data.wind.speed} m/s`}
              </span>
            }
            label={
              <span style={{ color: textColorcode }} className="text-sm "> {/* Styling the label */}
                Wind Speed
              </span>
            }

          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          className="stat-item"
          style={{ animationDelay: "0.3s" }}
        >
          <WeatherStat
            icon={<Droplets className="text-blue-300 scaling-content" size={28} />}
            value={
              <span style={{ color: textColorcode }}
              className={`text-md`}> {/* Styling the value */}
                {`${data.main.humidity}%`}
              </span>
            }
            label={
              <span style={{ color: textColorcode }} className="text-sm "> {/* Styling the label */}
                Humidity
              </span>
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          className="stat-item"
          style={{ animationDelay: "0.4s" }}
        >
          <WeatherStat
            icon={<FaTachometerAlt className="text-yellow-100 scaling-content" size={28} />}
            value={
              <span style={{ color: textColorcode }}
              className={`text-md`}> {/* Styling the value */}
                {`${data.main.pressure} hPa`}
              </span>
            }
            label={
              <span style={{ color: textColorcode }} className="text-sm "> {/* Styling the label */}
                Pressure
              </span>
            }
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
