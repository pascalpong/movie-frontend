import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  permissions: string[];
  lang: string;
}

const initialState: CounterState = {
  permissions: [],
  lang: ''
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    getPermissions: (state, action) => ({
      ...state,
      permissions: action.payload
    }),
    getLang: (state, action) => ({
      ...state,
      lang: action.payload
    })
  }
});

export const { getPermissions, getLang } = commonSlice.actions;

export default commonSlice.reducer;
