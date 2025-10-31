import { forwardRef } from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
          variant === "primary"
            ? "bg-slate-900 text-white hover:bg-slate-800"
            : "border border-slate-300 text-slate-900 hover:border-slate-400",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
