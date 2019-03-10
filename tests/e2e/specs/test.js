// https://docs.cypress.io/api/introduction/api.html

describe('Test', () => {

  it('Should render home', () => {

    cy.visit('/');
    cy.get('#app').should('be.visible');
    cy.get('#home').should('be.visible');
    cy.get('#home').find('img').should('be.visible');

  });

  it('Should navigate', () => {

    cy.visit('/');
    cy.get('#nav').should('be.visible');

    cy.get('#nav > a:nth-child(2)').click();
    cy.get('#shader-container').should('be.visible');

    cy.get('#nav > a:nth-child(1)').click();
    cy.get('#home').should('be.visible');

  });

  describe('Shader', () => {

    it('Should render shader', () => {

      cy.visit('/shader');
      cy.get('#shader-container').should('be.visible');
      cy.get('#shader-container').find('canvas').should('be.visible');

    });

  });

});
