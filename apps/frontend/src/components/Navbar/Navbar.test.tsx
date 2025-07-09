import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Navbar } from "./Navbar";

const mockOnLogin = jest.fn();
const mockOnLogout = jest.fn();
const mockOnRegister = jest.fn();
const mockOpenModal = jest.fn();

jest.mock("@/store", () => ({
  useUI: () => ({
    openModal: mockOpenModal,
  }),
}));

const defaultProps = {
  isAuthenticated: false,
  onLogin: mockOnLogin,
  onLogout: mockOnLogout,
  onRegister: mockOnRegister,
  userName: "Test User",
  logoUrl: "logo.png",
};

describe("Navbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders logo and title", () => {
    render(<Navbar {...defaultProps} />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByText("SQL Collaborator")).toBeInTheDocument();
  });

  it("calls openModal when Share button is clicked", () => {
    render(<Navbar {...defaultProps} />);
    fireEvent.click(screen.getByText("Share"));
    expect(mockOpenModal).toHaveBeenCalled();
  });

  it("shows login/register in dropdown when not authenticated", () => {
    render(<Navbar {...defaultProps} />);
    fireEvent.click(screen.getByAltText("User Avatar"));
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  it("calls onLogin when Login is clicked", () => {
    render(<Navbar {...defaultProps} />);
    fireEvent.click(screen.getByAltText("User Avatar"));
    fireEvent.click(screen.getByText("Login"));
    expect(mockOnLogin).toHaveBeenCalled();
  });

  it("calls onRegister when Register is clicked", () => {
    render(<Navbar {...defaultProps} />);
    fireEvent.click(screen.getByAltText("User Avatar"));
    fireEvent.click(screen.getByText("Register"));
    expect(mockOnRegister).toHaveBeenCalled();
  });

  it("shows username and logout when authenticated", () => {
    render(<Navbar {...defaultProps} isAuthenticated={true} />);
    fireEvent.click(screen.getByAltText("User Avatar"));
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls onLogout when Logout is clicked", () => {
    render(<Navbar {...defaultProps} isAuthenticated={true} />);
    fireEvent.click(screen.getByAltText("User Avatar"));
    fireEvent.click(screen.getByText("Logout"));
    expect(mockOnLogout).toHaveBeenCalled();
  });

  it("toggles theme and updates localStorage", () => {
    render(<Navbar {...defaultProps} />);
    const themeButton = screen.getAllByRole("button").find(btn =>
      btn.querySelector("svg")
    )!;
    // Default is light, click to dark
    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
    // Click again to light
    fireEvent.click(themeButton);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("closes dropdown when clicking outside", () => {
    render(<Navbar {...defaultProps} />);
    fireEvent.click(screen.getByAltText("User Avatar"));
    expect(screen.getByText("Login")).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
  });

  it("shows Moon icon when dark mode is active", () => {
    localStorage.setItem("theme", "dark");
    render(<Navbar {...defaultProps} />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    const moonIcon = screen.queryByTestId("lucide-moon") || screen.queryByLabelText("Moon");
    expect(moonIcon).toBeTruthy();
  });

  it("shows Sun icon when light mode is active", () => {
    localStorage.setItem("theme", "light");
    render(<Navbar {...defaultProps} />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    const sunIcon = screen.queryByTestId("lucide-sun") || screen.queryByLabelText("Sun");
    expect(sunIcon).toBeTruthy();
  });
});