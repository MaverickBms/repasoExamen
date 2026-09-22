import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Link } from "../../utils/router";
import { SpinnerIcon } from "./icons";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "gold";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  block?: boolean;
  children?: ReactNode;
}

type NativeButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> &
  ButtonBaseProps;

interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children">,
    ButtonBaseProps {
  to: string;
}

export type ButtonProps = NativeButtonProps | ButtonLinkProps;

function classes(
  variant: ButtonVariant,
  size: ButtonSize,
  block: boolean,
  extra?: string,
) {
  return cn("btn", `btn-${variant}`, `btn-${size}`, block && "btn-block", extra);
}

function Content({ loading, children }: { loading?: boolean; children?: ReactNode }) {
  if (!loading) return <>{children}</>;
  return (
    <>
      <SpinnerIcon />
      <span className="visually-hidden">Cargando…</span>
      {children}
    </>
  );
}

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const block = props.block ?? false;

  if ("to" in props) {
    const {
      to,
      variant: v,
      size: s,
      block: b,
      loading,
      className,
      children,
      ...rest
    } = props as ButtonLinkProps;
    return (
      <Link
        to={to}
        className={classes(v ?? "primary", s ?? "md", b ?? false, className)}
        aria-busy={loading}
        {...rest}
      >
        <Content loading={loading}>{children}</Content>
      </Link>
    );
  }

  const {
    variant: v,
    size: s,
    block: b,
    loading,
    className,
    children,
    disabled,
    ...rest
  } = props as NativeButtonProps;

  return (
    <button
      type="button"
      className={classes(v ?? "primary", s ?? "md", b ?? false, className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      <Content loading={loading}>{children}</Content>
    </button>
  );
}