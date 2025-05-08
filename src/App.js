import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [count, setCount] = useState(0);
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    try {
      const apiKey = '90b0854ae6ad4b80f46e9f99c1ecdbea'; // Use your OpenWeatherMap key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      if (!response.ok) throw new Error('City not found');
      const data = await response.json();
      setWeather(data.main);
      setError('');
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>React Counter & Weather App</h1>

      <div className="counter">
        <h2>Counter</h2>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}> + </button>
        <button onClick={() => count > 0 && setCount(count - 1)}> - </button>
      </div>

      <div className="weather">
        <h2>Weather Checker</h2>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>

        {error && <p className="error-message">{error}</p>}

        {weather && (
          <div className="weather-info">
            <p>🌡️ Temperature: {weather.temp} °C</p>
            <p>💧 Humidity: {weather.humidity} %</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
