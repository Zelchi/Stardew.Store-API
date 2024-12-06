# EM DESENVOLVIMENTO!!!

# API de Gestão de Vendas por Chat

Esta é uma API desenvolvida em **TypeScript** utilizando **TypeORM** para interação com o banco de dados **SQLite** e **JWT** para autenticação. O objetivo do projeto é permitir a criação e gerenciamento de contas de usuários, cada uma com seu próprio inventário, e gerenciar vendas por meio de um sistema de chat.

## Tecnologias Utilizadas

- **TypeScript**: Para uma tipagem estática e maior robustez no código.
- **Node.js**: Como ambiente de execução do JavaScript no backend.
- **Express**: Framework para construção de APIs.
- **TypeORM**: ORM para interagir de maneira eficiente com o banco de dados SQLite.
- **SQLite**: Banco de dados fácil e eficiente.
- **JWT**: Para autenticação segura de usuários.
- **bcrypt**: Para criptografar e validar senhas de usuários.
- **Docker**: Para facilitar o ambiente de desenvolvimento e a configuração do servidor.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Zelchi/ChatWeb-API.git
   ```
2. Inicie o projeto com Docker: O comando npm run init configura o banco de dados e inicia o ambiente Docker.
   ```bash
   npm run init
   ```
3. Ou, se preferir rodar sem Docker, use o nodemon para desenvolvimento local:
   ```bash
   npm run dev
   ```
