import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddPopUp from "./AddPopUp";
import "@testing-library/jest-dom";

describe("AddPopUp", () => {
  it("renders without crashing", () => {
    render(<AddPopUp />);
  });

  it("displays error message when submitting without a service name", async () => {
    render(<AddPopUp onSubmit={() => {}} onClose={() => {}} />);

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Service name is required")).toBeInTheDocument();
    });
  });

  test("does not display error message when submitting with a service name", async () => {
    render(<AddPopUp onSubmit={() => {}} onClose={() => {}} />);

    const serviceNameInput = screen.getByLabelText("Name");
    fireEvent.change(serviceNameInput, { target: { value: "Service Name" } });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    // Ensure the error message is not rendered
    expect(screen.queryByText("Service name is required")).toBeNull();
  });

  it("calls onSubmit function with form data when submit button is clicked", async () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();

    const { getByLabelText, getByText } = render(
      <AddPopUp onSubmit={onSubmit} onClose={onClose} />
    );

    fireEvent.change(getByLabelText("Name"), {
      target: { value: "Test Service" },
    });
    fireEvent.change(getByLabelText("Price"), { target: { value: "10" } });
    fireEvent.change(getByLabelText("Description"), {
      target: { value: "Test Description" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: "Test Service",
        price: 10,
        duration: "",
        description: "Test Description",
      });
    });
  });

  it("calls onClose function when cancel button is clicked", () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();

    const { getByText } = render(
      <AddPopUp onSubmit={onSubmit} onClose={onClose} />
    );

    fireEvent.click(getByText("Cancel"));

    expect(onClose).toHaveBeenCalled();
  });
});
