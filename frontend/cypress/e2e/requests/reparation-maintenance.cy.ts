/// <reference types="cypress" />

/// <reference types="cypress" />

describe("Réparation et maintenance", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.loginWithFixture("loginEnseignant");
    cy.wait(1000);
  });
  it("Soumet une demande ", () => {
    cy.visit("/nouvelle-demande");
    cy.contains("button", "Réparation & Maintenance").click();
    cy.wait(2000);
    const file = "cypress/fixtures/test_pdf.pdf";

    cy.get('input[type="file"]').selectFile(file, { force: true });
    cy.get('textarea[name="description"]').type("Description de la demande");

    cy.wait(6000); // Attendre le téléversement

    cy.contains("button", "Soumettre").click();

    cy.contains("La demande a bien été soumise", { timeout: 5000 });
  });

  it("Champs manquants", () => {
    cy.visit("/nouvelle-demande");
    cy.contains("button", "Réparation & Maintenance").click();

    cy.contains("button", "Soumettre").click();

    cy.get("p.text-destructive")
      .should("have.length.at.least", 1)
      .each(($el) => {
        expect($el.text()).to.equal("La description est requise");
      });
  });
});
