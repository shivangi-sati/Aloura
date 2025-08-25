import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { WellBeingProvider } from './context/WellBeingContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <WellBeingProvider>
        <App />
      </WellBeingProvider>
    </BrowserRouter>
  </StrictMode>,
)
