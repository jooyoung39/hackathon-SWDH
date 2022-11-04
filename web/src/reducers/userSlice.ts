import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserData, TokenData, UserInfoData } from '../types';

const initialState: UserData = {
  user_id: '',
  name: '',
  token: {
    accessToken: '',
    refreshToken: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.user_id = '';
      state.name = '';
      state.token.accessToken = '';
      state.token.refreshToken = '';
    },
    setToken: (state, action: PayloadAction<TokenData>) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfoData>) => {
      state.user_id = action.payload.user_id;
      state.name = action.payload.name;
    },
  },
});

export const { clearUserData, setToken, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
