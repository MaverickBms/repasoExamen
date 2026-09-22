import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";
import { Icon, IconButton, type IconName } from "./icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  icon?: IconName;
}

export function Modal({ open, onClose, title, children, footer, size = "md", icon }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="modal-scrim" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn("modal", size === "lg" && "modal-lg", size === "sm" && "modal-sm")}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          {icon && <Icon name={icon} size={20} className="text-2" />}
          {title && <div className="modal-title">{title}</div>}
          <div style={{ marginLeft: "auto" }}>
            <IconButton ref={closeRef} name="x" label="Cerrar" onClick={onClose} />
          </div>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}