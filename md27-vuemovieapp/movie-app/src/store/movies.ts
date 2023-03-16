import axios from 'axios'
import { defineStore } from 'pinia'
import type {MovieType} from '@/types'

const API_URL = 'https://www.omdbapi.com/'
const API_KEY = '15f9abbe'

export const useMoviesStore = defineStore('movies', {
  state: () => {
    return {
      movies: [] as MovieType[],
      movie: {} as MovieType,
      isLoading: false,
      totalResults: 0,
      loadingMessage: 'Please wait',
      page: 1
    }
  },
  
  actions: {
    async getAllMovies(keyword: string) {
      this.isLoading = true;
      this.loadingMessage = "Please wait";

      if (!keyword) {
        keyword = "One Piece";
      }
    
      try {
        const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${keyword}`);
        if (data.Response == "False") {
          throw new Error(data.Error);
        }
        [this.totalResults, this.movies, this.isLoading, this.page] = [data.totalResults, data.Search, false, 1];
      } catch (err) {
        ;[this.isLoading, this.loadingMessage] = [true, (err as Error).message]
      }
    },
    
    async nextPage(page: number) {
      const keyword = localStorage.getItem('keyword')
        ? localStorage.getItem('keyword')
        : 'One Piece'
      this.isLoading = true
      this.loadingMessage = 'Please wait'
      try {
        const { data } = await axios.get(`${API_URL}?apikey=${API_KEY}&s=${keyword}&page=${page}`)

        if (data.Response == 'False') {
          throw new Error(data.Error)
        }

        this.isLoading = false
        data.Search.forEach((movie: MovieType) => this.movies.push(movie))
      } catch (error) {}
    },

    async getMovieByID(id: string) {
      this.isLoading = true
      try {
        const { data, status } = await axios.get(`${API_URL}?apikey=${API_KEY}&i=${id}`)
        if (status != 200) {
          throw new Error(data.Error)
        }
        ;[this.movie, this.isLoading] = [data, false]
      } catch (err) {
        console.log(err)
      }
    }
  }
})
