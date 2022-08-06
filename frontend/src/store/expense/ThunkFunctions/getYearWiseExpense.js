import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../axios';

export const getYearWiseExpense = createAsyncThunk('expense/getYearWiseExpense', async () => {
  try {
    const res = await axios.get(`/expense/year`);
    return { expenses: res.data, errorMessage: '' };
  } catch (err) {
    return {
      errorMessage: err.response.data.message,
      yearWiseExpenses: null
    };
  }
});
