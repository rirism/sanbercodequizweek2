/// <reference types="cypress" />

describe("Login Tests", () => {
    beforeEach(() => {
      cy.visit("https://demowebshop.tricentis.com/login");
    });
  
    it("should be able to register with valid information", () => {
        cy.fixture("loginData").then((data) => {
          const userData = data.validUser;
          cy.login(
            userData.email,
            userData.password
          );
          cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-3 > div > div > div.topic-html-content > div.topic-html-content-title > h2').should('have.text', '\n                    Welcome to our store')
        });
      });

      it("should handle register with wrong password", () => {
        cy.fixture("loginData").then((data) => {
          const userData = data.wrongPassword;
          cy.login(
            userData.email,
            userData.password
          );
          cy.get('body > div.master-wrapper-page > div.master-wrapper-content > div.master-wrapper-main > div.center-2 > div > div.page-body > div.customer-blocks > div.returning-wrapper > div.form-fields > form > div.message-error > div').should('have.text', 'Login was unsuccessful. Please correct the errors and try again.\nThe credentials provided are incorrect\n')
        });
      });
  });