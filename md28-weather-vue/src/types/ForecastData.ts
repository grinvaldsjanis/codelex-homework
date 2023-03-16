import type ForecastItem from "./ForecastItem";

export default interface ForecastData {
    city: {
      name: string;
      country: string;
    };
    list: ForecastItem[];
  }