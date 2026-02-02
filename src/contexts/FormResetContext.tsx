import React from "react";

type FormResetContextType = {
  resetTrigger: number;
  triggerReset: () => void;
};

const FormResetContext = React.createContext<FormResetContextType | null>(null);

export const FormResetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resetTrigger, setResetTrigger] = React.useState(0);

  const triggerReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <FormResetContext.Provider value={{ resetTrigger, triggerReset }}>
      {children}
    </FormResetContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormReset = (): FormResetContextType => {
  const context = React.useContext(FormResetContext);
  if (!context) {
    throw new Error("useFormReset must be used within FormResetProvider");
  }
  return context;
};
