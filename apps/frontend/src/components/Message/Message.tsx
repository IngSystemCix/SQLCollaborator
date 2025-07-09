import { motion } from "framer-motion";
import { Check, Info, SquareX, TriangleAlert } from "lucide-react";
import React, { useEffect } from "react";
import { MessageProps } from "./Message.types";

const typeIcons: Record<string, React.ReactNode> = {
  info: <Info className="w-5 h-5" />,
  success: <Check className="w-5 h-5" />,
  error: <SquareX className="w-5 h-5" />,
  warning: <TriangleAlert className="w-5 h-5" />,
};

const getVariants = (
  type: string,
  direction: string,
  duration: number
) => {
  const distance = 24; // menor para suavidad
  const durationSeconds = duration / 1000;
  const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1]; // ease-in-out

  switch (type) {
    case "slide":
      const translate =
        direction === "left"
          ? { x: -distance, y: 0 }
          : direction === "right"
          ? { x: distance, y: 0 }
          : direction === "top"
          ? { y: -distance, x: 0 }
          : { y: distance, x: 0 };

      return {
        hidden: {
          opacity: 0,
          ...translate,
        },
        visible: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            duration: durationSeconds,
            ease: easing as [number, number, number, number],
          },
        },
        exit: {
          opacity: 0,
          ...translate,
          transition: {
            duration: durationSeconds,
            ease: easing,
          },
        },
      };

    case "scale":
      return {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: durationSeconds,
            ease: easing,
          },
        },
        exit: {
          opacity: 0,
          scale: 0.95,
          transition: {
            duration: durationSeconds,
            ease: easing,
          },
        },
      };

    case "fade":
    default:
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: durationSeconds,
            ease: easing,
          },
        },
        exit: {
          opacity: 0,
          transition: {
            duration: durationSeconds,
            ease: easing,
          },
        },
      };
  }
};

export const Message = ({
  text,
  type = "info",
  className = "",
  onClick,
  onClose,
  showCloseButton = false,
  showIcon = false,
  icon,
  style,
  children,
  autoDismiss = false,
  dismissAfter = 3000,
  id,
  "data-testid": dataTestId,
  animation = false,
  animationDuration = 300,
  animationType = "fade", // fade | slide
  animationDirection = "right", // left | right | top | bottom
}: MessageProps) => {
  useEffect(() => {
    if (autoDismiss && onClose) {
      const timer = setTimeout(onClose, dismissAfter);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss, onClose, dismissAfter]);

  const variants = getVariants(
    animationType,
    animationDirection,
    animationDuration
  );

  const content = (
    <div
      id={id}
      className={`message message-${type} ${className}`}
      style={style}
      onClick={onClick}
      data-testid={dataTestId}>
      {showIcon && (icon || typeIcons[type])}
      <span>{text}</span>
      {children}
      {showCloseButton && onClose && (
        <button
          type="button"
          className="message-close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Close">
          <SquareX className="w-5 h-5" />
        </button>
      )}
    </div>
  );

  if (!animation) return content;

  return (
    <motion.div
      key={id}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      layout>
      {content}
    </motion.div>
  );
};
