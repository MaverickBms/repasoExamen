import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { Icon, IconButton, type IconName } from "./icons";

type ToastTone = "info" | "success" | "warning" | "danger" | "gold";

interface ToastInput {
  tone?: ToastTone;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastItem {
  id: number;
  tone: ToastTone;
  title: string;
  message?: string;
  duration: number;
  leaving: boolean;
}

interface ToastContextValue {
  showToast: (input: ToastInput) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TONE_ICON: Record<ToastTone, IconName> = {
  info: "info",
  success: "check",
  warning: "warning",
  danger: "error",
  gold: "spark",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => {
      const item = prev.find((t) => t.id === id);
      if (!item || item.leaving) return prev;
      window.setTimeout(() => {
        setToasts((cur) => cur.filter((t) => t.id !== id));
      }, 180);
      return prev.map((t) => (t.id === id ? { ...t, leaving: true } : t));
    });
  }, []);

  const showToast = useCallback(
    (input: ToastInput) => {
      const id = ++idRef.current;
      setToasts((prev) => [
        ...prev,
        {
          id,
          tone: input.tone ?? "info",
          title: input.title,
          message: input.message,
          duration: input.duration ?? 3200,
          leaving: false,
        },
      ]);
      window.setTimeout(() => dismiss(id), (input.duration ?? 3200) + 200);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-viewport" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn("toast", t.leaving && "toast-leaving")}
            style={
              {
                "--tt": `var(--${t.tone})`,
              } as CSSProperties
            }
          >
            <Icon name={TONE_ICON[t.tone]} size={18} style={{ color: `var(--${t.tone})` }} />
            <div>
              <div className="toast-title">{t.title}</div>
              {t.message && <div className="toast-msg">{t.message}</div>}
            </div>
            <IconButton name="x" label="Cerrar notificación" size={14} onClick={() => dismiss(t.id)} className="toast-close" />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast debe usarse dentro de <ToastProvider>");
  }
  return ctx;
}