export interface NavbarProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  userName?: string;
  logoUrl?: string;
}