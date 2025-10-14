import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import QRCodeModal from './QRCodeModal'
import axios from 'axios'

const Login = ({ onLogin }) => {
  // Estados para o formulário de login tradicional
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  // Estados para controle da UI
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showQRModal, setShowQRModal] = useState(false)

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Função para login tradicional (email + senha)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Faz requisição para o backend
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: formData.email,
        password: formData.password
      })

      // Se login bem-sucedido, chama função de login do App
      if (response.data.token) {
        onLogin(response.data.token, response.data.user)
      }
    } catch (err) {
      // Trata erros de autenticação
      if (err.response?.status === 401) {
        setError('Email ou senha incorretos')
      } else if (err.response?.status === 404) {
        setError('Usuário não encontrado')
      } else {
        setError('Erro ao fazer login. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Função para abrir modal do QR Code
  const handleQRLogin = () => {
    setShowQRModal(true)
  }

  // Função chamada quando QR Code é aprovado
  const handleQRSuccess = (token, userData) => {
    setShowQRModal(false)
    onLogin(token, userData)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        
        {/* Card principal de login */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
          
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-rosa-primary to-lilas rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              🌸
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Entrar</h2>
            <p className="text-gray-600">Acesse sua conta no Site Rosa</p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Formulário de login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo de email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-rosa transition-all"
                placeholder="seu@email.com"
              />
            </div>

            {/* Campo de senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-rosa transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Botão de login tradicional */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-rosa text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Divisor */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">ou</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Botão de login com QR Code */}
          <button
            onClick={handleQRLogin}
            className="w-full border-2 border-rosa-primary text-rosa-primary py-3 rounded-lg font-semibold hover:bg-rosa-primary hover:text-white transition-all flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            <span>Entrar com QR Code</span>
          </button>

          {/* Link para cadastro */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Não tem uma conta?{' '}
              <Link to="/signup" className="text-rosa-primary font-semibold hover:text-rosa-secondary transition-colors">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Modal do QR Code */}
      {showQRModal && (
        <QRCodeModal
          onClose={() => setShowQRModal(false)}
          onSuccess={handleQRSuccess}
        />
      )}
    </div>
  )
}

export default Login