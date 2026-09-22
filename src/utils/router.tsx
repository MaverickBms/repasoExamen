import {
  createContext,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

const normalize = (path: string) => {
  const clean = path.split("?")[0];
  return clean.length > 1 ? clean.replace(/\/+$/, "") : clean;
};

const readHash = () => {
  if (typeof window === "undefined") return "/";
  return normalize(window.location.hash.replace(/^#/, "") || "/");
};

const RouterContext = createContext<string>("/");

export function navigate(to: string) {
  window.location.hash = normalize(to);
}

export function Link({
  to,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) {
  return <a href={`#${normalize(to)}`} {...rest} />;
}

export function HashRouter({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(readHash);

  useEffect(() => {
    const onChange = () => setPath(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return <RouterContext.Provider value={path}>{children}</RouterContext.Provider>;
}

export function useLocation() {
  return useContext(RouterContext);
}

export function isActive(current: string, path: string) {
  if (path === "/") return current === "/";
  return current === path || current.startsWith(`${path}/`);
}

/** Divide la ruta actual en segmentos: "/modulo/abstraccion" -> ["modulo", "abstraccion"] */
export function useSegments() {
  return useLocation().split("/").filter(Boolean);
}