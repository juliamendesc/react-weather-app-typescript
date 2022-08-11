import { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { geoApiOptions } from 'api';
import { SearchData } from 'App';

const Search = ({ onSearchChange }: any) => {
  const [search, setSearch] = useState<SearchData>({ value: '', label: '' });

  const loadOptions = (inputValue: string) => {
    return fetch(
      `https://${process.env.REACT_APP_GEODB_CITIES_API_HOST}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions,
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city: any) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.country}`,
            };
          }),
        } as any;
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
