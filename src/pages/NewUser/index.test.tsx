import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import NewUserPage from "./";

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

  it("should submit the form with valid data", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NewUserPage />
      </Router>
    );

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Nome completo/i), {
        target: { value: "John Doe" },
      });
      fireEvent.change(screen.getByLabelText(/Email/i), {
        target: { value: "john.doe@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/CPF/i), {
        target: { value: "123.456.789-09" },
      });
      fireEvent.change(screen.getByLabelText(/Data de admissão/i), {
        target: { value: "2023-01-01" },
      });

      fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));
    });

    expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(/john.doe@example.com/i)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123.456.789-09/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/2023-01-01/i)).toBeInTheDocument();
  });
});
