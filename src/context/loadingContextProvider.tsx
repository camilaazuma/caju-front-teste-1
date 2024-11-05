import { ReactNode, createContext, useContext, useState } from "react";
import { AppLoading } from "@components/index";
import PropTypes from "prop-types";

const LoadingContext = createContext({
  isAppLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}
