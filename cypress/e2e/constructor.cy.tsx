const BUN_ID = '643d69a5c3f7b9001cfa093c';
const MAIN_ID = '643d69a5c3f7b9001cfa0941';
const SAUCE_ID = '643d69a5c3f7b9001cfa0942';

const MODAL_SELECTOR = '[data-testid=modal]';

describe('тестирование конструктора бургера', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
        cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
        cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('postOrder');

        window.localStorage.setItem('refreshToken', 'fake-refresh-token');
        cy.setCookie('accessToken', 'fake-access-token');

        cy.visit('/');
        cy.wait('@getIngredients');
    });

    afterEach(() => {
        window.localStorage.clear();
        cy.clearCookies();
    });

    it('должен отображать ингредиенты из фикстур', () => {
        cy.get(`[data-testid=${BUN_ID}]`).should('exist');
        cy.get(`[data-testid=${MAIN_ID}]`).should('exist');
        cy.get(`[data-testid=${SAUCE_ID}]`).should('exist');
    });

    describe('работа с конструктором', () => {
        it('должен добавлять булку и начинку в конструктор', () => {
            cy.addIngredient(BUN_ID);
            cy.addIngredient(MAIN_ID);

            cy.get('.constructor-element_pos_top').should('contain', 'Краторная булка N-200i');
            cy.get('.constructor-element_pos_bottom').should('contain', 'Краторная булка N-200i');
            cy.get('.constructor-element').should('contain', 'Биокотлета из марсианской Магнолии');
        });
    });

    describe('работа модальных окон', () => {
        it('открытие и закрытие модального окна ингредиента', () => {
            cy.get(`[data-testid=${BUN_ID}]`).click();
            cy.get(MODAL_SELECTOR).should('be.visible');
            cy.get(MODAL_SELECTOR).should('contain', 'Краторная булка N-200i');

            cy.closeModal();
            cy.get(MODAL_SELECTOR).should('not.exist');

            cy.get(`[data-testid=${MAIN_ID}]`).click();
            cy.get('[data-testid=modal-overlay]').click({ force: true });
            cy.get(MODAL_SELECTOR).should('not.exist');
        });
    });

    describe('создание заказа', () => {
        it('полный цикл оформления заказа', () => {
            cy.addIngredient(BUN_ID);
            cy.addIngredient(MAIN_ID);
            cy.addIngredient(SAUCE_ID);

            cy.get('[data-testid=order-button]').click();

            cy.wait('@postOrder');
            cy.get(MODAL_SELECTOR).should('be.visible');
            cy.get('[data-testid=order-number]').should('contain', '12345');

            cy.closeModal();
            cy.get(MODAL_SELECTOR).should('not.exist');

            cy.get('.constructor-element').should('not.exist');
        });
    });
});
