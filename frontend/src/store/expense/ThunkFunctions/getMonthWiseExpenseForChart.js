import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';

export const getMonthWiseExpenseForChart = createAsyncThunk(
  'expense/getMonthWiseExpenseForChart',
  async ([year, day, category]) => {
    try {
      const res = await axios.get(
        `/expense/chart/month?year=${year}&day=${day}&category=${category}`
      );
      return { expenses: res.data, errorMessage: '' };
    } catch (err) {
      return { errorMessage: err.response.data.message, expense: null };
    }
  }
);
