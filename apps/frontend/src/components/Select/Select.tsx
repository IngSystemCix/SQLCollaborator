import { useState, useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";
import { SelectProps } from "./Select.types";

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  isDisabled = false,
  isClearable = true,
  className = "",
  "data-testid": dataTestId = "select-component",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val: string) => {
    if (onChange) {
      onChange(val);
    }
    setIsOpen(false);
  };

  const handleClear = () => {
    if (onChange) onChange("");
    setIsOpen(false);
  };

  // Cierra el dropdown si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative w-full ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      ref={selectRef}
      data-testid={dataTestId}
    >
      {/* Trigger */}
      <div
        className={`flex justify-between items-center border px-4 py-[0.6rem] rounded cursor-pointer bg-white dark:bg-gray-800 ${
          isOpen ? "border-blue-500" : "border-gray-300"
        }`}
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
      >
        <span className={`text-sm ${!selectedOption ? "text-gray-400" : "text-black dark:text-white"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className="flex items-center space-x-1">
          {isClearable && selectedOption && (
            <X
              className="w-4 h-4 text-gray-400 hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            />
          )}
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && !isDisabled && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-md z-50">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`px-3 py-2 text-sm hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer ${
                opt.value === value ? "bg-blue-50 dark:bg-gray-800 font-bold" : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
