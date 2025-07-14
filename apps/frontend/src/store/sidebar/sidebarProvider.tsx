"use client";

import { ReactNode, useState } from "react";
import { SidebarContext } from "./sidebarContext";

interface Props {
  children: ReactNode;
}

export const SidebarProvider = ({ children }: Props) => {
  const [sidebars, setSidebars] = useState<Record<string, boolean>>({});

  const openSidebar = (name: string) => {
    setSidebars(prev => ({ ...prev, [name]: true }));
  };

  const closeSidebar = (name: string) => {
    setSidebars(prev => ({ ...prev, [name]: false }));
  };

  const toggleSidebar = (name: string) => {
    setSidebars(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const isSidebarOpen = (name: string) => !!sidebars[name];

  return (
    <SidebarContext.Provider
      value={{ sidebars, openSidebar, closeSidebar, toggleSidebar, isSidebarOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
