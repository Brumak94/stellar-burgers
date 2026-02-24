import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const data = await getOrdersApi();
  return data;
});

interface OrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null | undefined;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const getOrders = (state: RootState) => state.orders.orders;
export const getOrdersLoading = (state: RootState) => state.orders.loading;

export default ordersSlice.reducer;
