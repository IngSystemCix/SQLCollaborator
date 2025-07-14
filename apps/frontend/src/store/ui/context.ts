import { createContext } from "react";

export interface UIContextProps {
  modals: Record<string, boolean>;
  openModal: (name: string) => void;
  closeModal: (name: string) => void;
  isModalOpen: (name: string) => boolean;
}

export const UIContext = createContext<UIContextProps | undefined>(undefined);