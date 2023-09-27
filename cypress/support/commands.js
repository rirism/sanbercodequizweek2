// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("register", (firstName, lastName, email, password, confirmPassword, gender) => {
    cy.visit("https://demowebshop.tricentis.com/register");
    
    // Fill out personal details
    if (gender === "M") {
      cy.get("#gender-male").check();
    } else if (gender === "F") {
      cy.get("#gender-female").check();
    }
    
    cy.get("#FirstName").type(firstName);
    cy.get("#LastName").type(lastName);
    cy.get("#Email").type(email);
    
    // Fill out password details
    cy.get("#Password").type(password);
    cy.get("#ConfirmPassword").type(confirmPassword);
  
    // Submit the registration form
    cy.get('#register-button').click();
  });

  Cypress.Commands.add("login", (email, password) => {
    cy.visit("https://demowebshop.tricentis.com/login");
  
    // Fill in the login form
    cy.get("#Email").type(email);
    cy.get("#Password").type(password);
  
    // Submit the login form
    cy.get(".login-button").click();
  });