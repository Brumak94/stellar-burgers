import feedsReducer, { fetchFeeds, initialState } from './feedsSlice';

describe('тестирование feedsSlice', () => {

    it('статус loading должен быть true при fetchFeeds.pending', () => {
        const action = { type: fetchFeeds.pending.type };
        const state = feedsReducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('должен сохранять данные и loading: false при fetchFeeds.fulfilled', () => {
        const mockPayload = {
            orders: [{ _id: '1', number: 123 }],
            total: 100,
            totalToday: 10
        };
        const action = {
            type: fetchFeeds.fulfilled.type,
            payload: mockPayload
        };
        const state = feedsReducer({ ...initialState, loading: true }, action);
        expect(state.loading).toBe(false);
        expect(state.orders).toEqual(mockPayload.orders);
        expect(state.total).toBe(mockPayload.total);
        expect(state.totalToday).toBe(mockPayload.totalToday);
    });

    it('должен сохранять ошибку и loading: false при fetchFeeds.rejected', () => {
        const errorMsg = 'error';
        const action = {
            type: fetchFeeds.rejected.type,
            error: { message: errorMsg }
        };
        const state = feedsReducer({ ...initialState, loading: true }, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(errorMsg);
    });
});
