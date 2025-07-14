import { createContext } from "react";

export interface SidebarContextProps {
  sidebars: Record<string, boolean>;
  openSidebar: (name: string) => void;
  closeSidebar: (name: string) => void;
  toggleSidebar: (name: string) => void;
  isSidebarOpen: (name: string) => boolean;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);
