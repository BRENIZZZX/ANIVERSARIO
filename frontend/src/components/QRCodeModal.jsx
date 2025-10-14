import React, { useState, useEffect, useRef } from 'react'
import QRCode from 'qrcode'
import axios from 'axios'

const QRCodeModal = ({ onClose, onSuccess }) => {
  // Estados para controle do QR Code
  const [qrToken, setQrToken] = useState('')
  const [qrDataURL, setQrDataURL] = useState('')
  const [status, setStatus] = useState('loading') // loading, pending, approved, expired, error
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutos em segundos
  
  // Referências para controle de intervalos
  const pollingRef = useRef(null)
  const timerRef = useRef(null)
  const canvasRef = useRef(null)

  // useEffect para inicializar o QR Code ao abrir o modal
  useEffect(() => {
    createQRCode()
    
    // Cleanup ao desmontar o componente
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Função para criar um novo QR Code
  const createQRCode = async () => {
    try {
      setStatus('loading')
      
      // Solicita criação de token QR ao backend
      const response = await axios.post('http://localhost:8080/api/qr/create')
      const { token, ttl } = response.data
      
      setQrToken(token)
      setTimeLeft(ttl)
      
      // Gera a string do QR Code (formato personalizado)
      const qrString = `site-rosa://login?token=${token}`
      
      // Gera o QR Code como Data URL
      const dataURL = await QRCode.toDataURL(qrString, {
        width: 256,
        margin: 2,
        color: {
          dark: '#ec4899', // Rosa para o QR Code
          light: '#ffffff' // Fundo branco
        }
      })
      
      setQrDataURL(dataURL)
      setStatus('pending')
      
      // Inicia polling para verificar status
      startPolling(token)
      
      // Inicia timer de countdown
      startTimer()
      
    } catch (error) {
      console.error('Erro ao criar QR Code:', error)
      setStatus('error')
    }
  }

  // Função para iniciar polling do status do QR Code
  const startPolling = (token) => {
    pollingRef.current = setInterval(async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/qr/status/${token}`)
        const { status: qrStatus, user, jwt } = response.data
        
        if (qrStatus === 'APPROVED') {
          // QR Code foi aprovado, faz login
          setStatus('approved')
          clearInterval(pollingRef.current)
          clearInterval(timerRef.current)
          
          // Chama função de sucesso com token JWT e dados do usuário
          setTimeout(() => {
            onSuccess(jwt, user)
          }, 1000) // Delay para mostrar mensagem de sucesso
          
        } else if (qrStatus === 'EXPIRED') {
          setStatus('expired')
          clearInterval(pollingRef.current)
          clearInterval(timerRef.current)
        }
      } catch (error) {
        console.error('Erro ao verificar status do QR:', error)
      }
    }, 2000) // Verifica a cada 2 segundos
  }

  // Função para iniciar timer de countdown
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setStatus('expired')
          clearInterval(pollingRef.current)
          clearInterval(timerRef.current)
          return 0
        }
        return prev - 1
      })
    }, 1000) // Atualiza a cada segundo
  }

  // Função para simular aprovação do QR Code (para testes)
  const simulateApproval = async () => {
    try {
      // Simula aprovação com um email de teste
      await axios.post('http://localhost:8080/api/qr/approve', {
        token: qrToken,
        email: 'teste@exemplo.com' // Email de teste
      })
    } catch (error) {
      console.error('Erro ao simular aprovação:', error)
    }
  }

  // Função para formatar tempo restante
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Função para fechar modal
  const handleClose = () => {
    if (pollingRef.current) clearInterval(pollingRef.current)
    if (timerRef.current) clearInterval(timerRef.current)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        
        {/* Botão de fechar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Cabeçalho */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Login com QR Code</h3>
          <p className="text-gray-600">Escaneie o código com seu dispositivo móvel</p>
        </div>

        {/* Conteúdo baseado no status */}
        <div className="text-center">
          
          {status === 'loading' && (
            <div className="py-8">
              <div className="animate-spin w-12 h-12 border-4 border-rosa-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Gerando QR Code...</p>
            </div>
          )}

          {status === 'pending' && (
            <div>
              {/* QR Code */}
              <div className="bg-white p-4 rounded-xl shadow-inner mb-4 inline-block">
                <img src={qrDataURL} alt="QR Code" className="w-64 h-64" />
              </div>
              
              {/* Timer */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Tempo restante:</p>
                <div className="text-2xl font-bold text-rosa-primary">
                  {formatTime(timeLeft)}
                </div>
              </div>
              
              {/* Instruções */}
              <div className="text-sm text-gray-600 mb-6">
                <p className="mb-2">1. Abra a câmera do seu celular</p>
                <p className="mb-2">2. Aponte para o QR Code</p>
                <p>3. Confirme o login no dispositivo</p>
              </div>
              
              {/* Botão de teste (apenas para desenvolvimento) */}
              <button
                onClick={simulateApproval}
                className="text-sm text-rosa-primary hover:text-rosa-secondary transition-colors"
              >
                🧪 Simular Aprovação (Teste)
              </button>
            </div>
          )}

          {status === 'approved' && (
            <div className="py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-green-600 mb-2">Login Aprovado!</h4>
              <p className="text-gray-600">Redirecionando...</p>
            </div>
          )}

          {status === 'expired' && (
            <div className="py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-red-600 mb-2">QR Code Expirado</h4>
              <p className="text-gray-600 mb-4">O código expirou. Gere um novo para continuar.</p>
              <button
                onClick={createQRCode}
                className="btn-rosa text-white px-6 py-2 rounded-lg font-semibold"
              >
                Gerar Novo QR Code
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-red-600 mb-2">Erro</h4>
              <p className="text-gray-600 mb-4">Não foi possível gerar o QR Code.</p>
              <button
                onClick={createQRCode}
                className="btn-rosa text-white px-6 py-2 rounded-lg font-semibold"
              >
                Tentar Novamente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QRCodeModal