import rootReducer from './rootReducer';
import { initialState as ingredientsInitialState } from './slices/ingredientsSlice';
import { initialState as constructorInitialState } from './slices/constructorSlice';
import { initialState as userInitialState } from './slices/userSlice';
import { initialState as orderInitialState } from './slices/orderSlice';
import { initialState as feedsInitialState } from './slices/feedsSlice';
import { initialState as ordersInitialState } from './slices/ordersSlice';

describe('тестирование rootReducer', () => {
    it('должен возвращать начальное состояние при вызове с undefined и неизвестным экшеном', () => {
        const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

        expect(initialState).toEqual({
            ingredients: ingredientsInitialState,
            burgerConstructor: constructorInitialState,
            user: userInitialState,
            order: orderInitialState,
            feeds: feedsInitialState,
            orders: ordersInitialState
        });
    });
});
