import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/theme.css';
import './index.css'
import { ChatProvider } from './store/ChatProvider.tsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/routes.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  </StrictMode>
)
