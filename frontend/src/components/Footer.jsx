import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-rosa-primary via-lilas to-rosa-secondary text-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Conteúdo principal do footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Coluna 1 - Logo e descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🌸
              </div>
              <h3 className="text-2xl font-bold">Site Rosa</h3>
            </div>
            <p className="text-white/80 leading-relaxed mb-4">
              Descubra um mundo de beleza e inspiração com nossa plataforma única. 
              Login seguro com QR Code e conteúdo exclusivo em tons de rosa.
            </p>
            
            {/* Redes sociais */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                📘
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                📷
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                🐦
              </a>
              <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                💼
              </a>
            </div>
          </div>
          
          {/* Coluna 2 - Links rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-white/80 hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="/login" className="text-white/80 hover:text-white transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a href="/signup" className="text-white/80 hover:text-white transition-colors">
                  Cadastro
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Sobre Nós
                </a>
              </li>
            </ul>
          </div>
          
          {/* Coluna 3 - Suporte */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Como usar QR Code
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors">
                  Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Seção de newsletter */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4">📧 Newsletter Rosa</h4>
            <p className="text-white/80 mb-4">
              Receba novidades e conteúdos exclusivos em seu email
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:bg-white/30 transition-all"
              />
              <button className="bg-white text-rosa-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Seção de tecnologias */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">🚀 Tecnologias Utilizadas</h4>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">React</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Spring Boot</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">MySQL</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">QR Code</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">JWT</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/80">
              © 2024 Site Rosa. Todos os direitos reservados.
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-white/80">
              <a href="#" className="hover:text-white transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
          
          {/* Mensagem especial */}
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="text-white/90 text-sm">
              💖 Feito com amor e muito código rosa! 
              <br />
              <span className="text-xs text-white/70">
                Este projeto demonstra login seguro com QR Code, animações em Canvas e design responsivo.
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer