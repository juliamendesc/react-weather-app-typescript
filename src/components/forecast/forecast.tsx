import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'components/forecast/forecast.css';

export type ForecastProps = {
  data: {
    city: string;
    list: {
      dt: number;
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
    }[];
  };
};

const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const Forecast = ({ data }: any) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek),
  );

  return (
    data && (
      <>
        <label className="forecast-label">Daily Forecast</label>
        <Accordion allowZeroExpanded>
          {data.list.splice(0, 7).map((item: any, index: number) => (
            <AccordionItem key={item.dt}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <img
                      alt="weather"
                      className="icon-small"
                      src={`icons/${item.weather[0].icon}.png`}
                    />
                    <label className="day-label">{forecastDays[index]}</label>
                    <label className="description-label">
                      {item.weather[0].description}
                    </label>
                    <label className="temperature-label">
                      Min: {Math.round(item.main.temp_min)}º C / Max:{' '}
                      {Math.round(item.main.temp_max)}º C
                    </label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Pressure</label>
                    <label>{item.main.pressure} hPa</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity</label>
                    <label>{item.main.humidity}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Clouds</label>
                    <label>{item.clouds.all}%</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Wind</label>
                    <label>{item.wind.speed} m/s</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Sea Level</label>
                    <label>{item.main.sea_level} m</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Feels like</label>
                    <label>{Math.round(item.main.feels_like)}º C</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </>
    )
  );
};

export default Forecast;
