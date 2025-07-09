"use client";
import { ReactNode, useState } from "react";
import { UIContext } from "./context";

interface Props {
  children: ReactNode;
}

export const UIProvider = ({ children }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <UIContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </UIContext.Provider>
  );
};