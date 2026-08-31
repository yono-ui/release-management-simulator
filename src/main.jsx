import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { ReleasesProvider } from './context/ReleasesContext'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReleasesProvider>
      <App />
    </ReleasesProvider>
  </React.StrictMode>
)
