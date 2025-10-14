import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 animate-zoom-in">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2 animate-float">Criar Conta</h2>
          <p className="text-rosa-light">Junte-se ao Site Rosa</p>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-100 text-sm animate-zoom-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fade-in">
              <label className="block text-white text-sm font-medium mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-rosa-light focus:outline-none focus:ring-2 focus:ring-rosa-primary focus:border-transparent transition-all hover:scale-105"
                placeholder="Seu nome completo"
              />
            </div>

            <div className="animate-fade-in">
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

            <div className="animate-fade-in">
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
              {loading ? 'Criando conta...' : '🌸 Criar Conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-rosa-light">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-white font-medium hover:text-rosa-light transition-colors hover:scale-105 inline-block">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;