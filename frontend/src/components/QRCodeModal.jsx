import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import axios from 'axios';

const QRCodeModal = ({ onClose, onSuccess }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [token, setToken] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [status, setStatus] = useState('PENDING');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createQRCode();
  }, []);

  useEffect(() => {
    if (token && status === 'PENDING') {
      const interval = setInterval(checkStatus, 2000);
      return () => clearInterval(interval);
    }
  }, [token, status]);

  useEffect(() => {
    if (timeLeft > 0 && status === 'PENDING') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setStatus('EXPIRED');
    }
  }, [timeLeft, status]);

  const createQRCode = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/qr/create');
      const { token: qrToken, ttl } = response.data;
      
      setToken(qrToken);
      setTimeLeft(ttl);
      
      const qrUrl = await QRCode.toDataURL(qrToken);
      setQrCodeUrl(qrUrl);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao criar QR Code:', error);
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/qr/status/${token}`);
      const { status: qrStatus, jwt, user } = response.data;
      
      setStatus(qrStatus);
      
      if (qrStatus === 'APPROVED' && jwt && user) {
        onSuccess({ jwt, user });
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error);
    }
  };

  const simulateApproval = async () => {
    try {
      await axios.post('http://localhost:8080/api/qr/approve', {
        token,
        email: 'teste@email.com' // Email de teste
      });
    } catch (error) {
      console.error('Erro ao simular aprovação:', error);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/30">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Login com QR Code</h3>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              {status === 'PENDING' && (
                <>
                  <div className="bg-white p-4 rounded-lg mb-4 inline-block">
                    <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                  </div>
                  
                  <p className="text-pink-100 mb-2">
                    Escaneie o QR Code com seu dispositivo móvel
                  </p>
                  
                  <div className="text-white font-mono text-lg mb-4">
                    ⏱️ {formatTime(timeLeft)}
                  </div>
                  
                  <button
                    onClick={simulateApproval}
                    className="mb-4 bg-yellow-500/20 text-yellow-100 py-2 px-4 rounded-lg text-sm hover:bg-yellow-500/30 transition-colors border border-yellow-500/50"
                  >
                    🧪 Simular Aprovação (Teste)
                  </button>
                </>
              )}
              
              {status === 'APPROVED' && (
                <div className="text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <p className="text-white text-lg">QR Code aprovado!</p>
                  <p className="text-pink-100">Redirecionando...</p>
                </div>
              )}
              
              {status === 'EXPIRED' && (
                <div className="text-center">
                  <div className="text-6xl mb-4">⏰</div>
                  <p className="text-white text-lg">QR Code expirado</p>
                  <button
                    onClick={createQRCode}
                    className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    Gerar Novo QR Code
                  </button>
                </div>
              )}
            </>
          )}
          
          <button
            onClick={onClose}
            className="mt-6 w-full bg-white/10 text-white py-2 px-4 rounded-lg hover:bg-white/20 transition-colors border border-white/30"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;