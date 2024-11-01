import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import NewUserPage from "./";

afterEach(() => {
  cleanup();
});

describe("NewUserPage", () => {
  it("should render the form fields and submit button", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NewUserPage />
      </Router>
    );

    expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de admissão/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cadastrar/i })
    ).toBeInTheDocument();
  });

  it("should show validation errors when submitting empty form", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NewUserPage />
      </Router>
    );

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));
    });

    expect(await screen.findAllByText(/Campo obrigatório/i)).toHaveLength(4);
  });

  it("should navigate to dashboard when back button is clicked", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NewUserPage />
      </Router>
    );

    act(() => {
      fireEvent.click(screen.getByLabelText(/back/i));
    });

    expect(history.location.pathname).toBe("/dashboard");
  });
});
