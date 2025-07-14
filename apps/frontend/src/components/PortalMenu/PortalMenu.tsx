import { createPopper, Instance } from "@popperjs/core";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PortalMenuProps } from "./PortalMenu.types";

export const PortalMenu = ({
  children,
  anchorRef,
  open,
}: PortalMenuProps & { open: boolean }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const popperInstance = useRef<Instance | null>(null);

  useEffect(() => {
    if (!open || !anchorRef || !menuRef.current) return;

    popperInstance.current = createPopper(anchorRef, menuRef.current, {
      placement: "bottom-end", // puedes cambiar a 'bottom-start', 'top', etc.
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8], // separación entre el anchor y el menú
          },
        },
        {
          name: "preventOverflow",
          options: {
            padding: 8,
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: ["top-end", "top-start"],
          },
        },
      ],
    });

    return () => {
      popperInstance.current?.destroy();
      popperInstance.current = null;
    };
  }, [anchorRef, open]);

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot || !open) return null;

  return createPortal(
    <div
      ref={menuRef}
      className="w-48 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg p-2 z-50">
      {children}
    </div>,
    portalRoot
  );
};
