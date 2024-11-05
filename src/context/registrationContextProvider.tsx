import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";

interface RegistrationContextProps {
  refetch: () => void;
  cpf?: string;
  setCpf?: (arg: any) => void;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(
  undefined
);

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error(
      "useRegistrationContext must be used within a RegistrationProvider"
    );
  }
  return context;
};

export const RegistrationProvider: React.FC<{
  children: ReactNode;
  onRefetch: () => void;
  cpf?: string;
  setCpf?: (arg: any) => void;
}> = ({ children, onRefetch, cpf, setCpf }) => {
  const refetch = useCallback(() => {
    onRefetch();
  }, [onRefetch]);

  return (
    <RegistrationContext.Provider value={{ refetch, cpf, setCpf }}>
      {children}
    </RegistrationContext.Provider>
  );
};
