import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../src/axios';
import { Check, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const addExpense = createAsyncThunk(
  'expense/addExpense',
  async ({ form, year, month, navigate = null }) => {
    try {
      const res = await axios.post('/expense', form);
      showNotification({
        id: `addExpense-${getCurrentSeconds()}`,
        message: 'Expense added successfully',
        color: 'teal',
        icon: <Check />
      });
      if (navigate !== null) navigate(`/years/${year}/${month}`);
      return { expense: res.data.expense, errorMessage: '' };
    } catch (err) {
      showNotification({
        id: `addExpense-${getCurrentSeconds()}`,
        message: err.response.data.message || 'Error adding expense',
        color: 'red',
        icon: <X side={16} />
      });
      return { errorMessage: err.response.data.message, expense: null };
    }
  }
);
