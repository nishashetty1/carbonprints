import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-surface rounded-xl shadow-sm border border-border p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
