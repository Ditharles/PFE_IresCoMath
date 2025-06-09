describe("Test E2E - Catégories", () => {
  beforeEach(() => {
    cy.visit("/login");
    cy.loginWithFixture("validUser");
    cy.wait(2000);
    cy.visit("/materiels/inventaire");
    cy.wait(2000);
  });

  it("Affiche la liste des catégories", () => {
    cy.get('[data-slot="table-container"]').should("be.visible");
    cy.get('[data-slot="table"]').should("be.visible");
  });

  it("Afficher les infos d'une catégorie", () => {
    cy.contains("a", "Cartes de développement").should("be.visible").click();
    cy.wait(2000);

    cy.url().should("include", "/materiels/categories/");
    cy.wait(2000);
    cy.contains("p", "Cartes de développement").should("be.visible");
  });

  it("Ajouter une catégorie", () => {
    cy.visit("/materiels/categories/ajouter");
    cy.wait(5000);
    cy.get('input[name="name"]').should("be.visible").type("Test Catégorie");
    cy.get('textarea[name="description"]')
      .should("be.visible")
      .type("Test Description");
    cy.wait(3000); // pour selectionner le type
    cy.get('button[type="submit"]').should("be.visible").click();

    cy.contains("La catégorie a été ajoutée avec succès", {
      timeout: 6000,
    }).should("be.visible");
  });

  it("Ajouter une catégorie avec un nom similaire", () => {
    cy.visit("/materiels/categories/ajouter");
    cy.wait(5000);
    cy.get('input[name="name"]').should("be.visible").type("Test Catégorie");
    cy.get('textarea[name="description"]')
      .should("be.visible")
      .type("Test Description");
    cy.wait(3000); // pour selectionner le type
    cy.get('button[type="submit"]').should("be.visible").click();

    cy.contains("Une catégorie avec un nom similaire existe déjà", {
      timeout: 6000,
    }).should("be.visible");
  });
});
