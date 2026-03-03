import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';

interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    reorderIngredients: (
      state,
      action: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = action.payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  reorderIngredients,
  clearConstructor
} = constructorSlice.actions;

export const getConstructorState = (state: RootState) =>
  state.burgerConstructor;

export default constructorSlice.reducer;
