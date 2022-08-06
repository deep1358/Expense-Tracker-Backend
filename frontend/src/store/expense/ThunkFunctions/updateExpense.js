import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../src/axios';
import { Check, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const updateExpense = createAsyncThunk(
  'expense/updateExpense',
  async ({ form, year, month, id, navigate }) => {
    try {
      await axios.patch('/expense', {
        category: form.category,
        amount: form.amount,
        note: form.note,
        _id: id
      });
      showNotification({
        id: `updateExpense-${getCurrentSeconds()}`,
        message: 'Expense updated successfully',
        color: 'teal',
        icon: <Check />
      });
      navigate(`/years/${year}/${month}`);
      return { errorMessage: '', id };
    } catch (err) {
      showNotification({
        id: `updateExpense-${getCurrentSeconds()}`,
        message: err.response.data.message || 'Error updating expense',
        color: 'red',
        icon: <X side={16} />
      });
      return { errorMessage: err.response.data.message };
    }
  }
);
