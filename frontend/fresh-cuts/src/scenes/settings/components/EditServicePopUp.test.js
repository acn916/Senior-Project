import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditServicePopUp from "./EditServicePopUp";

describe("EditServicePopUp", () => {
  it("renders without crashing", () => {
    render(<EditServicePopUp />);
  });

  it("calls onSubmit function with edited data when submit button is clicked", () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    const selectedRow = {
      id: "123",
      name: "Service Name",
      price: 10,
      duration: "01:30:00",
      description: "Service Description",
    };

    const { getByLabelText, getByText } = render(
      <EditServicePopUp
        selectedRow={selectedRow}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    fireEvent.change(getByLabelText("Service"), {
      target: { value: "New Service Name" },
    });
    fireEvent.change(getByLabelText("Price"), { target: { value: "20" } });

    fireEvent.click(getByText("Submit"));

    expect(onSubmit).toHaveBeenCalledWith({
      id: "123",
      name: "New Service Name",
      price: 20,
      duration: "01:30:00", // No change in duration
      description: "Service Description", // No change in description
    });
  });

  it("calls onClose function when cancel button is clicked", () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    const selectedRow = {
      id: "123",
      name: "Service Name",
      price: 10,
      duration: "01:30:00",
      description: "Service Description",
    };

    const { getByText } = render(
      <EditServicePopUp
        selectedRow={selectedRow}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    );

    fireEvent.click(getByText("Cancel"));

    expect(onClose).toHaveBeenCalled();
  });
});
