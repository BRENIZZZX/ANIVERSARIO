import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import QRCodeModal from './QRCodeModal';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleQRSuccess = (authData) => {
    localStorage.setItem('token', authData.jwt);
    localStorage.setItem('user', JSON.stringify(authData.user));
    setShowQRModal(false);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Entrar</h2>
          <p className="text-rosa-light">Acesse sua conta no Site Rosa</p>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30 hover:scale-105 transition-transform duration-300 animate-zoom-in">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-100 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-rosa-light focus:outline-none focus:ring-2 focus:ring-rosa-primary focus:border-transparent transition-all hover:scale-105"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-rosa-light focus:outline-none focus:ring-2 focus:ring-rosa-primary focus:border-transparent transition-all hover:scale-105"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rosa-primary to-lilas text-white py-3 px-4 rounded-lg font-medium hover:from-rosa-dark hover:to-lilas focus:outline-none focus:ring-2 focus:ring-rosa-primary focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 hover:scale-105 animate-zoom-in"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-rosa-light">ou</span>
              </div>
            </div>

            <button
              onClick={() => setShowQRModal(true)}
              className="mt-4 w-full bg-white/10 text-white py-3 px-4 rounded-lg font-medium hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 border border-white/30 hover:scale-105 animate-zoom-in"
            >
              📱 Entrar com QR Code
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-rosa-light">
              Não tem uma conta?{' '}
              <Link to="/signup" className="text-white font-medium hover:text-rosa-light transition-colors hover:scale-105 inline-block">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      {showQRModal && (
        <QRCodeModal
          onClose={() => setShowQRModal(false)}
          onSuccess={handleQRSuccess}
        />
      )}
    </div>
  );
};

export default Login;