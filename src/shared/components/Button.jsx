import { motion } from "framer-motion";

export const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
  className = "",
}) => {
  const baseStyle =
    "px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    outline: "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};
