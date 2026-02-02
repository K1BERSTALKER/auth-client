import React from "react";

interface TogglePanelProps {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  className?: string;
}

const TogglePanel: React.FC<TogglePanelProps> = ({
  title,
  description,
  buttonText,
  onClick,
  className,
}) => {
  return (
    <div
      className={` absolute top-0 w-1/2 h-full flex flex-col items-center justify-center p-8 text-center transition-transform duration-600 text-white ${className} `}
    >
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <p className="mb-5">{description}</p>
      <button
        type="button"
        onClick={onClick}
        className="px-10 py-3 bg-white text-purple-700 rounded-lg font-semibold uppercase tracking-wide z-30 relative"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default TogglePanel;
