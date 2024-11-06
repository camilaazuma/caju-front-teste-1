import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Dialog } from "@components";

jest.mock("@hooks/useFetchRegistrations");

afterEach(() => {
  cleanup();
});

const renderDialog = (props = {}) => {
  const defaultProps = {
    title: "Test Dialog",
    isOpen: true,
    onDismiss: jest.fn(),
    onConfirm: jest.fn(),
    ...props,
  };

  return render(<Dialog {...defaultProps} />);
};

describe("Dialog", () => {
  it("should call onDismiss when cancel button is clicked in Dialog", () => {
    const onDismissMock = jest.fn();
    renderDialog({ onDismiss: onDismissMock });

    fireEvent.click(screen.getByRole("button", { name: /Cancelar/i }));

    expect(onDismissMock).toHaveBeenCalled();
  });

  it("should call onConfirm when ok button is clicked in Dialog", () => {
    const onConfirmMock = jest.fn();
    renderDialog({ onConfirm: onConfirmMock });

    fireEvent.click(screen.getByRole("button", { name: /Confirmar/i }));

    expect(onConfirmMock).toHaveBeenCalled();
  });

  it("should have role dialog", () => {
    renderDialog();

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should have aria-labelledby attribute", () => {
    renderDialog();

    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-labelledby",
      "dialog-title"
    );
  });

  it("should have aria-describedby attribute when message is provided", () => {
    renderDialog({ message: "This is a test message" });

    expect(screen.getByRole("dialog")).toHaveAttribute(
      "aria-describedby",
      "dialog-description"
    );
  });
});
