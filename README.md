# 🌸 Site Rosa - QR Code Login

Um projeto completo demonstrando login seguro via QR Code com tema rosa, desenvolvido com React + Spring Boot + MySQL.

## 📋 Visão Geral

Este projeto implementa um sistema completo de autenticação com:

- **Frontend React** com tema rosa e animações em Canvas
- **Backend Spring Boot** com JWT e segurança robusta  
- **Login tradicional** (email + senha)
- **Login via QR Code** com polling em tempo real
- **Banco MySQL** com estrutura otimizada
- **Animações de fundo** alternando entre flores e corações

## 🎨 Características Visuais

- **Tema Rosa/Lilás**: Gradientes e cores harmoniosas
- **Fundo Animado**: Canvas com partículas (flores ↔ corações) alternando a cada 10s
- **Design Responsivo**: Funciona em desktop e mobile
- **Animações Suaves**: Hover effects, transições e fade-ins
- **Interface Moderna**: Cards, modais e componentes elegantes

## 🔧 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para interfaces
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento SPA
- **Axios** - Cliente HTTP
- **QRCode.js** - Geração de QR Codes
- **Canvas API** - Animações de fundo

### Backend
- **Spring Boot 3** - Framework Java
- **Spring Security** - Autenticação e autorização
- **Spring Data JPA** - Acesso ao banco de dados
- **MySQL** - Banco de dados relacional
- **JWT (jjwt)** - Tokens de autenticação
- **BCrypt** - Hash de senhas
- **Maven** - Gerenciamento de dependências

## 📁 Estrutura do Projeto

```
site-rosa-qrcode/
├── frontend/                 # Aplicação React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── App.jsx         # Componente principal
│   │   └── main.jsx        # Ponto de entrada
│   ├── package.json        # Dependências Node.js
│   └── tailwind.config.js  # Configuração Tailwind
├── backend/                 # Aplicação Spring Boot
│   ├── src/main/java/com/siterosa/
│   │   ├── controller/     # Controllers REST
│   │   ├── service/        # Lógica de negócio
│   │   ├── entity/         # Entidades JPA
│   │   ├── repository/     # Repositórios de dados
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── security/       # Configurações JWT
│   │   └── config/         # Configurações Spring
│   └── pom.xml            # Dependências Maven
├── db/
│   └── schema.sql         # Script de criação do banco
└── README.md              # Este arquivo
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

- **Node.js 18+** e npm
- **Java 17+** 
- **Maven 3.6+**
- **MySQL 8.0+**

### 1. Configurar o Banco de Dados

```bash
# Conectar ao MySQL
mysql -u root -p

# Executar o script de criação
mysql -u root -p < db/schema.sql

# Ou copiar e colar o conteúdo do arquivo db/schema.sql no MySQL Workbench
```

**Ajustar credenciais do banco:**
- Edite `backend/src/main/resources/application.properties`
- Altere `spring.datasource.username` e `spring.datasource.password`

### 2. Executar o Backend

```bash
# Navegar para o diretório do backend
cd backend

# Instalar dependências e executar
mvn spring-boot:run

# O backend estará disponível em http://localhost:8080
```

### 3. Executar o Frontend

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# O frontend estará disponível em http://localhost:5173
```

### 4. Acessar a Aplicação

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **Health Check**: http://localhost:8080/api/auth/health

## 🔐 Como Testar o Login via QR Code

### Fluxo Completo:

1. **Acesse a página de login** em http://localhost:5173/login

2. **Clique em "Entrar com QR Code"**
   - Um modal será aberto com o QR Code
   - O código expira em 2 minutos
   - Um timer mostra o tempo restante

3. **Simular aprovação** (para testes):
   - Clique no botão "🧪 Simular Aprovação (Teste)" no modal
   - Isso simula a aprovação do QR Code por outro dispositivo

4. **Login automático**:
   - Após aprovação, o frontend detecta via polling
   - Login é realizado automaticamente
   - Usuário é redirecionado para o perfil

### Fluxo Técnico:

```
Frontend                Backend               Banco
   |                       |                    |
   |-- POST /api/qr/create |                    |
   |<-- {token, ttl} ------|                    |
   |                       |                    |
   |-- GET /api/qr/status  |                    |
   |<-- {status: PENDING}--|                    |
   |                       |                    |
   |   (polling a cada 2s) |                    |
   |                       |                    |
   |-- POST /api/qr/approve|                    |
   |   {token, email}      |-- findByEmail ---->|
   |<-- {success: true} ---|<-- User ----------|
   |                       |                    |
   |-- GET /api/qr/status  |                    |
   |<-- {status: APPROVED, |                    |
   |     jwt, user} -------|                    |
```

## 🎯 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Cadastro de usuários com validação
- [x] Login tradicional (email + senha)
- [x] Login via QR Code com polling
- [x] JWT para sessões stateless
- [x] Hash de senhas com BCrypt
- [x] Validação de dados no frontend e backend

### ✅ Interface
- [x] Tema rosa/lilás responsivo
- [x] Animações de fundo (flores ↔ corações)
- [x] Cards com hover effects
- [x] Modal de QR Code com timer
- [x] Navegação com React Router
- [x] Feedback visual para ações

### ✅ Segurança
- [x] CORS configurado
- [x] Validação de entrada
- [x] Tokens com expiração
- [x] Senhas hasheadas
- [x] Headers de segurança

## 🔧 Configurações Importantes

### Portas Utilizadas
- **Frontend**: 5173 (Vite padrão)
- **Backend**: 8080 (Spring Boot padrão)  
- **MySQL**: 3306 (MySQL padrão)

### Variáveis de Ambiente (Backend)
```properties
# Banco de dados
spring.datasource.url=jdbc:mysql://localhost:3306/site_rosa
spring.datasource.username=root
spring.datasource.password=root

# JWT
jwt.secret=site-rosa-secret-key-muito-segura
jwt.expiration=86400000

# CORS
cors.allowed-origins=http://localhost:5173
```

### Customizações Fáceis

**Alterar cores do tema:**
```javascript
// frontend/tailwind.config.js
colors: {
  'rosa-primary': '#ec4899',    // Rosa principal
  'rosa-secondary': '#f472b6',  // Rosa secundário
  'lilas': '#c084fc',          // Lilás
}
```

**Alterar tempo de animação:**
```javascript
// frontend/src/components/BackgroundCanvas.jsx
const interval = setInterval(() => {
  // Altere 10000 para outro valor em milissegundos
}, 10000); // 10 segundos
```

**Alterar TTL do QR Code:**
```java
// backend/.../service/QRTokenService.java
private static final int DEFAULT_TTL_SECONDS = 120; // 2 minutos
```

## 🔒 Segurança e Boas Práticas

### Implementadas:
- **BCrypt** para hash de senhas (força 12)
- **JWT** com expiração configurável
- **CORS** restrito ao frontend
- **Validação** de entrada em todas as camadas
- **Tokens QR** com TTL curto (2 minutos)
- **Uso único** de tokens QR

### Recomendações para Produção:
- **HTTPS** obrigatório
- **Redis** para armazenamento de tokens QR
- **Rate limiting** nos endpoints
- **Logs de auditoria** 
- **Chave JWT** mais complexa
- **Variáveis de ambiente** para secrets
- **WebSocket** para notificações em tempo real
- **Refresh tokens** para JWT
- **2FA** adicional

## 🐛 Solução de Problemas

### Erro de CORS
```
Access to XMLHttpRequest at 'http://localhost:8080' from origin 'http://localhost:5173' has been blocked by CORS policy
```
**Solução**: Verificar se o backend está rodando e se as origens estão configuradas corretamente em `SecurityConfig.java`

### Erro de Conexão com MySQL
```
Communications link failure
```
**Solução**: 
1. Verificar se o MySQL está rodando
2. Confirmar usuário/senha em `application.properties`
3. Verificar se o banco `site_rosa` foi criado

### QR Code não funciona
**Solução**:
1. Verificar se ambos frontend e backend estão rodando
2. Abrir DevTools e verificar requisições na aba Network
3. Verificar logs do backend no console

### Animações não aparecem
**Solução**:
1. Verificar se o navegador suporta Canvas
2. Abrir DevTools e verificar erros no console
3. Tentar recarregar a página

## 📚 Conceitos Explicados

### JWT (JSON Web Token)
Formato: `header.payload.signature`
- **Header**: Tipo e algoritmo de assinatura
- **Payload**: Dados do usuário (claims)
- **Signature**: Assinatura para verificar integridade

### BCrypt
Algoritmo de hash para senhas que:
- Adiciona salt automaticamente
- Tem custo computacional ajustável
- É resistente a ataques de força bruta

### requestAnimationFrame
API do navegador para animações suaves:
- Sincroniza com a taxa de atualização da tela (60 FPS)
- Pausa quando a aba não está ativa
- Mais eficiente que `setInterval`

### CORS (Cross-Origin Resource Sharing)
Mecanismo que permite requisições entre domínios diferentes:
- Necessário para frontend (localhost:5173) acessar backend (localhost:8080)
- Configurado no Spring Security

### Cross-site Attacks
- **XSS**: Injeção de scripts maliciosos
- **CSRF**: Requisições forjadas entre sites
- **Clickjacking**: Sobreposição de elementos invisíveis

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👥 Autores

- **Desenvolvedor** - Projeto demonstrativo de QR Code Login

## 🙏 Agradecimentos

- Spring Boot pela excelente documentação
- React pela flexibilidade
- Tailwind CSS pelo design system
- Comunidade open source

---

💖 **Feito com amor e muito código rosa!** 🌸