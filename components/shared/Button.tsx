import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  children: ReactNode;
};

const variants = {
  primary:
    "bg-brand-primary text-white shadow-lift hover:bg-blue-900 disabled:bg-blue-300",
  secondary:
    "bg-brand-secondary text-white hover:bg-slate-800 disabled:bg-slate-400",
  outline:
    "border border-brand-border bg-white text-brand-text hover:border-brand-primary hover:text-brand-primary",
  ghost: "bg-transparent text-brand-text hover:bg-slate-100",
  danger: "bg-brand-error text-white hover:bg-red-700"
};

const sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
  icon: "h-10 w-10 p-0"
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus-ring disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
