import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full space-y-8 animate-zoom-in">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce-slow">👤</div>
          <h2 className="text-4xl font-bold text-white mb-2 animate-float">Meu Perfil</h2>
          <p className="text-rosa-light">Bem-vindo ao Site Rosa!</p>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
          <div className="space-y-6">
            <div className="text-center animate-fade-in">
              <div className="text-4xl mb-4 animate-heart-beat">💖</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Olá, {user.name}!
              </h3>
              <p className="text-rosa-light">
                Login realizado com sucesso via {localStorage.getItem('loginMethod') || 'formulário'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4 hover:scale-105 transition-transform">
                <h4 className="font-semibold text-white mb-2">📧 Email</h4>
                <p className="text-rosa-light">{user.email}</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-4 hover:scale-105 transition-transform">
                <h4 className="font-semibold text-white mb-2">🆔 ID</h4>
                <p className="text-rosa-light">#{user.id}</p>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-6 animate-fade-in">
              <h4 className="font-semibold text-white mb-4 text-center">🎉 Parabéns!</h4>
              <p className="text-rosa-light text-center mb-4">
                Você testou com sucesso o sistema de login do Site Rosa!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="hover:scale-110 transition-transform">
                  <div className="text-2xl mb-1">✅</div>
                  <p className="text-xs text-rosa-light">Login</p>
                </div>
                <div className="hover:scale-110 transition-transform">
                  <div className="text-2xl mb-1">🔐</div>
                  <p className="text-xs text-rosa-light">JWT</p>
                </div>
                <div className="hover:scale-110 transition-transform">
                  <div className="text-2xl mb-1">📱</div>
                  <p className="text-xs text-rosa-light">QR Code</p>
                </div>
                <div className="hover:scale-110 transition-transform">
                  <div className="text-2xl mb-1">🌸</div>
                  <p className="text-xs text-rosa-light">Rosa</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="bg-rosa-primary hover:bg-rosa-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              >
                🔄 Atualizar
              </button>
              <button
                onClick={handleLogout}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 border border-white/30"
              >
                🚪 Sair
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;