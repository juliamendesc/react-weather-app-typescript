export const geoApiOptions: any = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_GEODB_CITIES_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_GEODB_CITIES_API_HOST,
  },
};
