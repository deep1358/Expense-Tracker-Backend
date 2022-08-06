import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';

export const getYearWiseExpenseForChart = createAsyncThunk(
  'expense/getYearWiseExpenseForChart',
  async ([month, day, category]) => {
    try {
      const res = await axios.get(
        `/expense/chart/year?month=${month}&day=${day}&category=${category}`
      );
      return { expenses: res.data, errorMessage: '' };
    } catch (err) {
      return { errorMessage: err.response.data.message, expense: null };
    }
  }
);
