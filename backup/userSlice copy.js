import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    name: "",
    id: "",
    isHealthcare: false,
  },
  reducers: {
    loginUser: (state, action) => {
      state.isLogin = true;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.isHealthcare = action.payload.isHealthcare;

      return state;
    },
    clearUser: (state) => {
      state.isLogin = false;
      state.name = "";
      state.id = "";
      state.isHealthcare = false;

      return state;
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
