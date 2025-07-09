export interface MessageProps {
  text: string;
  type?: "info" | "success" | "error" | "warning";
  className?: string;
  onClick?: () => void;
  onClose?: () => void;
  showCloseButton?: boolean;
  showIcon?: boolean;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  autoDismiss?: boolean;
  dismissAfter?: number; // in milliseconds
  id?: string; // Optional ID for testing or tracking
  "data-testid"?: string; // Optional data-testid for testing
  animation?: boolean; // Optional prop to control animation
  animationDuration?: number; // Duration of the animation in milliseconds
  animationType?: "fade" | "slide" | "scale"; // Type of animation
  animationDirection?: "up" | "down" | "left" | "right";
}