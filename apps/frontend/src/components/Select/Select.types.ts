export interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  className?: string;
  "data-testid"?: string;
}
