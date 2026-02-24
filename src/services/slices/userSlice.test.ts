import userReducer, {
    registerUser,
    loginUser,
    checkUserAuth,
    updateUser,
    logoutUser
} from './userSlice';

describe('тестирование userSlice', () => {
    const initialState = {
        user: null,
        isAuthChecked: false,
        error: null
    };

    const mockUser = { email: 'test@test.ru', name: 'Test' };

    it('должен сохранять пользователя при loginUser.fulfilled', () => {
        const action = { type: loginUser.fulfilled.type, payload: mockUser };
        const state = userReducer(initialState, action);
        expect(state.user).toEqual(mockUser);
        expect(state.isAuthChecked).toBe(true);
    });

    it('должен устанавливать isAuthChecked: true при checkUserAuth.rejected', () => {
        const action = { type: checkUserAuth.rejected.type };
        const state = userReducer(initialState, action);
        expect(state.isAuthChecked).toBe(true);
    });

    it('должен очищать пользователя при logoutUser.fulfilled', () => {
        const stateWithUser = { ...initialState, user: mockUser };
        const action = { type: logoutUser.fulfilled.type };
        const state = userReducer(stateWithUser, action);
        expect(state.user).toBe(null);
    });

    it('должен обновлять пользователя при updateUser.fulfilled', () => {
        const action = { type: updateUser.fulfilled.type, payload: mockUser };
        const state = userReducer(initialState, action);
        expect(state.user).toEqual(mockUser);
    });
});
