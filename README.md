**🎬 NX-Play**

O projeto simula uma plataforma de streaming simples, permitindo explorar conceitos comuns em aplicações reais, como consumo de APIs, Web Socket e Player HSL.

▶️ Como Executar o Projeto

**Pré-requisitos:**
- Node.js (versão LTS recomendada)
- NPM
  
**Inicial:**

- cd backend
- npm install

**Iniciar API:**

- cd backend
- node server.js

**Iniciar WS:**

- cd backend
- node ws.js

**Os servidores serão iniciados em:**

- API: Porta 3000
- WebSocket: Porta 3001

**🔁 Fluxo da Aplicação**

1. O usuário acessa o **Frontend**
2. O Frontend consome a **API REST** na porta `3000`, fornecendo os dados de streams (carrossel de filmes)
3. Usuário seleciona o filme que deseja no carrossel
4. Usuário acessa a sinopse do filme
6. Ao clickar em assistir, o usuário é movido para a tela do player HLS, que consome o stream e exibe o conteúdo ao usuário
7. O Frontend se conecta ao **WebSocket** na porta `3001`
8. O WebSocket é utilizado para comunicação em tempo real das funções do player (play, pause, etc.)
