import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import commonSlice from "./commonSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { MovieService } from "@/services/movieService";
import { topFilmService } from "@/services/topFilmService";

import { AuthService } from "@/services/authService";
import { uploadService } from "@/services/upload-image";
import { bannerService } from "@/services/bannerService";
import { announcementService } from "@/services/announcementService";

export const makeStore = (): EnhancedStore =>
  configureStore({
    reducer: {
      common: commonSlice,
      [MovieService.reducerPath]: MovieService.reducer,
      [topFilmService.reducerPath]: topFilmService.reducer,
      [AuthService.reducerPath]: AuthService.reducer,
      [uploadService.reducerPath]: uploadService.reducer,
      [bannerService.reducerPath]: bannerService.reducer,
      [announcementService.reducerPath]: announcementService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        MovieService.middleware,
        topFilmService.middleware,
        AuthService.middleware,
        uploadService.middleware,
        bannerService.middleware,
        announcementService.middleware
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const initializeListeners = () => {
  setupListeners(makeStore().dispatch);
};
