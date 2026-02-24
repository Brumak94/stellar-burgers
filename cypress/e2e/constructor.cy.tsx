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
        cy.get('[data-testid=643d69a5c3f7b9001cfa093c]').should('exist');
        cy.get('[data-testid=643d69a5c3f7b9001cfa0941]').should('exist');
        cy.get('[data-testid=643d69a5c3f7b9001cfa0942]').should('exist');
    });

    describe('работа с конструктором', () => {
        it('должен добавлять булку и начинку в конструктор', () => {
            cy.get('[data-testid=643d69a5c3f7b9001cfa093c] button').click();
            cy.get('[data-testid=643d69a5c3f7b9001cfa0941] button').click();

            cy.get('.constructor-element_pos_top').should('contain', 'Краторная булка N-200i');
            cy.get('.constructor-element_pos_bottom').should('contain', 'Краторная булка N-200i');
            cy.get('.constructor-element').should('contain', 'Биокотлета из марсианской Магнолии');
        });
    });

    describe('работа модальных окон', () => {
        it('открытие и закрытие модального окна ингредиента', () => {
            cy.get('[data-testid=643d69a5c3f7b9001cfa093c]').click();
            cy.get('[data-testid=modal]').should('be.visible');
            cy.get('[data-testid=modal]').should('contain', 'Краторная булка N-200i');

            cy.get('[data-testid=modal-close]').click();
            cy.get('[data-testid=modal]').should('not.exist');

            cy.get('[data-testid=643d69a5c3f7b9001cfa0941]').click();
            cy.get('[data-testid=modal-overlay]').click({ force: true });
            cy.get('[data-testid=modal]').should('not.exist');
        });
    });

    describe('создание заказа', () => {
        it('полный цикл оформления заказа', () => {
            cy.get('[data-testid=643d69a5c3f7b9001cfa093c] button').click();
            cy.get('[data-testid=643d69a5c3f7b9001cfa0941] button').click();
            cy.get('[data-testid=643d69a5c3f7b9001cfa0942] button').click();

            cy.get('[data-testid=order-button]').click();

            cy.wait('@postOrder');
            cy.get('[data-testid=modal]').should('be.visible');
            cy.get('[data-testid=order-number]').should('contain', '12345');

            cy.get('[data-testid=modal-close]').click();
            cy.get('[data-testid=modal]').should('not.exist');

            cy.get('.constructor-element').should('not.exist');
        });
    });
});
