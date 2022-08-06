import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../src/axios';
import { X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const getExpenses = createAsyncThunk('expense/getExpenses', async ([year, month]) => {
  try {
    const res = await axios.get(`/expense/year/${year}/${month}`);
    return { expenses: res.data, errorMessage: '' };
  } catch (err) {
    showNotification({
      id: `getExpenses-${getCurrentSeconds()}`,
      message: err.response.data.message || 'Error getting expenses',
      color: 'red',
      icon: <X side={16} />
    });
    return { errorMessage: err.response.data.message, expense: null };
  }
});
