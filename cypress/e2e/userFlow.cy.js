describe("Papi Patricio's Burritos", () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3001/api/v1/orders", { fixture: "orders"});
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", {
      fixture: "post-response",
    }).as("newOrder");
    cy.intercept("DELETE", "http://localhost:3001/api/v1/orders/*", {
      statusCode: 204,
    });
    cy.visit("http://localhost:3000/");
  });

  it("Should allow a user to see a list of orders with names and ingredients", () => {
    cy.get(":nth-child(1) > h3")
      .should("have.text", "Chavo")
      .get(":nth-child(3) > h3")
      .should("have.text", "Gordo")
    cy.get(":nth-child(1) > .ingredient-list > :nth-child(1)").should("have.text", "frijoles");
    cy.get(":nth-child(3) > .ingredient-list > :nth-child(1)").should("have.text",
    "crema mexicana");
  });

  it("Should allow a user to enter a name and select ingredients for their burrito", () => {
    cy.get("input[type=text]")
      .type("Immanuel")
      .get("button")
      .eq(0)
      .click()
      .get("button")
      .eq(4)
      .click()
      .get("p")
      .should("have.text", "Order: frijoles, queso fresco")
  });

  it("Should allow a user to submit their new order", () => {
    cy.get("input[type=text]")
      .type("Immanuel")
      .get("button")
      .eq(0)
      .click()
      .get("button")
      .eq(4)
      .click()
      .get(".orders-container")
      .children()
      .should("have.length", 3)
      .get("button[type=submit]")
      .click()
      .get(".orders-container")
      .children()
      .should("have.length", 4)
      .get(":nth-child(4) > h3")
      .should("have.text", "Immanuel");
  });

  it("Should allow a user to delete an order", () => {
    cy.get(".orders-container")
      .children()
      .should("have.length", 3)
      .get(".order")
      .eq(0)
      .children()
      .last()
      .click()
      .get(".orders-container")
      .children()
      .should("have.length", 2)
      .get(".order")
      .eq(0)
      .children()
      .first()
      .should("have.text", "Nacho")
  });

  it("Should only be able to submit the form when user has entered a name and at least one ingredient and should not be able to add more than two of any ingredient", () => {
    cy.get("button[type=submit]")
      .click()
      .get(".orders-container")
      .children()
      .should("have.length", 3)
      .get("button[type=submit]")
      .type("Immanuel")
      .click()
      .get(".error")
      .should("have.text", "Por favor, seleccione al menos un ingrediente!")
      .get(".orders-container")
      .children()
      .should("have.length", 3)
      .get("button")
      .eq(0)
      .click()
      .click()
      .click()
      .get(".error")
      .should("have.text", "Ya tienes demasiado de eso!")
  })
})