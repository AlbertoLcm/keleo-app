import AppRoutes from '../routes/AppRoutes';
import { Toaster } from 'sileo';
import { useTheme } from '../modules/shared/contexts/ThemeContext';
import 'sileo/styles.css';

export default function App() {
  const { theme } = useTheme();

  return (
    <>
      <Toaster position="top-right" theme={theme} />
      <AppRoutes />
    </>
  );
}

