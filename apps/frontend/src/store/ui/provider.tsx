"use client";
import { ReactNode, useState } from "react";
import { UIContext } from "./context";

interface Props {
  children: ReactNode;
}

export const UIProvider = ({ children }: Props) => {
  const [modals, setModals] = useState<Record<string, boolean>>({});

  const openModal = (name: string) => {
    setModals(prev => ({ ...prev, [name]: true }));
  };

  const closeModal = (name: string) => {
    setModals(prev => ({ ...prev, [name]: false }));
  };

  const isModalOpen = (name: string) => !!modals[name];

  return (
    <UIContext.Provider value={{ modals, openModal, closeModal, isModalOpen }}>
      {children}
    </UIContext.Provider>
  );
};
