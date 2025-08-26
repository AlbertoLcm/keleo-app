import { createContext, type ReactNode, useState, useCallback, useMemo } from "react";

interface HeaderActionContextType {
  actionHeader: ReactNode;
  updateActionHeader: (action: ReactNode) => void;
}

export const HeaderActionContext = createContext<
  HeaderActionContextType | undefined
>(undefined);

export const HeaderActionProvider = ({ children }: { children: ReactNode }) => {
  const [actionHeader, setActionHeader] = useState<ReactNode | undefined>(
    undefined
  );

  const updateActionHeader = useCallback((action: ReactNode) => {
    setActionHeader(action);
  }, []);

  const value = useMemo(() => ({ actionHeader, updateActionHeader }), [actionHeader, updateActionHeader]);

  return (
    <HeaderActionContext.Provider value={value}>
      {children}
    </HeaderActionContext.Provider>
  );
};
