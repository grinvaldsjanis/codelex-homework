import axios from 'axios'
import type { JokeType } from '@/types'

const API_JOKES_URL = 'https://v2.jokeapi.dev'
const API_FAVS_URL = import.meta.env.VITE_APP_API_FAVS_URL || 'http://localhost:3004'

export async function fetchJokes(): Promise<JokeType[]> {
  const response = await axios.get(`${API_JOKES_URL}/joke/Any?safe-mode&amount=5`)
  return response.data.jokes
}

export async function fetchFavorites(): Promise<JokeType[]> {
  const response = await axios.get(`${API_FAVS_URL}/favorites`)
  return response.data
}

export async function addFavorite(joke: JokeType): Promise<JokeType> {
  const response = await axios.post(`${API_FAVS_URL}/favorites`, joke)
  const addedJoke = response.data
  return addedJoke
}

export async function fetchFavoriteIds(): Promise<number[]> {
  const response = await axios.get(`${API_FAVS_URL}/favorites`, {
    params: {
      fields: 'id'
    }
  })
  return response.data.favoriteIds
}


export async function removeFavorite(id: number): Promise<void> {
  try {
    await axios.delete(`${API_FAVS_URL}/favorites/${id}`)
  } catch (error) {
    console.error(`Error removing favorite joke ${id}: ${error}`)
    throw error
  }
}