import { ReactNode, createContext, useContext, useState } from "react";
import { AppLoading } from "@components/index";

const LoadingContext = createContext({
  isAppLoading: false,
  setAppLoading: (_arg: any) => {},
});

export const LoadingProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isAppLoading, setAppLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isAppLoading, setAppLoading }}>
      {children}
      {isAppLoading && <AppLoading />}
    </LoadingContext.Provider>
  );
};

export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
