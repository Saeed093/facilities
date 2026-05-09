import { cn } from "@/lib/utils";

type Props = {
  /** Admin sidebar (navy) vs member app (light) */
  variant?: "sidebar" | "member";
  className?: string;
};

/**
 * Subtle “powered by Kinotechai” line.
 * Uses Ethnocentric when you add the font (see globals.css); otherwise Orbitron from next/font (similar wide tech look).
 */
export function PoweredByKinotech({ variant = "member", className }: Props) {
  return (
    <p
      className={cn(
        "font-kinotech-branding text-center",
        variant === "sidebar" &&
          "text-[8px] sm:text-[9px] text-white/30 pt-3 pb-0",
        variant === "member" &&
          "text-[8px] sm:text-[9px] text-[#0B1F3A]/20 mt-8 mb-1",
        className
      )}
      aria-hidden
    >
      powered by Kinotechai
    </p>
  );
}
