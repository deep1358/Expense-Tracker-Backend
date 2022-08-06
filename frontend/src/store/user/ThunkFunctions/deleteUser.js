import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../src/axios';
import { error } from './commonError';

export const deleteUser = createAsyncThunk('user/deleteUser', async () => {
  try {
    await axios.delete('/auth/user');
    return null;
  } catch (err) {
    return error(err);
  }
});
