import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="animate-zoom-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-float">
            🌸 Site Rosa 🌸
          </h1>
          
          <p className="text-xl md:text-2xl text-rosa-light mb-8 animate-fade-in">
            Login seguro via QR Code com tema rosa
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20 animate-zoom-in">
            <h2 className="text-2xl font-bold text-white mb-4">✨ Características</h2>
            <div className="grid md:grid-cols-2 gap-6 text-rosa-light">
              <div className="hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">🔐</div>
                <h3 className="font-semibold text-white">Login Seguro</h3>
                <p className="text-sm">JWT + BCrypt + Validações</p>
              </div>
              <div className="hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">📱</div>
                <h3 className="font-semibold text-white">QR Code</h3>
                <p className="text-sm">Login rápido via QR Code</p>
              </div>
              <div className="hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">🎨</div>
                <h3 className="font-semibold text-white">Tema Rosa</h3>
                <p className="text-sm">Design moderno e responsivo</p>
              </div>
              <div className="hover:scale-105 transition-transform">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-semibold text-white">Tecnologias</h3>
                <p className="text-sm">React + Spring Boot + MySQL</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-rosa-primary hover:bg-rosa-dark text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 animate-zoom-in shadow-lg"
            >
              🚀 Fazer Login
            </Link>
            <Link
              to="/signup"
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:scale-105 animate-zoom-in border border-white/30"
            >
              ✨ Criar Conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;