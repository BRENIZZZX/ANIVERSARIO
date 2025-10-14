const Footer = () => {
  return (
    <footer className="bg-rosa-primary/20 backdrop-blur-sm border-t border-white/20 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/80 text-sm mb-4 md:mb-0">
            © 2024 Site Rosa. Feito com 💖 e muito código rosa!
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              Sobre
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              Contato
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              Privacidade
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <p className="text-white/60 text-xs">
            🌸 Login seguro via QR Code • React + Spring Boot + MySQL 🌸
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;