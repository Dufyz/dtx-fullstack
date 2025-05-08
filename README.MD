# Sistema de Gerenciamento de Produtos e Pedidos

Este projeto implementa um sistema para gerenciamento de produtos e pedidos, seguindo uma arquitetura moderna com frontend e backend separados. O sistema foi desenvolvido seguindo boas práticas de desenvolvimento, princípios SOLID e arquitetura limpa.

> **Importante**: Para informações detalhadas sobre cada aplicação, consulte os READMEs específicos localizados nos diretórios `/frontend` e `/backend`.

## 📋 Visão Geral

O sistema é composto por duas partes principais:

1. **Frontend**: Interface de usuário desenvolvida com Next.js
2. **Backend**: API RESTful desenvolvida com NestJS

## 📋 Funcionalidades

### Produtos

- Listar produtos
- Acessar produto único
- Criar produto
- Editar produto
- Deletar produto

### Pedidos

- Listar pedidos
- Criar pedido

## 🛠️ Tecnologias Utilizadas

### Frontend

- Next.js - Framework React para desenvolvimento web
- Zustand - Biblioteca de gerenciamento de estado
- Zod - Biblioteca de validação de esquemas
- Jest - Framework para testes

### Backend

- Node.js - Ambiente de execução
- NestJS - Framework para construção de aplicações server-side
- PostgreSQL - Banco de dados relacional
- Jest - Framework para testes
- Postman - Documentação da API
- Docker - Containerização da aplicação

## 📦 Estrutura do Projeto

O projeto está organizado em dois diretórios principais, cada um com sua própria documentação:

```
/
├── frontend/              # Aplicação Next.js (ver README específico)
├── backend/               # API RESTful NestJS (ver README específico)
```

## 🚀 Como executar

Para instruções detalhadas de instalação e execução, consulte os READMEs específicos em cada diretório. Abaixo um resumo dos comandos principais:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

# Configuração do backend
cd backend
npm install
npm run setup

# Configuração do frontend
cd ../frontend
npm install
npm run setup
```

## 📝 Rotas e Endpoints

### Frontend

```
/produtos           # Lista de produtos
/produtos/:id       # Detalhes de um produto
```

### Backend

```
GET /api/health-check           # Health check da aplicação
GET /api/produtos               # Listar produtos
POST /api/produtos              # Criar produto
PUT /api/produtos/:id           # Atualizar produto
DELETE /api/produtos/:id        # Remover produto
GET /api/pedidos                # Listar pedidos
POST /api/pedidos               # Criar pedido
```

## 🧪 Testes

### Frontend

```bash
cd frontend
npm run test
```

### Backend

```bash
cd backend
npm run test
```

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE)
