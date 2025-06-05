/// <reference types="cypress" />

describe("Test E2E - Equipements", () => {
  beforeEach(() => {
    cy.loginWithFixture("validUser");
    cy.wait(1000);
    cy.visit("/materiels");
  });

  it("Affiche la liste des equipements", () => {
    cy.get('[data-solt="table-container"]').should("be.visible");
  });

  it("Afficher les infos d'un équipement", () => {
    cy.contains("a", "DataShow Epson EB-X05").click();
    cy.url().should("include", "/materiels/");
    cy.wait(2000);
    cy.contains("span", "DataShow Epson EB-X05").should("be.visible");
  });

  it("Ajouter un équipement", () => {
    cy.visit("/materiels/nouveau-materiel");
    cy.addEquipmentWithFixture("validEquipment");

    cy.contains("L'équipement a été ajouté avec succès", {
      timeout: 5000,
    }).should("be.visible");
  });

  it("Ajouter un équipement déja existant", () => {
    cy.visit("/materiels/nouveau-materiel");
    cy.addEquipmentWithFixture("existingEquipment");

    cy.contains("Un équipement avec un nom similaire existe déjà", {
      timeout: 5000,
    }).should("be.visible");
  });
});
