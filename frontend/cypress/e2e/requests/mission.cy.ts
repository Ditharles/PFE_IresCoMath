/// <reference types="cypress" />

describe("Missions", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.loginWithFixture("loginEnseignant");
    cy.wait(1000);
  });
    it("Soumet une demande ", () => {
      cy.visit("/nouvelle-demande");
      cy.contains("button", "Mission").click();
      cy.wait(2000);
      const imageFile = "cypress/fixtures/avatar.jpg";

      cy.get('input[type="file"]').selectFile(imageFile, { force: true });
      cy.get('input[name="hostOrganization"]').type("Organisation Test");
      cy.get('textarea[name="objective"]').type("Objectif de la mission de test");
      cy.get('input[name="country"]').type("Benin");
      cy.wait(5000);

      cy.wait(6000); // Attendre le téléversement

      cy.contains("button", "Soumettre").click();

      cy.contains("La demande a bien été soumise", { timeout: 5000 });
    });

  it("Champs manquants", () => {
    cy.visit("/nouvelle-demande");
    cy.contains("button", "Mission").click();

    cy.contains("button", "Soumettre").click();

  cy.get('p.text-destructive').should('have.length.at.least', 1).each(($el) => {
    expect($el.text()).to.equal('Champ requis');
  });
  });
});

