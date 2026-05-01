import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './app/App.tsx'
import { AuthProvider } from './modules/auth/context/AuthContext.tsx'
import { ThemeProvider } from './modules/shared/contexts/ThemeContext.tsx'
import { SubscriptionProvider } from './modules/subscriptions'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <SubscriptionProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </BrowserRouter>,
)

