export interface NavbarProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onRegister: () => void;
  userName?: string;
  logoUrl?: string;
}