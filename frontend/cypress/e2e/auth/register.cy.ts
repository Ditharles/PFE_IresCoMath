/// <reference types="cypress" />

import { AUTH_TEST_DATA } from "../../support/test-data/auth-data";

// Note importante: Si les tests d'inscriptions ont déja été effectués une fois ils ne fonctionneront pas car l'utilisateur existe désormais dans la base de données 
describe("Test E2E - Inscription", () => {
  beforeEach(() => {
    cy.visit(AUTH_TEST_DATA.ROUTES.register);
  });

  it("Utilisateur déja existants", () => {
    cy.registerWithFixture("userWithMailAlreadyExists");
    cy.contains(AUTH_TEST_DATA.VALIDATION_MESSAGES.userAlreadyExists).should(
      "be.visible"
    );
    cy.url().should("include", AUTH_TEST_DATA.ROUTES.register);
  });

  it("Champs manquants", () => {
    cy.contains("button", "Enseignant chercheur").should("be.visible").click();
    cy.get('button[type="submit"]').should("be.visible").click();
    cy.assertValidationMessage(AUTH_TEST_DATA.FIELDS_ERRORS.lastName);
    cy.assertValidationMessage(AUTH_TEST_DATA.FIELDS_ERRORS.firstName);
    cy.assertValidationMessage(AUTH_TEST_DATA.FIELDS_ERRORS.phone);
    cy.assertValidationMessage(AUTH_TEST_DATA.FIELDS_ERRORS.email);
    cy.assertValidationMessage(AUTH_TEST_DATA.FIELDS_ERRORS.cin);
    cy.assertValidationMessage(AUTH_TEST_DATA.FIELDS_ERRORS.password);
    cy.assertValidationMessage(AUTH_TEST_DATA.FIELDS_ERRORS.confirmPassword);

    cy.url().should("include", AUTH_TEST_DATA.ROUTES.register);
  });
  it("Enseignant chercheur", () => {
    cy.registerWithFixture("registerEnseignant");
    cy.contains(AUTH_TEST_DATA.VALIDATION_MESSAGES["registerSuccess"], {
      timeout: 5000,
    }).should("be.visible");
    cy.url({ timeout: 7000 }).should("include", AUTH_TEST_DATA.ROUTES.resend);
  });

  it("Doctorants", () => {
    cy.registerWithFixture("registerDoctorant");
    cy.contains(AUTH_TEST_DATA.VALIDATION_MESSAGES.registerSuccess, {
      timeout: 5000,
    }).should("be.visible");
    cy.url({ timeout: 7000 }).should("include", AUTH_TEST_DATA.ROUTES.resend);
  });
  it("Etudiant en master", () => {
    cy.registerWithFixture("registerMaster");
    cy.contains(AUTH_TEST_DATA.VALIDATION_MESSAGES.registerSuccess, {
      timeout: 5000,
    }).should("be.visible");
    cy.url({ timeout: 7000 }).should("include", AUTH_TEST_DATA.ROUTES.resend);
  });
});
