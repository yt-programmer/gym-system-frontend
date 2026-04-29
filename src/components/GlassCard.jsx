import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const GlassCard = ({
  children,
  className = "",
  hover = true,
  glow = "none",
  tilt = false,
  ...props
}) => {
  const glowClass =
    glow === "cyan"
      ? "hover:neon-border-cyan"
      : glow === "purple"
        ? "hover:neon-border-purple"
        : glow === "green"
          ? "hover:neon-border-green"
          : "";

  return (
    <motion.div
      whileHover={
        hover
          ? {
              scale: 1.02,
              rotateX: tilt ? 2 : 0,
              rotateY: tilt ? -2 : 0,
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "glass rounded-2xl p-6 transition-colors duration-300",
        glowClass,
        className,
      )}
      style={{ transformStyle: tilt ? "preserve-3d" : undefined }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
