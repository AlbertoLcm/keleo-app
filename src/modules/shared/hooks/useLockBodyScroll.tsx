import { useEffect } from 'react';

// Hook para bloquear el scroll elástico
const useLockBodyScroll = () => {
  useEffect(() => {
    // Al montar, bloqueamos el scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    return () => {
      // Al desmontar, restauramos
      document.body.style.overflow = originalStyle;
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, []);
};

export default useLockBodyScroll;