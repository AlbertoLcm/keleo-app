import { useContext } from "react";
import { HeaderActionContext } from "../contexts/HeaderActionContext"

const useHeaderAction = () => {
  const context = useContext(HeaderActionContext);
  if (!context) throw new Error('Debe utilizarse dentro del contexto AuthProvider');
  return context;
};

export default useHeaderAction;