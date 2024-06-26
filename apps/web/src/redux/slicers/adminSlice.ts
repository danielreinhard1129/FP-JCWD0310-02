import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/app/types/user.type';

interface IAdminSlice {
  warehouseId: number | undefined;
  warehouse: string | undefined;
}

const initialState: IAdminSlice = {
  warehouseId: undefined,
  warehouse: undefined,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLoginAction: (state, action: PayloadAction<IAdminSlice>) => {
      state.warehouseId = action.payload.warehouseId;
      state.warehouse = action.payload.warehouse;
    },
    adminLogoutAction: (state) => {
      state.warehouseId = undefined;
      state.warehouse = undefined;
    },
  },
});

export const { adminLoginAction, adminLogoutAction } = adminSlice.actions;
export default adminSlice.reducer;
