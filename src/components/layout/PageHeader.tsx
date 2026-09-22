import type { ReactNode } from "react";
import { Icon, type IconName } from "../common/icons";

interface PageHeaderProps {
  eyebrow?: string;
  eyebrowIcon?: IconName;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, eyebrowIcon, title, subtitle, actions }: PageHeaderProps) {
  return (
    <header className="page-head">
      <div>
        {eyebrow && (
          <div className="page-eyebrow">
            {eyebrowIcon && <Icon name={eyebrowIcon} size={14} />}
            {eyebrow}
          </div>
        )}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      {actions && <div className="row">{actions}</div>}
    </header>
  );
}