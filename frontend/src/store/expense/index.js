import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { reducers } from './reducers';
import { extraReducers } from './extraReducers';

const slice = createSlice({
  name: 'expense',
  initialState,
  reducers,
  extraReducers
});

export default slice.reducer;

export const { setCurrentYear, setCurrentMonth, setFocusedExpense } = slice.actions;
