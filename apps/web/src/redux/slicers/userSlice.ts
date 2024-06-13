import { User } from '@/app/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Pick<User, 'id' | 'email' | 'role'> = {
  id: 0,

  email: '',
  role: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;

      state.email = action.payload.email;
      state.role = action.payload.role;
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
