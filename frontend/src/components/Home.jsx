import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  // Dados dos cards de exemplo
  const cards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      title: "Flores Rosas",
      description: "Lindas flores rosas para decorar seu jardim e trazer mais cor ao seu dia."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop",
      title: "Decoração Rosa",
      description: "Ideias de decoração com tons de rosa para deixar sua casa mais aconchegante."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=300&fit=crop",
      title: "Moda Rosa",
      description: "Tendências de moda em tons de rosa para você arrasar no visual."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
      title: "Arte Rosa",
      description: "Inspirações artísticas com a cor rosa para despertar sua criatividade."
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      title: "Natureza Rosa",
      description: "A beleza da natureza em tons de rosa, do nascer ao pôr do sol."
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop",
      title: "Lifestyle Rosa",
      description: "Dicas de estilo de vida para incorporar mais rosa no seu cotidiano."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Seção Hero */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-rosa-primary via-lilas to-rosa-secondary bg-clip-text text-transparent mb-6">
          Bem-vindo ao Site Rosa
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Descubra um mundo de beleza e inspiração com nossa coleção especial em tons de rosa. 
          Faça login com QR Code e explore conteúdos exclusivos!
        </p>
        
        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to="/login" 
            className="btn-rosa text-white px-8 py-3 rounded-lg font-semibold text-lg inline-flex items-center space-x-2"
          >
            <span>Entrar com QR Code</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
          
          <Link 
            to="/signup" 
            className="border-2 border-rosa-primary text-rosa-primary px-8 py-3 rounded-lg font-semibold text-lg hover:bg-rosa-primary hover:text-white transition-all"
          >
            Criar Conta
          </Link>
        </div>
      </section>

      {/* Grid de Cards */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Explore Nosso Conteúdo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map(card => (
            <div 
              key={card.id} 
              className="card-hover bg-white rounded-xl shadow-lg overflow-hidden group"
            >
              {/* Container da imagem com efeito de zoom */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Overlay que aparece no hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">Ver Mais</span>
                </div>
              </div>
              
              {/* Conteúdo do card */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {card.title}
                </h3>
                
                {/* Descrição que aparece com blur effect no hover */}
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                  {card.description}
                </p>
                
                {/* Botão que aparece no hover */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="text-rosa-primary font-semibold hover:text-rosa-secondary transition-colors">
                    Saiba mais →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção de Call to Action */}
      <section className="text-center mt-16 py-12 bg-gradient-to-r from-rosa-light to-lilas-light rounded-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Pronto para começar?
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Junte-se à nossa comunidade e descubra conteúdos exclusivos com login via QR Code!
        </p>
        <Link 
          to="/signup" 
          className="btn-rosa text-white px-8 py-3 rounded-lg font-semibold text-lg inline-block"
        >
          Cadastre-se Agora
        </Link>
      </section>
    </div>
  )
}

export default Home