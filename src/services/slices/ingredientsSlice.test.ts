import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';

describe('тестирование ingredientsSlice', () => {
    const initialState = {
        ingredients: [],
        loading: false,
        error: null
    };

    it('статус loading должен быть true при fetchIngredients.pending', () => {
        const action = { type: fetchIngredients.pending.type };
        const state = ingredientsReducer(initialState, action);
        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('должен сохранять ингредиенты и loading: false при fetchIngredients.fulfilled', () => {
        const mockIngredients = [
            { _id: '1', name: 'Ингредиент' }
        ];
        const action = {
            type: fetchIngredients.fulfilled.type,
            payload: mockIngredients
        };
        const state = ingredientsReducer({ ...initialState, loading: true }, action);
        expect(state.loading).toBe(false);
        expect(state.ingredients).toEqual(mockIngredients);
    });

    it('должен сохранять ошибку и loading: false при fetchIngredients.rejected', () => {
        const errorMsg = 'error';
        const action = {
            type: fetchIngredients.rejected.type,
            error: { message: errorMsg }
        };
        const state = ingredientsReducer({ ...initialState, loading: true }, action);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(errorMsg);
    });
});
