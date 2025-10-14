import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-rosa-primary/20 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl animate-bounce-slow">🌸</div>
            <h1 className="text-2xl font-bold text-white group-hover:text-rosa-light transition-colors">
              Site Rosa
            </h1>
          </Link>

          <nav className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-white/80 text-sm">
                  Olá, {user.name}! 👋
                </span>
                <Link 
                  to="/profile" 
                  className="text-white hover:text-rosa-light transition-colors font-medium"
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-rosa-dark/50 hover:bg-rosa-dark text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-white hover:text-rosa-light transition-colors font-medium"
                >
                  Entrar
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-rosa-primary hover:bg-rosa-dark text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 animate-zoom-in"
                >
                  Cadastrar
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;