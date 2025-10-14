import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import BackgroundCanvas from './components/BackgroundCanvas'
import Footer from './components/Footer'

function App() {
  // Estado para controlar se o usuário está logado
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // Estado para armazenar dados do usuário
  const [user, setUser] = useState(null)

  // useEffect para verificar se há token salvo no localStorage ao carregar a página
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      // Se há token e dados do usuário, considera como autenticado
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    }
  }, []) // Array vazio significa que executa apenas uma vez ao montar o componente

  // Função para fazer login (chamada pelos componentes Login e QRCode)
  const handleLogin = (token, userData) => {
    // Salva token e dados do usuário no localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    
    // Atualiza estados da aplicação
    setIsAuthenticated(true)
    setUser(userData)
  }

  // Função para fazer logout
  const handleLogout = () => {
    // Remove dados do localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    
    // Reseta estados da aplicação
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <Router>
      <div className="min-h-screen relative">
        {/* Componente de fundo animado com flores e corações */}
        <BackgroundCanvas />
        
        {/* Header fixo no topo */}
        <Header 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />
        
        {/* Conteúdo principal com padding para não sobrepor o header */}
        <main className="pt-20 pb-20">
          <Routes>
            {/* Rota da página inicial */}
            <Route path="/" element={<Home />} />
            
            {/* Rota de login - redireciona para profile se já estiver logado */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/profile" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            
            {/* Rota de cadastro - redireciona para profile se já estiver logado */}
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? 
                <Navigate to="/profile" replace /> : 
                <Signup onLogin={handleLogin} />
              } 
            />
            
            {/* Rota do perfil - só acessível se estiver logado */}
            <Route 
              path="/profile" 
              element={
                isAuthenticated ? 
                <Profile user={user} onLogout={handleLogout} /> : 
                <Navigate to="/login" replace />
              } 
            />
            
            {/* Rota catch-all - redireciona para home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        {/* Footer fixo na parte inferior */}
        <Footer />
      </div>
    </Router>
  )
}

export default App