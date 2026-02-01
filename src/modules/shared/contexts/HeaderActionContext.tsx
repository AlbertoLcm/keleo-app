import { createContext, type ReactNode, useState } from "react";

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

  const updateActionHeader = (action: ReactNode) => setActionHeader(action);

  return (
    <HeaderActionContext.Provider value={{ actionHeader, updateActionHeader }}>
      {children}
    </HeaderActionContext.Provider>
  );
};
