import { useState } from 'react';
import Search from 'components/search/search';
import CurrentWeather, {
  CurrentWeatherProps,
} from 'components/current-weather/current-weather';
import Forecast, { ForecastProps } from 'components/forecast/forecast';
import './App.css';

export type SearchData = {
  value: string;
  label: string;
};

function App() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherProps>();
  const [forecast, setForecast] = useState<ForecastProps>();

  const handleOnSearchChange = (searchData: SearchData) => {
    const [lat, lon] = searchData.value.split(' ');

    const currentWeatherFetch = fetch(
      `https://${process.env.REACT_APP_OPENWEATHERMAP_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`,
    );

    const forecastFetch = fetch(
      `https://${process.env.REACT_APP_OPENWEATHERMAP_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`,
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather data={currentWeather} />
      <Forecast data={forecast} />
    </div>
  );
}

export default App;
