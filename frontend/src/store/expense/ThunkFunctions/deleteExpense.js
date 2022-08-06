import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../src/axios';
import { Check, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const deleteExpense = createAsyncThunk(
  'expense/deleteExpense',
  async ([id, setDeleteModalOpened]) => {
    try {
      await axios.delete(`expense/${id}`);
      showNotification({
        id: `deleteExpense-${getCurrentSeconds()}`,
        message: 'Expense deleted successfully',
        color: 'teal',
        icon: <Check />
      });
      setDeleteModalOpened(false);
      return { errorMessage: '', id };
    } catch (err) {
      showNotification({
        id: `deleteExpense-${getCurrentSeconds()}`,
        message: err.response.data.message || 'Error deleting expense',
        color: 'red',
        icon: <X side={16} />
      });
      setDeleteModalOpened(false);
      return { errorMessage: err.response.data.message };
    }
  }
);
