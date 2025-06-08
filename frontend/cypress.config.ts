const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "t82ozr",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});
