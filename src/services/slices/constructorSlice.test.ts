import constructorReducer, {
    addIngredient,
    removeIngredient,
    reorderIngredients,
    clearConstructor,
    initialState
} from './constructorSlice';

const mockIngredient = {
    _id: '1',
    name: 'Ингредиент 1',
    type: 'main',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    price: 100,
    image: 'img',
    image_large: 'img_l',
    image_mobile: 'img_m'
};

const mockBun = {
    _id: '2',
    name: 'Булка',
    type: 'bun',
    proteins: 20,
    fat: 20,
    carbohydrates: 20,
    calories: 20,
    price: 200,
    image: 'img_b',
    image_large: 'img_lb',
    image_mobile: 'img_mb'
};

describe('тестирование constructorSlice', () => {

    it('должен добавлять ингредиент (начинку) и генерировать uuid', () => {
        const newState = constructorReducer(initialState, addIngredient(mockIngredient));
        expect(newState.ingredients.length).toBe(1);
        expect(newState.ingredients[0]).toEqual(expect.objectContaining(mockIngredient));
        expect(newState.ingredients[0].id).toBeDefined();
    });

    it('должен добавлять булку', () => {
        const newState = constructorReducer(initialState, addIngredient(mockBun));
        expect(newState.bun).toEqual(expect.objectContaining(mockBun));
    });

    it('должен удалять ингредиент', () => {
        const stateWithIngredient = {
            bun: null,
            ingredients: [{ ...mockIngredient, id: 'test-id' }]
        };
        const newState = constructorReducer(stateWithIngredient, removeIngredient('test-id'));
        expect(newState.ingredients.length).toBe(0);
    });

    it('должен менять порядок ингредиентов', () => {
        const stateWithIngredients = {
            bun: null,
            ingredients: [
                { ...mockIngredient, id: '1', name: 'Ингредиент 1' },
                { ...mockIngredient, id: '2', name: 'Ингредиент 2' }
            ]
        };
        const newState = constructorReducer(
            stateWithIngredients,
            reorderIngredients({ from: 0, to: 1 })
        );
        expect(newState.ingredients[0].id).toBe('2');
        expect(newState.ingredients[1].id).toBe('1');
    });

    it('должен очищать конструктор', () => {
        const stateWithData = {
            bun: mockBun,
            ingredients: [{ ...mockIngredient, id: '1' }]
        };
        const newState = constructorReducer(stateWithData, clearConstructor());
        expect(newState).toEqual(initialState);
    });
});
