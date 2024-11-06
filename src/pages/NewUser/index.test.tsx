import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import NewUserPage from "./index";
import { ToastContainer } from "react-toastify";
import "@testing-library/jest-dom";
import { RegistrationService } from "@services";

jest.mock("@context/index", () => ({
  useLoadingContext: () => ({ setAppLoading: jest.fn() }),
  useConfirmationDialog: () => ({
    getConfirmation: jest.fn().mockResolvedValue(true),
  }),
}));

jest.mock("~/services/registrationService", () => ({
  postNewRegistration: jest.fn().mockResolvedValue({}),
}));

afterEach(() => {
  cleanup();
});

describe("NewUserPage", () => {
  const setup = () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <NewUserPage />
        <ToastContainer />
      </Router>
    );
    return { history };
  };

  const fillForm = () => {
    fireEvent.change(screen.getByLabelText(/Nome completo/i), {
      target: { value: "Camila Azuma" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "camila.a@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/CPF/i), {
      target: { value: "123.456.789-09" },
    });
    fireEvent.change(screen.getByLabelText(/Data de admissão/i), {
      target: { value: "2024-11-05" },
    });
  };

  it("renders the NewUserPage form", () => {
    setup();
    expect(screen.getByLabelText(/Nome completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CPF/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data de admissão/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Cadastrar/i })
    ).toBeInTheDocument();
  });

  it("validates form fields", async () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));
    await waitFor(() => {
      expect(screen.getAllByText(/Campo obrigatório/i)).toHaveLength(4);
    });
  });

  it("submits the form with valid data", async () => {
    const { history } = setup();
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText((content) => content.includes("Nova admissão criada"))
      ).toBeInTheDocument();
      expect(history.location.pathname).toBe("/dashboard");
    });
  });

  it("displays error message on failed submission", async () => {
    (RegistrationService.postNewRegistration as jest.Mock).mockRejectedValue({
      code: "500",
    });
    setup();
    fillForm();
    fireEvent.click(screen.getByRole("button", { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(
        screen.getByText((content) =>
          content.includes("Houve um erro ao salvar os dados")
        )
      ).toBeInTheDocument();
    });
  });
});
