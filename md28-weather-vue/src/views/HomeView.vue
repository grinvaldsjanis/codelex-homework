<template>
  <div class="wrapper">
    <div class="home-view">
      <div class="location">
        <p>Current weather in</p>
        <h1>{{ city }}, {{ country }}</h1>
        <p>{{ dateTime }}</p>
      </div>
      <div class="general-weather">
        <h3 class="temperature">{{ temperature }}&deg;{{ tempUnit }}</h3>
        <h3 class="description">{{ description }}</h3>
        <div class="icon-box"><img class="icon" :src="iconUrl" :alt="description" /></div>
      </div>
      <div class="other-data">
        <div class="wind">
          <div class="windArrow-box">
            <WindArrow class="windArrow" :style="{ transform: `rotate(${wDirection}deg)` }" />
          </div>
          <p>Wind: {{ wSpeed }} {{ speedUnit }}</p>
        </div>
        <p>Visibility: {{ visibility }} m</p>
        <p>Clouds: {{ clouds }} %</p>
      </div>
      <div></div>
    </div>
    <div class="button-box">
      <router-link class="button" to="/forecast">Forecast</router-link>
      <button class="button" v-if="hasLocationData" @click="fetchLocalWeather">Weather here</button>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useWeatherStore } from '@/store/store'
import { fetchWeatherData } from '@/utils/weatherAPI'
import { clientGeolocation } from '@/utils/clientGeolocation'
import WindArrow from '@/components/icons/windArrow.vue'

export default {
  name: 'HomeView',
  components: {
    WindArrow
  },
  setup() {
    const weatherStore = useWeatherStore()
    const city = ref('')
    const country = ref('')
    const dateTime = ref('')
    const temperature = ref(0)
    const description = ref('')
    const iconUrl = ref('')
    const humidity = ref('')
    const pressure = ref('')
    const wSpeed = ref(0)
    const wDirection = ref(0)
    const visibility = ref(0)
    const clouds = ref(0)

    const tempUnit = computed(() => {
      if (weatherStore.units === 'metric') {
        return 'C'
      } else {
        return 'F'
      }
    })

    const speedUnit = computed(() => {
      if (weatherStore.units === 'metric') {
        return 'm/s'
      } else {
        return 'mph'
      }
    })

    const getLocationWeatherData = async () => {
      try {
        const { latitude, longitude, units } = weatherStore
        const weatherData = await fetchWeatherData(latitude!, longitude!, units)

        city.value = weatherData.name
        country.value = weatherData.sys.country
        dateTime.value = new Date(weatherData.dt * 1000).toLocaleString()
        temperature.value = Math.round(weatherData.main.temp)
        description.value = weatherData.weather[0].description
        iconUrl.value = `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
        humidity.value = weatherData.main.humidity
        pressure.value = weatherData.main.grnd_level
        wSpeed.value = Math.round(weatherData.wind.speed)
        wDirection.value = weatherData.wind.deg
        visibility.value = weatherData.visibility
        clouds.value = weatherData.clouds.all
      } catch (error) {
        console.error(error)
      }
    }

    const fetchLocalWeather = async () => {
      try {
        const { latitude, longitude } = await clientGeolocation()
        weatherStore.setLocation(latitude, longitude)
        getLocationWeatherData()
      } catch (error) {
        console.error(error)
      }
    }

    const hasLocationData = ref(
      weatherStore.latitude !== undefined && weatherStore.longitude !== undefined
    )

    onMounted(() => {
      if (hasLocationData.value) {
        getLocationWeatherData()
      } else {
        fetchLocalWeather()
      }

      watch(
        weatherStore,
        () => {
          getLocationWeatherData()
        },
        { deep: true }
      )
    })

    return {
      city,
      country,
      dateTime,
      temperature,
      description,
      iconUrl,
      tempUnit,
      speedUnit,
      fetchLocalWeather,
      hasLocationData,
      wSpeed,
      wDirection,
      visibility,
      clouds
    }
  }
}
</script>
<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  padding: 1rem 3rem;
  background-color: #c1dbf0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.location {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

.general-weather {
  display: grid;
  grid-auto-columns: 33%;
  grid-auto-flow: column;
  align-items: center;
  width: 100%;
  height: 4rem;
}
.icon-box {
  text-align: right;
  width: 100%;
  max-height: 100%;
}

.icon {
  object-fit: contain;
}
.wind {
  display: flex;
  gap: .5rem;
}
.windArrow-box {
  width: 1.3rem;
  height: 1.3rem;
}

.description {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 4rem;
}
.windArrow {
  max-width: 100%;
  max-height: 100%;
}

.other-data {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
}

.button-box {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>
