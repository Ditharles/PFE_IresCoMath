/// <reference types="cypress" />

describe("Inscription d'article", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.loginWithFixture("loginEnseignant");
    cy.wait(1000);
  });
  it("Soumet une demande ", () => {
    cy.visit("/nouvelle-demande");
    cy.contains("button", "Inscription Article").click();
    cy.wait(2000);
    const file = "cypress/fixtures/test_pdf.pdf";

    cy.get('input[type="file"]').selectFile(file, { force: true });
    cy.get('input[name="title"]').type("Titre test");
    cy.get('input[name="conference"]').type("Conference test");
    cy.get('input[name="urlConference"]').type("https://Conference.com");

    cy.get('input[name="amount"]').type("50");
    cy.wait(5000);

    cy.wait(6000); // Attendre le téléversement

    cy.contains("button", "Soumettre").click();

    cy.contains("La demande a bien été soumise", { timeout: 5000 });
  });

  it("Champs manquants", () => {
    cy.visit("/nouvelle-demande");
    cy.contains("button", "Conférence nationale").click();

    cy.contains("button", "Soumettre").click();

    cy.get("p.text-destructive")
      .should("have.length.at.least", 1)
      .each(($el) => {
        expect($el.text()).to.equal("Champ requis");
      });
  });
});
