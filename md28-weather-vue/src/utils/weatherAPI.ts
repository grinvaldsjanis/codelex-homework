import axios from 'axios'
import type ForecastData from '@/types/ForecastData'

// const apiKey:string | undefined = process.env.VUE_APP_WEATHER_API_KEY
const apiKey = '...'

export const fetchWeatherData = async (latitude: number, longitude: number, unitType: string) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unitType}`
  const response = await axios.get(url)
  return response.data
}

export const searchLocations = async (query: string) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
  const response = await axios.get(url)
  return response.data
}

export const fetchForecastData = async (latitude: number, longitude: number, units: string) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`
  const response = await axios.get<ForecastData>(url)
  return response.data
}
