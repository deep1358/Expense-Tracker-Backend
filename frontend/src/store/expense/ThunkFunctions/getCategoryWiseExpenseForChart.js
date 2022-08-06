import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';

export const getCategoryWiseExpenseForChart = createAsyncThunk(
  'expense/getCategoryWiseExpenseForChart',
  async ([year, month, day]) => {
    try {
      const res = await axios.get(`/expense/chart/category?year=${year}&month=${month}&day=${day}`);
      return { expenses: res.data, errorMessage: '' };
    } catch (err) {
      return { errorMessage: err.response.data.message, expense: null };
    }
  }
);
