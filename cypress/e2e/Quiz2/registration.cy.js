/// <reference types="cypress" />

describe("Registration Tests", () => {
  beforeEach(() => {
    cy.visit("https://demowebshop.tricentis.com/register");
  });

  it("should be able to register with valid information", () => {
    cy.fixture("registrationData").then((data) => {
      const userData = data.validUser;
      cy.register(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.confirmPassword,
        userData.gender
      );
      cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div > div.page-body > div.result').should('have.text', '\n            Your registration completed\n        ')
    });
  });

  it("should handle registration for existing user", () => {
    cy.fixture("registrationData").then((data) => {
      const userData = data.existingUser;
      cy.register(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.confirmPassword,
        userData.gender
      );
      cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > form > div > div.page-body > div.message-error > div > ul > li').should('have.text', 'The specified email already exists')
    });
  });

  it("should handle registration with password that has less than 6 characters.", () => {
    cy.fixture("registrationData").then((data) => {
      const userData = data.under6characterPasswordUser;
      cy.register(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.confirmPassword,
        userData.gender
      );
      // Assert that there are error messages displayed for invalid data
      cy.get("body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > form > div > div.page-body > div:nth-child(3) > div.form-fields > div:nth-child(1) > span.field-validation-error > span").should('have.text', "The password should have at least 6 characters.");
    });
  });

  it("should handle registration with unmatching password", () => {
    cy.fixture("registrationData").then((data) => {
      const userData = data.unmatchingPasswordUser;
      cy.register(
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.password,
        userData.confirmPassword,
        userData.gender
      );
      // Assert that there are error messages displayed for invalid data
      cy.get("body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > form > div > div.page-body > div:nth-child(3) > div.form-fields > div:nth-child(2) > span.field-validation-error > span").should('have.text', "The password and confirmation password do not match.");
    });
  });
});