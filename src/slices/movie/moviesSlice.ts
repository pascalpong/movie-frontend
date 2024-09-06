import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies } from './moviesAPI';

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
  const response = await fetchMovies();
  return response;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      });
  },
});

export default moviesSlice.reducer;