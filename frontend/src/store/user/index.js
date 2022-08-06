import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { reducers } from './reducers';
import { extraReducers } from './extraReducers';

const slice = createSlice({
  name: 'user',
  initialState,
  reducers,
  extraReducers
});

export default slice.reducer;

export const { MakeUnAuthenticated } = slice.actions;
