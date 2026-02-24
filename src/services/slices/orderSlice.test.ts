import orderReducer, { placeOrder, clearOrder } from './orderSlice';

describe('тестирование orderSlice', () => {
    const initialState = {
        orderRequest: false,
        orderModalData: null,
        error: null
    };

    it('должно очищать данные заказа при clearOrder', () => {
        const stateWithData = {
            orderRequest: false,
            orderModalData: { _id: '1', number: 123 } as any,
            error: null
        };
        const newState = orderReducer(stateWithData, clearOrder());
        expect(newState.orderModalData).toBe(null);
    });

    it('статус orderRequest должен быть true при placeOrder.pending', () => {
        const action = { type: placeOrder.pending.type };
        const state = orderReducer(initialState, action);
        expect(state.orderRequest).toBe(true);
        expect(state.error).toBe(null);
    });

    it('должен сохранять данные заказа и orderRequest: false при placeOrder.fulfilled', () => {
        const mockOrder = { _id: '1', number: 123 };
        const action = {
            type: placeOrder.fulfilled.type,
            payload: { order: mockOrder }
        };
        const state = orderReducer({ ...initialState, orderRequest: true }, action);
        expect(state.orderRequest).toBe(false);
        expect(state.orderModalData).toEqual(mockOrder);
    });

    it('должен сохранять ошибку и orderRequest: false при placeOrder.rejected', () => {
        const errorMsg = 'error';
        const action = {
            type: placeOrder.rejected.type,
            error: { message: errorMsg }
        };
        const state = orderReducer({ ...initialState, orderRequest: true }, action);
        expect(state.orderRequest).toBe(false);
        expect(state.error).toBe(errorMsg);
    });
});
