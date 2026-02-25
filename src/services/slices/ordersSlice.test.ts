import ordersReducer, { fetchOrders, initialState } from './ordersSlice';

describe('тестирование ordersSlice', () => {

    it('статус loading должен быть true при fetchOrders.pending', () => {
        const action = { type: fetchOrders.pending.type };
        const state = ordersReducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('должен сохранять заказы и loading: false при fetchOrders.fulfilled', () => {
        const mockOrders = [{ _id: '1', number: 123 }];
        const action = {
            type: fetchOrders.fulfilled.type,
            payload: mockOrders
        };
        const state = ordersReducer({ ...initialState, loading: true }, action);
        expect(state.loading).toBe(false);
        expect(state.orders).toEqual(mockOrders);
    });

    it('должен сохранять ошибку и loading: false при fetchOrders.rejected', () => {
        const errorMsg = 'error';
        const action = {
            type: fetchOrders.rejected.type,
            error: { message: errorMsg }
        };
        const state = ordersReducer({ ...initialState, loading: true }, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(errorMsg);
    });
});
