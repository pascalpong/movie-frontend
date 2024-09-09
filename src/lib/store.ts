import { MovieService } from '@/services/movieService';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import commonSlice from './commonSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const makeStore = (): EnhancedStore => configureStore({
  reducer: {
    common: commonSlice,
    [MovieService.reducerPath]: MovieService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      MovieService.middleware,
    )
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const initializeListeners = () => {
    setupListeners(makeStore().dispatch);
};
