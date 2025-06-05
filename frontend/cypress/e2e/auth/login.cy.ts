/// <reference types="cypress" />

import { AUTH_TEST_DATA } from "../../support/test-data/auth-data";

describe("Test E2E - Connexion", () => {
  beforeEach(() => {
    cy.visit(AUTH_TEST_DATA.ROUTES.login);
  });

  it("Connexion réussie avec redirection", () => {
    cy.loginWithFixture("validUser");

    // Vérifier la redirection et le message de succès
    cy.contains(AUTH_TEST_DATA.VALIDATION_MESSAGES.success, {
      timeout: 5000,
    }).should("be.visible");
    cy.url({ timeout: 7000 }).should("include", AUTH_TEST_DATA.ROUTES.home);

    // Vérifier que les tokens sont bien stockés dans le localStorage
    cy.window().its("localStorage.accessToken").should("exist");
    cy.window().its("localStorage.refreshToken").should("exist");
  });

  it("Affiche erreur mot de passe incorrect", () => {
    cy.loginWithFixture("invalidPassword");

    // Vérifier le message d'erreur et l'absence de redirection
    cy.contains(AUTH_TEST_DATA.VALIDATION_MESSAGES.wrongPassword).should(
      "be.visible"
    );
    cy.url().should("include", AUTH_TEST_DATA.ROUTES.login);

    // Vérifier que les tokens ne sont pas stockés
    cy.window().its("localStorage.accessToken").should("not.exist");
    cy.window().its("localStorage.refreshToken").should("not.exist");
  });

  it("Affiche erreur utilisateur non existant", () => {
    cy.loginWithFixture("invalidUser");

    // Vérifier le message d'erreur et l'absence de redirection
    cy.contains(AUTH_TEST_DATA.VALIDATION_MESSAGES.userNotFound).should(
      "be.visible"
    );
    cy.url().should("include", AUTH_TEST_DATA.ROUTES.login);

    // Vérifier que les tokens ne sont pas stockés
    cy.window().its("localStorage.accessToken").should("not.exist");
    cy.window().its("localStorage.refreshToken").should("not.exist");
  });
});
