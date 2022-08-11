import 'components/current-weather/current-weather.css';

export type CurrentWeatherProps = {
  data: {
    city: string;
    weather: {
      description: string;
      icon: string;
    }[];
    main: {
      temp: number;
      feels_like: number;
      pressure: number;
      humidity: number;
      sea_level: number;
    };
    wind: {
      speed: number;
    };
  };
};

const CurrentWeather = ({ data }: any) => {
  return (
    data && (
      <div className="current-weather">
        <div className="current-weather__header">
          <div>
            <p className="city-name">{data.city}</p>
            <p className="weather-description">{data.weather[0].description}</p>
          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>
        <div className="current-weather__body">
          <p className="current-temperature">{Math.round(data.main.temp)}ºC</p>
          <div className="current-temperature-details">
            <div className="parameter-row">
              <span className="parameter-label">Details</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(data.main.feels_like)}º C
              </span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.wind.speed} m/s</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CurrentWeather;
