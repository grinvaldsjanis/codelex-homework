import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { animalsApiSlice } from "./animalsApiSlice";
import animalsSlice from "./animalsApiSlice";

export const store = configureStore({
  reducer: {
    animals: animalsSlice,
    [animalsApiSlice.reducerPath]: animalsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animalsApiSlice.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
