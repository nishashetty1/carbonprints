const Button = ({
  children,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  icon = null,
}) => {
  const baseStyles =
    "flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary-hover focus-visible:ring-primary disabled:bg-primary/60 disabled:cursor-not-allowed",
    secondary:
      "bg-surface text-primary border border-primary hover:bg-primary/10 focus-visible:ring-primary disabled:text-primary/60 disabled:border-primary/40 disabled:cursor-not-allowed",
    outline:
      "bg-transparent border border-border text-text-light hover:bg-background hover:border-primary hover:text-primary focus-visible:ring-primary disabled:opacity-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
