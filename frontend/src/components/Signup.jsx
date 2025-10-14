import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = ({ onLogin }) => {
  // Estado para dados do formulário
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  // Estados para controle da UI
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Função para lidar com mudanças nos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Validação básica do formulário
  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Nome de usuário é obrigatório')
      return false
    }
    
    if (!formData.email.trim()) {
      setError('Email é obrigatório')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem')
      return false
    }
    
    return true
  }

  // Função para submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Valida formulário antes de enviar
    if (!validateForm()) return
    
    setLoading(true)

    try {
      // Faz requisição para criar usuário
      const response = await axios.post('http://localhost:8080/api/auth/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      })

      // Se cadastro bem-sucedido
      if (response.data.success) {
        setSuccess(true)
        
        // Após 2 segundos, faz login automático
        setTimeout(async () => {
          try {
            const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
              email: formData.email,
              password: formData.password
            })
            
            if (loginResponse.data.token) {
              onLogin(loginResponse.data.token, loginResponse.data.user)
            }
          } catch (loginError) {
            console.error('Erro no login automático:', loginError)
            // Se falhar o login automático, redireciona para login manual
            window.location.href = '/login'
          }
        }, 2000)
      }
    } catch (err) {
      // Trata diferentes tipos de erro
      if (err.response?.status === 409) {
        setError('Email já está em uso')
      } else if (err.response?.status === 400) {
        setError('Dados inválidos. Verifique as informações.')
      } else {
        setError('Erro ao criar conta. Tente novamente.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Se cadastro foi bem-sucedido, mostra mensagem de sucesso
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Conta Criada!</h2>
            <p className="text-gray-600 mb-4">Bem-vindo ao Site Rosa! Fazendo login...</p>
            <div className="animate-spin w-8 h-8 border-4 border-rosa-primary border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        
        {/* Card principal de cadastro */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
          
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-rosa-primary to-lilas rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
              🌸
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Criar Conta</h2>
            <p className="text-gray-600">Junte-se à comunidade Site Rosa</p>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Formulário de cadastro */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Campo de nome de usuário */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Nome de Usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-rosa transition-all"
                placeholder="Seu nome de usuário"
              />
            </div>

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
                minLength="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-rosa transition-all"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
            </div>

            {/* Campo de confirmação de senha */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none input-rosa transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Botão de cadastro */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-rosa text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </button>
          </form>

          {/* Link para login */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-rosa-primary font-semibold hover:text-rosa-secondary transition-colors">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup