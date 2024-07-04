import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import { User } from '@/app/types/user.type';

const initialState: Pick<User, 'id' | 'email' | 'role' | 'isVerify'> = {
  id: 0,
  email: '',
  role: '',
  isVerify: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isVerify = action.payload.isVerify;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.email = '';
      state.role = '';
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
