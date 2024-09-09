import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  permissions: string[];
  lang: string;
}

const initialState: CounterState = {
  permissions: null,
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

// Action creators are generated for each case reducer function
export const { getPermissions, getLang } = commonSlice.actions;

export default commonSlice.reducer;
