const SelectionButton = ({
  children,
  onClick,
  isSelected = false,
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "w-full text-center p-3 sm:p-4 border rounded-lg transition-all duration-200 text-sm sm:text-base font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  const selectedStyles =
    "bg-primary text-white border-primary shadow-md scale-105";

  const unselectedStyles =
    "bg-surface text-text-light border-border hover:border-primary hover:text-primary";

  const disabledStyles =
    "bg-background text-text-light/50 border-border opacity-60 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${
        disabled
          ? disabledStyles
          : isSelected
          ? selectedStyles
          : unselectedStyles
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default SelectionButton;
