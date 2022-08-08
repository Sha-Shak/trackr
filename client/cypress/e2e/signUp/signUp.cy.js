/// <reference types="cypress" />

describe('Tracker Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signup');
  })


  it('should not register with already used email', () => {
    cy.get('#email').type('samiya.kazi09@gmail.com');
    cy.get('#password').type('password123');
    cy.get('#confirm-password').type('password123');
    cy.get('button').contains('Sign Up').click();

    cy.get('p').should('contain', 'Failed to create an account');
  })


  it('should not register when passwords do not match', () => {
    cy.get('#email').type('samiya.kazi09@gmail.com');
    cy.get('#password').type('password');
    cy.get('#confirm-password').type('password123');
    cy.get('button').contains('Sign Up').click();

    cy.get('p').should('contain', 'Passwords do not match');
  })


  it('should register and redirect to dashboard', () => {
    cy.get('#email').type('samiya.kazi10@gmail.com');
    cy.get('#password').type('password123');
    cy.get('#confirm-password').type('password123');
    cy.get('button').contains('Sign Up').click();

    cy.contains("Dashboard");
    cy.contains("Logout");

    cy.contains("Logout").click();
  })
})