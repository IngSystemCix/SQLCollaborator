import { createContext } from "react";

export interface UIContextProps {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const UIContext = createContext<UIContextProps | undefined>(undefined);