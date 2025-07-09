import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("renders the title when provided", () => {
    render(<Card title="Test Title">Content</Card>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("does not render the title when not provided", () => {
    render(<Card>Content</Card>);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders children inside card-body", () => {
    render(<Card>Card Content</Card>);
    const body = screen.getByText("Card Content");
    expect(body).toBeInTheDocument();
    expect(body.parentElement).toHaveClass("card-body");
  });

  it("renders the footer when provided", () => {
    render(<Card footer="Footer Content">Content</Card>);
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
    expect(screen.getByText("Footer Content").parentElement).toHaveClass("card-footer");
  });

  it("does not render the footer when not provided", () => {
    render(<Card>Content</Card>);
    expect(screen.queryByText("Footer Content")).not.toBeInTheDocument();
  });

  it("renders all elements with correct classes", () => {
    render(<Card title="Title" footer="Footer">Body</Card>);
    expect(screen.getByText("Title")).toHaveClass("card-title");
    expect(screen.getByText("Body").parentElement).toHaveClass("card-body");
    expect(screen.getByText("Footer").parentElement).toHaveClass("card-footer");
  });
});