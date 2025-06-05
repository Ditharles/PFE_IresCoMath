/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>;
    loginWithFixture(fixtureName: string): Chainable<void>;
    assertValidationMessage(message: string): Chainable<void>;
    register(data: any): Chainable<void>;
    registerWithFixture(fixtureName: string): Chainable<void>;
    selectDate(datePickerSelector: string, dateString: string): Chainable<void>;
    addEquipment(data: any): Chainable<void>;
    addEquipmentWithFixture(fixtureName: string): Chainable<void>;
  }
}

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.get('input[type="email"]').should("be.visible").type(email);
  cy.get('input[type="password"]').should("be.visible").type(password);
  cy.get('button[type="submit"]').should("be.visible").click();
});

Cypress.Commands.add("loginWithFixture", (fixtureName: string) => {
  cy.fixture("test-users").then((users) => {
    const user = users[fixtureName];
    if (!user) {
      throw new Error(
        `User fixture '${fixtureName}' not found in test-users.json`
      );
    }
    if (!user.email || !user.password) {
      throw new Error(
        `User fixture '${fixtureName}' is missing email or password.`
      );
    }
    cy.login(user.email, user.password);
  });
});

Cypress.Commands.add("register", (data: any) => {
  cy.get('input[name="email"]').should("be.visible").type(data.email);
  cy.get('input[name="lastName"]').should("be.visible").type(data.lastName);
  cy.get('input[name="firstName"]').should("be.visible").type(data.firstName);
  cy.get('input[name="phone"]').should("be.visible").type(data.phone);
  cy.get("input[name=cin]").should("be.visible").type(data.cin);
  cy.get('input[name="password"]').should("be.visible").type(data.password);
  cy.get('input[name="confirmPassword"]')
    .should("be.visible")
    .type(data.password);
  cy.wait(3000);
  cy.contains("button", data.role).should("be.visible").click();
  Object.entries(data.specific).forEach(
    ([name, specificField]: [string, { type: string; value: string }]) => {
      const { type, value } = specificField;
      if (type === "text") {
        cy.get(`input[name="${name}"]`).should("be.visible").type(value);
      } else if (type === "select") {
        cy.get('[data-slot="select-trigger"]').click();
        //faire le select manuellement
        cy.wait(5000);
      }
    }
  );
  const fileName = "avatar.jpg";
  cy.get('input[type="file"]').selectFile(`cypress/fixtures/${fileName}`, {
    force: true,
  });
  cy.wait(5000);
  cy.contains("Fichier téléchargé avec succès").should("be.visible");
  cy.get('button[type="submit"]').should("be.visible").click();
});

Cypress.Commands.add("registerWithFixture", (fixtureName: string) => {
  cy.fixture("test-users").then((users) => {
    const user = users[fixtureName];
    if (!user) {
      throw new Error(
        `User fixture '${fixtureName}' not found in test-users.json`
      );
    }

    cy.register(user);
  });
});
Cypress.Commands.add("assertValidationMessage", (message: string) => {
  cy.contains(message).should("be.visible");
});

Cypress.Commands.add("addEquipment", (data: any) => {
  cy.get('input[name="name"]').should("be.visible").type(data.name);
  cy.get('input[name="cost"]').should("be.visible").type(data.cost);
  //Choisir la catéguorie et le status
  cy.wait(5000);
  cy.selectDate("Sélectionnez une date", data.date);
});

Cypress.Commands.add("addEquipmentWithFixture", (fixtureName: string) => {
  cy.fixture("test-equipments").then((equipments) => {
    const equipment = equipments[fixtureName];
    if (!equipment) {
      throw new Error(
        `Equipment fixture '${fixtureName}' not found in test-equipments.json`
      );
    }
    cy.addEquipment(equipment);
  });
});
//Pour choisir la date
Cypress.Commands.add("selectDate", (contains, dateString) => {
  const [day, month, year] = dateString.split("/");

  // Ouvrir le calendrier
  cy.get("[data-slot='date-picker']")
    .find("button")
    .contains(contains)
    .first()
    .click();
  cy.get(".absolute.z-50").should("be.visible");

  // Naviguer vers la bonne date
  cy.get(".absolute.z-50").within(() => {
    // Répéter jusqu'à trouver le bon mois/année
    cy.get("body").then(() => {
      const navigateToDate = () => {
        cy.get('[role="heading"]').then(($heading) => {
          const currentText = $heading.text().toLowerCase();
          const targetMonthName = getMonthName(parseInt(month));
          const targetYear = year;

          if (
            currentText.includes(targetMonthName) &&
            currentText.includes(targetYear)
          ) {
            // On est au bon mois, sélectionner le jour
            cy.contains("button", day).click();
          } else {
            // Naviguer (logique simplifiée - toujours aller vers le futur)
            cy.get('button[aria-label*="next"]').click();
            cy.wait(200);
            navigateToDate();
          }
        });
      };

      navigateToDate();
    });
  });
});

function getMonthName(monthNumber) {
  const months = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];
  return months[monthNumber - 1];
}
// Pour que ce fichier soit un module, vous pouvez ajouter :
// export {}; // Décommentez si vous avez des problèmes avec "Cannot augment Ggobal Pcope" ou si votre tsconfig l'exige.
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
