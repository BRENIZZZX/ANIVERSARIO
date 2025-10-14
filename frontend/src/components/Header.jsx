import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ isAuthenticated, user, onLogout }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo e título */}
          <div className="flex items-center space-x-3">
            {/* Logo simples usando emoji de flor */}
            <div className="w-10 h-10 bg-gradient-to-br from-rosa-primary to-lilas rounded-full flex items-center justify-center text-white text-xl">
              🌸
            </div>
            
            {/* Título do site */}
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-rosa-primary to-lilas bg-clip-text text-transparent hover:scale-105 transition-transform">
              Site Rosa
            </Link>
          </div>

          {/* Menu de navegação */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-rosa-primary transition-colors font-medium"
            >
              Início
            </Link>
            
            {!isAuthenticated ? (
              // Links para usuários não autenticados
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-rosa-primary transition-colors font-medium"
                >
                  Entrar
                </Link>
                <Link 
                  to="/signup" 
                  className="btn-rosa text-white px-4 py-2 rounded-lg font-medium"
                >
                  Cadastrar
                </Link>
              </>
            ) : (
              // Links para usuários autenticados
              <div className="flex items-center space-x-4">
                {/* Saudação ao usuário */}
                <span className="text-gray-700">
                  Olá, <span className="font-semibold text-rosa-primary">{user?.username}</span>!
                </span>
                
                {/* Link para perfil */}
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-rosa-primary transition-colors font-medium"
                >
                  Perfil
                </Link>
                
                {/* Botão de logout */}
                <button 
                  onClick={onLogout}
                  className="text-gray-700 hover:text-red-500 transition-colors font-medium"
                >
                  Sair
                </button>
              </div>
            )}
          </nav>

          {/* Menu mobile (hambúrguer) */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-rosa-primary transition-colors">
              {/* Ícone de menu (3 linhas) */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header