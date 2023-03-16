<template>
  <div class="four-day-forecast">
    <div class="top-info">
      <div class="location">
        <h2>{{ city }}, {{ country }}</h2>
        <p>{{ dateTime }}</p>
      </div>
      <div>
        <router-link class="button" to="/">Current weather</router-link>
      </div>
    </div>
    <div class="weather">
        <div class="forecast-day" v-for="forecast in forecasts" :key="forecast.date">
          <div class="forecast-time">
            <span>{{ forecast.date }}</span>
            <span>{{ forecast.time }}</span>
          </div>
          <img :src="forecast.weather.icon" :alt="forecast.weather.description" />
          <h3 class="temperature">
            {{ forecast.main.temp_min }}&deg;/{{ forecast.main.temp_max }}&deg;{{ tempUnit }}
          </h3>
          <p>{{ forecast.weather.description }}</p>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useWeatherStore } from '@/store/store'
import { clientGeolocation } from '@/utils/clientGeolocation'
import { fetchForecastData } from '@/utils/weatherAPI'
import type ForecastData from '@/types/ForecastData'

export default {
  name: 'Forecast',
  setup() {
    const weatherStore = useWeatherStore()
    const city = ref('')
    const country = ref('')
    const dateTime = ref('')
    const forecasts = ref<
      {
        date: string
        time: string
        main: { temp_min: number; temp_max: number }
        weather: { description: string; icon: string }
      }[]
    >([])

    const tempUnit = computed(() => {
      if (weatherStore.units === 'metric') {
        return 'C'
      } else {
        return 'F'
      }
    })

    const getLocationForecastData = async () => {
      try {
        let latitude, longitude, units
        if (weatherStore.latitude && weatherStore.longitude) {
          latitude = weatherStore.latitude
          longitude = weatherStore.longitude
          units = weatherStore.units
        } else {
          const location = await clientGeolocation()
          latitude = location.latitude
          longitude = location.longitude
          units = weatherStore.units
        }

        const forecastData: ForecastData = await fetchForecastData(latitude, longitude, units)

        weatherStore.latitude = latitude
        weatherStore.longitude = longitude

        city.value = forecastData.city.name
        country.value = forecastData.city.country

        dateTime.value = new Date().toLocaleString()

        // Process forecast data
       
        forecasts.value = forecastData.list.slice(0, 15).map((forecastItem) => ({
          date: new Date(forecastItem.dt * 1000).toLocaleDateString(),
          time: new Date(forecastItem.dt * 1000).toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true
          }),
          main: {
            temp_min: Math.round(forecastItem.main.temp_min),
            temp_max: Math.round(forecastItem.main.temp_max)
          },
          weather: {
            description: forecastItem.weather[0].description,
            icon: `http://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`
          }
        }))
      } catch (error) {
        console.error(error)
      }
    }

    const fetchLocalWeather = async () => {
      try {
        const { latitude, longitude } = await clientGeolocation()
        weatherStore.setLocation(latitude, longitude)
        getLocationForecastData()
      } catch (error) {
        console.error(error)
      }
    }

    const hasLocationData = computed(
      () => weatherStore.latitude !== undefined && weatherStore.longitude !== undefined
    )

    onMounted(() => {
      if (hasLocationData.value) {
        getLocationForecastData()
      } else {
        fetchLocalWeather()
      }

      watch(
        weatherStore,
        (state) => {
          getLocationForecastData()
        },
        { deep: true }
      )
    })

    return {
      city,
      country,
      dateTime,
      forecasts,
      tempUnit
    }
  }
}
</script>

<style scoped>
.weather {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: auto;
  margin-top: 2rem;
  justify-items: center;
  gap: 1rem;
}

.top-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.forecast-day {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 200px;

  border-radius: 1rem;
  background-color: #c1dbf0;
}
.forecast-time {
  display: flex;
  font-weight: 500;
  width: 100%;
  justify-content: space-between;
}

.temperature {
  font-weight: 600;
}
</style>
