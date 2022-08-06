import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../src/axios';
import { error } from './commonError';
import { Check, X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const updateCategory = createAsyncThunk(
  'user/updateCategory',
  async ([oldValue, newValue, setModalOpened]) => {
    try {
      const res = await axios.patch('/category', {
        oldValue,
        newValue
      });
      setModalOpened(false);
      showNotification({
        id: `updateCategory-${getCurrentSeconds()}`,
        message: 'Category updated successfully',
        color: 'teal',
        icon: <Check />
      });
      return res.data.categories;
    } catch (err) {
      showNotification({
        id: `updateCategory-${getCurrentSeconds()}`,
        message: err.response.data.message || 'Error updating category',
        color: 'red',
        icon: <X side={16} />
      });
      return error(err);
    }
  }
);
