import { motion } from "framer-motion";

export const NeonButton = ({
  children,
  variant = "cyan",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}) => {
  const variantStyles = {
    cyan: "bg-neon-cyan/10 text-neon-cyan border-neon-cyan/30 hover:bg-neon-cyan/20 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)]",
    purple:
      "bg-neon-purple/10 text-neon-purple border-neon-purple/30 hover:bg-neon-purple/20 hover:shadow-[0_0_25px_rgba(184,41,221,0.3)]",
    green:
      "bg-neon-green/10 text-neon-green border-neon-green/30 hover:bg-neon-green/20 hover:shadow-[0_0_25px_rgba(0,255,157,0.3)]",
    ghost:
      "bg-transparent text-text-secondary border-white/10 hover:bg-white/5 hover:text-text-primary",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold",
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`relative overflow-hidden rounded-xl border font-medium transition-all duration-300 ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <motion.div
        className="absolute inset-0 bg-white/10"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{ x: "100%", opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      />
    </motion.button>
  );
};
