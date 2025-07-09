import { useEffect, useRef, useState } from "react";
import avatar from "@assets/img/avatar.png";
import {
  Download,
  KeyIcon,
  LogIn,
  LogOut,
  LucideShare2,
  MenuIcon,
  Moon,
  Sun,
  Users2,
} from "lucide-react";
import "./Navbar.module.css";
import { NavbarProps } from "./Navbar.types";
import { useUI } from "@/store";

export const Navbar = ({
  isAuthenticated,
  onLogin,
  onLogout,
  onRegister,
  userName,
  logoUrl,
}: NavbarProps) => {
  const { openModal } = useUI();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const root = document.documentElement;

    if (newTheme) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="navbar z-10">
      <div className="flex items-center justify-center space-x-2">
        <button className="btn-flat">
          <MenuIcon className="w-6 h-6" />
        </button>
        <div className="w-px h-8 bg-gray-300 mx-2"></div>
        <img src={logoUrl} alt="Logo" className="w-8 h-8" />
        <span className="text-lg font-semibold text-black dark:text-white hidden lg:block">
          SQL Collaborator
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <button className="btn-outline" onClick={openModal}>
          <LucideShare2 className="w-4 h-4" />
          <span className="hidden lg:block">Share</span>
        </button>
        <button className="btn-outline">
          <Download className="w-4 h-4" />
          <span className="hidden lg:block">Export SQL</span>
        </button>
        <button className="btn-flat">
          <Users2 className="w-4 h-4" />
          <span className="hidden lg:block">Collaborators</span>
        </button>
        <button className="btn-flat" onClick={toggleTheme}>
          {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Avatar y Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="avatar-container">
            <img src={avatar} alt="User Avatar" className="avatar" />
          </button>

          {dropdownOpen && (
            <div className="dropdown bg-white dark:bg-gray-800 shadow-lg rounded-md">
              {isAuthenticated ? (
                <div className="dropdown-content">
                  <span className="text-nowrap px-4 py-2 text-black dark:text-gray-100">
                    {userName}
                  </span>
                  <hr className="dropdown-divider border-gray-200 dark:border-gray-700" />
                  <button
                    className="dropdown-item hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400 w-full text-left text-black dark:text-gray-100"
                    onClick={onLogout}>
                    <div className="tag-danger">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="dropdown-content">
                  <button
                    className="dropdown-item hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900 dark:hover:text-green-400 w-full text-left text-black dark:text-gray-100"
                    onClick={onLogin}>
                    <div className="tag-success">
                      <KeyIcon className="w-4 h-4" />
                    </div>
                    <span>Login</span>
                  </button>
                  <button
                    className="dropdown-item w-full text-left hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-400 text-black dark:text-gray-100"
                    onClick={onRegister}>
                    <div className="tag-info">
                      <LogIn className="w-4 h-4" />
                    </div>
                    <span>Register</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
