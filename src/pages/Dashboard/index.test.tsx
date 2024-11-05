import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import DashboardPage from "./";
import useFetchRegistrations from "@hooks/useFetchRegistrations";
import { ConfirmationDialogProvider } from "@context/confirmationDialogContextProvider";
import registrationsMock from "./mocks/registrationsMock";

jest.mock("@hooks/useFetchRegistrations");

const setupMock = (data: any, loading: boolean, refetch: jest.Mock) => {
  (useFetchRegistrations as jest.Mock).mockReturnValue({
    data,
    loading,
    refetch,
  });
};

const renderDashboardPage = () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ConfirmationDialogProvider>
        <DashboardPage />
      </ConfirmationDialogProvider>
    </Router>
  );
  return history;
};

afterEach(() => {
  cleanup();
});

describe("DashboardPage", () => {
  it("should render the search bar and columns", async () => {
    setupMock(registrationsMock, false, jest.fn());
    renderDashboardPage();

    expect(
      screen.getByPlaceholderText(/Digite um CPF válido/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Nova Admissão/i })
    ).toBeInTheDocument();
  });

  it("should navigate to new user page when 'Nova Admissão' button is clicked", () => {
    setupMock(registrationsMock, false, jest.fn());
    const history = renderDashboardPage();

    fireEvent.click(screen.getByRole("button", { name: /Nova Admissão/i }));

    expect(history.location.pathname).toBe("/new-user");
  });

  it("should refetch data when refresh button is clicked", async () => {
    const refetchMock = jest.fn();
    setupMock(registrationsMock, false, refetchMock);
    renderDashboardPage();

    const refreshButton = screen.getByLabelText(/Atualizar dados/i);
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(refetchMock).toHaveBeenCalled();
    });
  });
});
