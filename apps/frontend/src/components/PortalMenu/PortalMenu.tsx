import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { PortalMenuProps } from "./PortalMenu.types";

export const PortalMenu = ({
  children,
  anchorRef,
  open,
}: PortalMenuProps & { open: boolean }) => {
  const [style, setStyle] = useState<React.CSSProperties>();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!anchorRef || !open) return;

    const updatePosition = () => {
      const rect = anchorRef.getBoundingClientRect();
      setStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY + 8,
        left: rect.right - 192 + window.scrollX,
        zIndex: 9999,
      });
    };

    updatePosition();
  }, [anchorRef, open]);

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot || !style || !open) return null;

  return createPortal(
    <div
      ref={menuRef}
      style={style}
      className="w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg p-2 z-50"
    >
      {children}
    </div>,
    portalRoot
  );
};

