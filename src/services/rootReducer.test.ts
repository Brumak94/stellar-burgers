import rootReducer from './rootReducer';

describe('тестирование rootReducer', () => {
    it('должен возвращать начальное состояние при вызове с undefined и неизвестным экшеном', () => {
        const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

        expect(initialState).toEqual({
            ingredients: {
                ingredients: [],
                loading: false,
                error: null
            },
            burgerConstructor: {
                bun: null,
                ingredients: []
            },
            user: {
                user: null,
                isAuthChecked: false,
                error: null
            },
            order: {
                orderRequest: false,
                orderModalData: null,
                error: null
            },
            feeds: {
                orders: [],
                total: 0,
                totalToday: 0,
                loading: false,
                error: null
            },
            orders: {
                orders: [],
                loading: false,
                error: null
            }
        });
    });
});
