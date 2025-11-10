import { render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

describe("button tests", () => {
  test("should render base button when nothing is passed", () => {
    render(<Button />);

    const btnElement = screen.getByRole("button");

    expect(btnElement).toHaveStyle("background-color: black;");
  });

  test("should render the google button when the type passed is google", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.google} />);

    const btnElement = screen.getByRole("button");

    expect(btnElement).toHaveStyle("background-color: #4285f4;");
  });

  test("should render the inverted button when the type passed is inverted", () => {
    render(<Button buttonType={BUTTON_TYPE_CLASSES.inverted} />);

    const btnElement = screen.getByRole("button");

    expect(btnElement).toHaveStyle(" background-color: white;");
  });

  test("should be disabled when isLoading passed is true", () => {
    render(<Button isLoading={true} />);
    const btnElement = screen.getByRole("button");
    expect(btnElement).toBeDisabled();
  });
});
