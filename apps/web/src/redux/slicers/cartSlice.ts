// import { Cart } from '@/typess/cart.type';
// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';

// interface CartState {
//   cartItems: Cart[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CartState = {
//   cartItems: [],
//   loading: false,
//   error: null,
// };

// export const fetchCartItems = createAsyncThunk<
//   Cart[],
//   void,
//   { rejectValue: string }
// >('cart/fetchCartItems', async (_, { rejectWithValue }) => {
//   try {
//     const response = await axios.get('http://localhost:8000/api/carts/5');
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// export const deleteCartItemAsync = createAsyncThunk<
//   number,
//   number,
//   { rejectValue: string }
// >('cart/deleteCartItemAsync', async (itemId, { rejectWithValue }) => {
//   try {
//     await axios.delete(`http://localhost:8000/api/carts/${itemId}`);
//     return itemId;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// export const addItemAsync = createAsyncThunk<
//   Cart,
//   Cart,
//   { state: { cart: CartState }; rejectValue: string }
// >('cart/addItemToCartAsync', async (newItem, { getState, rejectWithValue }) => {
//   const { cart } = getState();
//   const existingItem = cart.cartItems.find(
//     (item) => item.productId === newItem.productId,
//   );

//   if (existingItem) {
//     try {
//       const response = await axios.put(
//         `http://localhost:8000/api/carts/${existingItem.id}`,
//         {
//           ...existingItem,
//           quantity: existingItem.quantity + 1,
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   } else {
//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/carts',
//         newItem,
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// });

// export const incrementQuantityAsync = createAsyncThunk<
//   Cart,
//   Cart,
//   { rejectValue: string }
// >('cart/incrementQuantityAsync', async (cartItem, { rejectWithValue }) => {
//   try {
//     const response = await axios.put(
//       `http://localhost:8000/api/carts/${cartItem.id}`,
//       {
//         ...cartItem,
//         quantity: cartItem.quantity + 1,
//       },
//     );
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// export const decrementQuantityAsync = createAsyncThunk<
//   Cart,
//   Cart,
//   { rejectValue: string }
// >('cart/decrementQuantityAsync', async (cartItem, { rejectWithValue }) => {
//   try {
//     const response = await axios.put(
//       `http://localhost:8000/api/carts/${cartItem.id}`,
//       {
//         ...cartItem,
//         quantity: cartItem.quantity - 1,
//       },
//     );
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response?.data?.message || error.message);
//   }
// });

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartItems.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(
//         fetchCartItems.fulfilled,
//         (state, action: PayloadAction<Cart[]>) => {
//           state.loading = false;
//           state.cartItems = action.payload;
//         },
//       )
//       .addCase(fetchCartItems.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(
//         incrementQuantityAsync.fulfilled,
//         (state, action: PayloadAction<Cart>) => {
//           const updatedItem = action.payload;
//           const index = state.cartItems.findIndex(
//             (item) => item.id === updatedItem.id,
//           );
//           if (index !== -1) {
//             state.cartItems[index].quantity = updatedItem.quantity; // Set the updated quantity
//           }
//         },
//       )
//       .addCase(
//         decrementQuantityAsync.fulfilled,
//         (state, action: PayloadAction<Cart>) => {
//           const updatedItem = action.payload;
//           const index = state.cartItems.findIndex(
//             (item) => item.id === updatedItem.id,
//           );
//           if (index !== -1) {
//             state.cartItems[index].quantity = updatedItem.quantity; // Set the updated quantity
//           }
//         },
//       )
//       .addCase(addItemAsync.fulfilled, (state, action: PayloadAction<Cart>) => {
//         const newItem = action.payload;
//         const existingItemIndex = state.cartItems.findIndex(
//           (item) => item.productId === newItem.productId,
//         );
//         if (existingItemIndex !== -1) {
//           state.cartItems[existingItemIndex] = newItem; // Update the item
//         } else {
//           state.cartItems.push(newItem);
//         }
//       })
//       .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
//         state.cartItems = state.cartItems.filter(
//           (item) => item.id !== action.payload,
//         );
//       });
//   },
// });

// export const selectTotalPrice = (state: { cart: CartState }) =>
//   state.cart.cartItems.reduce(
//     (total, item) => total + item.quantity * item.product.price,
//     0,
//   );

// export default cartSlice.reducer;
import { Cart } from '@/typess/cart.type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface CartState {
  cartItems: Cart[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk<
  Cart[],
  void,
  { rejectValue: string }
>('cart/fetchCartItems', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8000/api/carts/5');
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const deleteCartItemAsync = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('cart/deleteCartItemAsync', async (itemId, { rejectWithValue }) => {
  try {
    await axios.delete(`http://localhost:8000/api/carts/${itemId}`);
    return itemId;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const addItemAsync = createAsyncThunk<
  Cart,
  Cart,
  { state: { cart: CartState }; rejectValue: string }
>('cart/addItemToCartAsync', async (newItem, { getState, rejectWithValue }) => {
  const { cart } = getState();
  const existingItem = cart.cartItems.find(
    (item) => item.productId === newItem.productId,
  );

  if (existingItem) {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/carts/${existingItem.id}`,
        {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  } else {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/carts',
        newItem,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
});

export const incrementQuantityAsync = createAsyncThunk<
  Cart,
  Cart,
  { rejectValue: string }
>('cart/incrementQuantityAsync', async (cartItem, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/carts/increment/${cartItem.id}`,
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const decrementQuantityAsync = createAsyncThunk<
  Cart,
  Cart,
  { rejectValue: string }
>('cart/decrementQuantityAsync', async (cartItem, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/carts/decrement/${cartItem.id}`,
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<Cart[]>) => {
          state.loading = false;
          state.cartItems = action.payload.map((item) => ({
            ...item,
            product: item.product || { price: 0 }, // Add default product object if undefined
          }));
        },
      )
      .addCase(
        incrementQuantityAsync.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          const updatedItem = action.payload;
          const index = state.cartItems.findIndex(
            (item) => item.id === updatedItem.id,
          );
          if (index !== -1) {
            state.cartItems[index] = {
              ...updatedItem,
              product: updatedItem.product || state.cartItems[index].product, // Preserve existing product if not in payload
            };
          }
        },
      )
      .addCase(
        decrementQuantityAsync.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          const updatedItem = action.payload;
          const index = state.cartItems.findIndex(
            (item) => item.id === updatedItem.id,
          );
          if (index !== -1) {
            state.cartItems[index] = {
              ...updatedItem,
              product: updatedItem.product || state.cartItems[index].product, // Preserve existing product if not in payload
            };
          }
        },
      )
      .addCase(addItemAsync.fulfilled, (state, action: PayloadAction<Cart>) => {
        const newItem = action.payload;
        const existingItemIndex = state.cartItems.findIndex(
          (item) => item.productId === newItem.productId,
        );
        if (existingItemIndex !== -1) {
          state.cartItems[existingItemIndex] = {
            ...newItem,
            product:
              newItem.product || state.cartItems[existingItemIndex].product, // Preserve existing product if not in payload
          };
        } else {
          state.cartItems.push(newItem);
        }
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload,
        );
      });
  },
});

export const selectTotalPrice = (state: { cart: CartState }) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.quantity * (item.product?.price ?? 0),
    0,
  );

export default cartSlice.reducer;
