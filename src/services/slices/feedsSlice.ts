import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';
import { RootState } from '../store';

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', async () => {
  const data = await getFeedsApi();
  return data;
});

interface FeedsState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null | undefined;
}

export const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const getFeeds = (state: RootState) => state.feeds.orders;
export const getFeedsTotal = (state: RootState) => state.feeds.total;
export const getFeedsTotalToday = (state: RootState) => state.feeds.totalToday;
export const getFeedsLoading = (state: RootState) => state.feeds.loading;

export default feedsSlice.reducer;
