import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useAxios from '../hooks/useAxios';

export const login = createAsyncThunk(
  'user/login',
  async (loginData: object) => {
    const response = await useAxios.get('account', {
      params: { loginData },
    });
    console.log('userSlice', response);
  },
);

interface UserState {
  status: string;
  isAuth: boolean;
  name: string;
  id: string;
  isHealthcare: boolean;
}

const initialState: UserState = {
  status: 'loading',
  isAuth: false,
  name: '',
  id: '',
  isHealthcare: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = 'loading';
      console.log('userSlice', 'loading');
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.status = 'success';
      console.log('userSlice', 'success');
      console.log('userSlice/success', payload);
    });
    builder.addCase(login.rejected, (state) => {
      state.status = 'failed';
      console.log('userSlice', 'failed');
    });
  },
});

export default userSlice.reducer;
