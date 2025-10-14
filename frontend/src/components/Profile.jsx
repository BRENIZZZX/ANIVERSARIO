import React from 'react'

const Profile = ({ user, onLogout }) => {
  // Função para formatar data de criação da conta
  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível'
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch (error) {
      return 'Data inválida'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        
        {/* Card principal do perfil */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          
          {/* Header do perfil com gradiente */}
          <div className="bg-gradient-to-r from-rosa-primary to-lilas p-8 text-white text-center">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
              👤
            </div>
            
            {/* Nome do usuário */}
            <h1 className="text-3xl font-bold mb-2">
              Olá, {user?.username || 'Usuário'}!
            </h1>
            
            <p className="text-white/80">
              Bem-vindo ao seu perfil no Site Rosa
            </p>
          </div>

          {/* Conteúdo do perfil */}
          <div className="p-8">
            
            {/* Informações do usuário */}
            <div className="space-y-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Suas Informações
              </h2>
              
              {/* Card de informação - Nome de usuário */}
              <div className="bg-rosa-light/30 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Nome de Usuário
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.username || 'Não informado'}
                </p>
              </div>
              
              {/* Card de informação - Email */}
              <div className="bg-lilas-light/30 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.email || 'Não informado'}
                </p>
              </div>
              
              {/* Card de informação - Data de cadastro */}
              <div className="bg-rosa-light/30 rounded-lg p-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Membro desde
                </label>
                <p className="text-lg font-semibold text-gray-800">
                  {formatDate(user?.createdAt)}
                </p>
              </div>
            </div>

            {/* Seção de estatísticas */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Estatísticas
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Estatística 1 */}
                <div className="bg-gradient-to-br from-rosa-primary to-rosa-secondary text-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold mb-1">5</div>
                  <div className="text-sm opacity-90">Logins com QR</div>
                </div>
                
                {/* Estatística 2 */}
                <div className="bg-gradient-to-br from-lilas to-rosa-primary text-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold mb-1">12</div>
                  <div className="text-sm opacity-90">Conteúdos Vistos</div>
                </div>
                
                {/* Estatística 3 */}
                <div className="bg-gradient-to-br from-rosa-secondary to-lilas text-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold mb-1">3</div>
                  <div className="text-sm opacity-90">Favoritos</div>
                </div>
              </div>
            </div>

            {/* Seção de ações */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Ações da Conta
              </h2>
              
              {/* Botões de ação */}
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Botão de editar perfil (placeholder) */}
                <button className="flex-1 bg-gradient-to-r from-rosa-primary to-rosa-secondary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all">
                  ✏️ Editar Perfil
                </button>
                
                {/* Botão de configurações (placeholder) */}
                <button className="flex-1 border-2 border-rosa-primary text-rosa-primary py-3 px-6 rounded-lg font-semibold hover:bg-rosa-primary hover:text-white transition-all">
                  ⚙️ Configurações
                </button>
              </div>
              
              {/* Botão de logout */}
              <button 
                onClick={onLogout}
                className="w-full border-2 border-red-400 text-red-500 py-3 px-6 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-all"
              >
                🚪 Sair da Conta
              </button>
            </div>

            {/* Seção de dicas */}
            <div className="mt-8 p-6 bg-gradient-to-r from-rosa-light to-lilas-light rounded-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                💡 Dica do Site Rosa
              </h3>
              <p className="text-gray-700">
                Você sabia que pode usar o login com QR Code para acessar sua conta de forma mais rápida e segura? 
                Experimente na próxima vez que fizer login!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile