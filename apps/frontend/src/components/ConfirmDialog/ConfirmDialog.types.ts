export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}
