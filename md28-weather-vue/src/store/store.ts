import { defineStore } from 'pinia';

interface WeatherState {
  searchTerm: string;
  units: string;
  latitude: number | undefined;
  longitude: number | undefined;
}

export const useWeatherStore = defineStore({
  id: 'weather',
  state: (): WeatherState => ({
    searchTerm: '',
    units: 'metric',
    latitude: undefined,
    longitude: undefined,
  }),
  actions: {
    setSearchTerm(searchTerm: string): void {
      this.searchTerm = searchTerm;
    },
    setUnits(units: string): void {
      this.units = units;
    },
    setLocation(latitude: number | undefined, longitude: number | undefined): void {
      this.latitude = latitude;
      this.longitude = longitude;
    },
  },
});
