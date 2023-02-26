import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createAction } from "@reduxjs/toolkit";

type Animal = {
  id: string;
  name: string;
  species: string;
  imageUrl: string;
};

type AnimalPost = {
    name: string;
    species: string;
    imageUrl: string;
};

type AnimalSpecies = {
  species: string;
};

export const setAnimals = createAction<Animal[]>("setAnimals");
export const setSelectedSpecies = createAction<string>("setSelectedSpecies");

export const animalsApiSlice = createApi({
  reducerPath: "animalsApiSlice",
  tagTypes: ["animals"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3004/" }),
  endpoints: (build) => ({

    getAllAnimals: build.query<Animal[], void>({
      query: () => `http://localhost:3004/animals`,
      providesTags: ["animals"],
      transformResponse: (response: Animal[]) => {
        setAnimals(response);
        return response;
      },
    }),

    deleteAnimal: build.mutation<void, string>({
      query: (id) => ({
        url: `animals/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }),
      invalidatesTags: ["animals"],
    }),
    
    addAnimal: build.mutation<void, AnimalPost>({
      query: (animal) => ({
        url: "/animals",
        method: "POST",
        body: animal,
      }),
      invalidatesTags: ["animals"],
    }),

    getAnimalSpecies: build.query<AnimalSpecies[], void>({
      query: () => `http://localhost:3004/animals?_sort=species&_fields=species&_distinct=species`,
      providesTags: (result) =>
        result?.map(({ species }) => ({ type: "animals", id: species })) || [],
    }),

    getAnimalsBySpecies: build.query<Animal[], string>({
      query: (species) => `http://localhost:3004/animals?species=${species}`,
      providesTags: (result, error, species) => [{ type: "animals", id: species }],
    }),
  }),
});

export const {
  useGetAllAnimalsQuery,
  useDeleteAnimalMutation,
  useAddAnimalMutation,
  useGetAnimalSpeciesQuery,
  useGetAnimalsBySpeciesQuery,
} = animalsApiSlice;

export default animalsApiSlice.reducer;
