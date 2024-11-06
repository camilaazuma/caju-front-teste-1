/// <reference types="cypress" />

describe("NewUserPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/#/new-user");
  });

  it("should render the form correctly", () => {
    cy.get('[aria-label="Voltar"]').should("exist");
    cy.get('[aria-label="Nome completo"]').should("exist");
    cy.get('[aria-label="Email"]').should("exist");
    cy.get('[aria-label="CPF"]').should("exist");
    cy.get('[aria-label="Data de admissão"]').should("exist");
    cy.get('[type="submit"]').should("exist").and("contain", "Cadastrar");
  });

  it("should validate form fields", () => {
    cy.get('[type="submit"]').click();
    cy.get('[role="alert"]').should("have.length", 4);
  });

  it("should submit the form with valid data", () => {
    cy.intercept("POST", "/registrations", {
      statusCode: 200,
      body: { code: "200" },
    }).as("postNewRegistration");

    cy.get('[aria-label="Nome completo"]').type("Camila Azuma");
    cy.get('[aria-label="Email"]').type("camila.a@gmail.com");
    cy.get('[aria-label="CPF"]').type("123.456.789-09");
    cy.get('[aria-label="Data de admissão"]').type("2024-11-05");
    cy.get('[type="submit"]').click();

    cy.get('[aria-label="Confirmar"]').click();

    cy.get(".Toastify__toast--success").should(
      "contain",
      "Nova admissão criada."
    );
    cy.url().should("include", "/dashboard");
  });

  it("should display error message on failed submission", () => {
    cy.intercept("POST", "/registrations", {
      statusCode: 500,
      body: { code: "500" },
    }).as("postNewRegistration");

    cy.get('[aria-label="Nome completo"]').type("Camila Azuma");
    cy.get('[aria-label="Email"]').type("camila.a@gmail.com");
    cy.get('[aria-label="CPF"]').type("123.456.789-09");
    cy.get('[aria-label="Data de admissão"]').type("2024-11-05");
    cy.get('[type="submit"]').click();

    cy.get('[aria-label="Confirmar"]').click();

    cy.wait("@postNewRegistration");
    cy.get(".Toastify__toast--error").should(
      "contain",
      "Houve um erro ao salvar os dados."
    );
  });

  it("should navigate back to dashboard on clicking 'Voltar'", () => {
    cy.get('[aria-label="Voltar"]').click();
    cy.url().should("include", "/dashboard");
  });
});
