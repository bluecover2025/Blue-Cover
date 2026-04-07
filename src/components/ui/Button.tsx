import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "gold" | "navy" | "outline" | "outline-light";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  gold: "bg-gold text-navy-deep hover:brightness-110",
  navy: "bg-navy text-white hover:bg-blue",
  outline: "bg-transparent text-navy border border-navy/20 hover:border-navy/40",
  "outline-light": "bg-transparent text-white border border-white/30 hover:border-white/60",
};

export default function Button({
  variant = "gold",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-[6px] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.15em] transition-all whitespace-nowrap cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
