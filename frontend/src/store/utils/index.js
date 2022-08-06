import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { reducers } from './reducers';

const slice = createSlice({
  name: 'utils',
  initialState,
  reducers
});

export default slice.reducer;

export const { toggleLoadingOverlay } = slice.actions;
