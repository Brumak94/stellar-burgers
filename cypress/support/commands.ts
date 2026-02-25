declare namespace Cypress {
    interface Chainable {
        addIngredient(id: string): Chainable<void>;
        closeModal(): Chainable<void>;
    }
}

Cypress.Commands.add('addIngredient', (id: string) => {
    cy.get(`[data-testid=${id}] button`).click();
});

Cypress.Commands.add('closeModal', () => {
    cy.get('[data-testid=modal-close]').click();
});
