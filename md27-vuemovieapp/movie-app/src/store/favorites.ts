import { defineStore } from 'pinia'
import axios from 'axios'
import type { MovieType } from '@/types'

const API_URL = 'https://www.omdbapi.com/'
const API_KEY = '15f9abbe'

export const useFavoritStore = defineStore('favorit', {
  state: () => {
    return {
      favMovies: JSON.parse(localStorage.getItem('favMovies') || '[]')
    }
  },
  actions: {
    addToFavorit(id: string) {
      axios
        .get(`${API_URL}?apikey=${API_KEY}&i=${id}`)
        .then((res) => {
          const { data } = res
          const movie: MovieType = {
            imdbID: data.imdbID,
            Title: data.Title,
            Poster: data.Poster,
            Year: data.Year,
            Released: '',
            Genre: '',
            Director: '',
            Writer: '',
            Actors: '',
            Plot: '',
            Language: '',
            Country: '',
            Awards: '',
            imdbRating: 0,
            Rated: '',
            BoxOffice: '',
            imdbVotes: 0,
            Runtime: 0
          }
          this.favMovies.push(movie)
          localStorage.setItem('favMovies', JSON.stringify(this.favMovies))
        })
        .catch((err) => console.log(err))
    },
    removeFromFav(id: string) {
      this.favMovies = this.favMovies.filter((movie: { imdbID: string }) => movie.imdbID !== id)
      localStorage.setItem('favMovies', JSON.stringify(this.favMovies))
    }
  }
})
