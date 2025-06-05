describe("Tests de déconnexion", () => {
  beforeEach(() => {
    // Se connecter d'abord
    cy.visit("/login");
    cy.loginWithFixture("validUser");
    cy.wait(1000).then(() => {
      cy.url().should("include", "/demandes");
    });
  });

  it("devrait se déconnecter avec succès", () => {
    // Cliquer sur le bouton avatar pour afficher le menu
    cy.wait(3000).then(() => {
      cy.get('button[aria-label="Toggle user profile"]').click();
    });

    // Cliquer sur le bouton de déconnexion dans le menu
    cy.contains("button", "Se déconnecter").click();

    // Vérifier la redirection vers la page de connexion
    cy.url().should("include", "/");

    // Vérifier que les token ont été supprimés
    cy.window().its("localStorage.accessToken").should("not.exist");
    cy.window().its("localStorage.refreshToken").should("not.exist");

    // Vérifier que l'utilisateur ne peut pas accéder au dashboard
    cy.visit("/demandes");
    cy.url().should("include", "/login");
  });
});
