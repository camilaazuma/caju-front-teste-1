/// <reference types="cypress" />

describe("DashboardPage", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it("should render the search bar and columns", () => {
    cy.get('[placeholder="Digite um CPF válido"]').should("exist");
    cy.get('[aria-label="Atualizar dados"]').should("exist");
    cy.get('[aria-label="Limpar busca"]').should("exist");
    cy.get('[aria-label="Nova Admissão"]').should("exist");
    cy.get("h3").contains("Pronto para revisar").should("exist");
    cy.get("h3").contains("Aprovado").should("exist");
    cy.get("h3").contains("Reprovado").should("exist");
  });

  it("should navigate to new user page when 'Nova Admissão' button is clicked", () => {
    cy.get('[aria-label="Nova Admissão"]').click();
    cy.url().should("include", "/new-user");
  });

  it("should refetch data when refresh button is clicked", () => {
    cy.fixture("registrations.json").then((list) => {
      cy.intercept("GET", "/registrations", { body: list }).as(
        "getRegistrationsList"
      );
    });
    cy.get('[aria-label="Atualizar dados"]').click();
    cy.wait("@getRegistrationsList", { timeout: 10000 });
  });

  it("should filter registrations by CPF", () => {
    cy.fixture("registrations.json").then((list) => {
      const filtered = list.filter((reg) => reg.cpf === "37026454030");
      cy.intercept("GET", "/registrations", { body: filtered }).as(
        "queryRegistrationsByCpf"
      );
    });

    cy.get('[placeholder="Digite um CPF válido"]').type("370.264.540-30");
    cy.wait("@queryRegistrationsByCpf");
    cy.get('[status="REVIEW"]')
      .first()
      .within(() => {
        cy.get("h3").contains("Camila Naomi Azuma").should("exist");
        cy.get("p").contains("camilaazuma@outlook.com").should("exist");
        cy.get("span").contains("04/11/2024").should("exist");
      });

    cy.get('[aria-label="Atualizar status para Review"]').should("not.exist");
  });

  it("should clear the search input when 'Limpar busca' button is clicked", () => {
    cy.get('[placeholder="Digite um CPF válido"]').type("123.456.789-01");
    cy.get('[aria-label="Limpar busca"]').click();
    cy.get('[placeholder="Digite um CPF válido"]').should("have.value", "");
  });

  it("should update registration status to 'Aprovado'", () => {
    cy.fixture("registrations.json").then((list) => {
      const updated = list.map((reg) =>
        reg.status === "REVIEW" ? { ...reg, status: "APPROVED" } : reg
      );
      cy.intercept("PUT", "/registrations/*", { body: updated }).as(
        "updateRegistrationStatus"
      );
    });

    cy.get('[aria-label="Atualizar status para Aprovado"]').first().click();
    cy.get('[aria-label="Confirmar"]').click();
    cy.wait("@updateRegistrationStatus");
    cy.get(".Toastify__toast--success").should("contain", "Status atualizado");
  });

  it("should update registration status to 'Reprovado'", () => {
    cy.fixture("registrations.json").then((list) => {
      const updated = list.map((reg) =>
        reg.status === "REVIEW" ? { ...reg, status: "REPROVED" } : reg
      );
      cy.intercept("PUT", "/registrations/*", { body: updated }).as(
        "updateRegistrationStatus"
      );
    });

    cy.get('[aria-label="Atualizar status para Reprovado"]').first().click();
    cy.get('[aria-label="Confirmar"]').click();
    cy.wait("@updateRegistrationStatus");
    cy.get(".Toastify__toast--success").should("contain", "Status atualizado");
  });

  it("should delete a registration", () => {
    cy.intercept("DELETE", "/registrations/*", {
      statusCode: 200,
    }).as("deleteRegistration");

    cy.get('[aria-label="Deletar registro"]').first().click();
    cy.get('[aria-label="Confirmar"]').click();
    cy.wait("@deleteRegistration");
    cy.get(".Toastify__toast--success").should("contain", "Registro excluído");
  });
});
