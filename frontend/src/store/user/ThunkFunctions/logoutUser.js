import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../src/axios';
import { error } from './commonError';
import { Check } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const logoutUser = createAsyncThunk('user/logoutUser', async (navigate) => {
  try {
    await axios.post('/auth/logout');
    showNotification({
      id: `logout-${getCurrentSeconds()}`,
      message: 'You have been logged out',
      color: 'teal',
      icon: <Check />
    });
    navigate('/login');
    return null;
  } catch (err) {
    return error(err);
  }
});
