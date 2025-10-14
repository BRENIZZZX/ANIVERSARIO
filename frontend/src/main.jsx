import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Ponto de entrada da aplicação React
// ReactDOM.createRoot cria a raiz da aplicação no elemento com id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* StrictMode ajuda a detectar problemas durante o desenvolvimento */}
    <App />
  </React.StrictMode>,
)