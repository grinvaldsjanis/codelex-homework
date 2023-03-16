export default interface ForecastItem {
    dt: number;
    sunrise: number;
    sunset: number;
    main: {
      temp_min: number;
      temp_max: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    weather: {
      main: string;
      description: string;
      icon: string;
    }[];
    speed: number;
    deg: number;
    gust: number;
    clouds: number;
    pop: number;
    rain?: number;
  }