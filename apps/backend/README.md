# API

Este projeto implementa uma API RESTFull para gerenciamento de pedidos e produtos utilizando Node.js com NestJS, seguindo boas práticas de desenvolvimento e princípios SOLID.

## 📋 Funcionalidades

### Produtos

- Listar produtos
- Criar produto
- Editar produto
- Deletar produto

### Pedidos

- Criar pedido
- Listar pedidos

## 🛠️ Tecnologias Utilizadas

- Node.js - Ambiente de execução
- NestJS - Framework para construção de aplicações server-side
- PostgreSQL - Banco de dados relacional
- Jest - Framework para testes
- Postman - Documentação da API
- Docker - Containerização da aplicação

## 📦 Estrutura do Projeto

```
src/
│   ├── domain/                # Camada de domínio
│   ├── config/                # Configurações da aplicação
│   ├── database/              # Configuração de banco de dados
│   │   ├── migrations/        # Migrações do banco
│   │   ├── seed/              # Dados iniciais
│       ├── repositories/      # Implementações de repositórios
│   ├── presentation/          # Camada de apresentação
│   │   ├── controller/        # Controladores REST
│   │   ├── middleware/        # Middlewares
│       ├── schemas/           # Esquemas de validação
│   ├── shared/                # Código compartilhado
│   └── test/                  # Testes
```

## 🚀 Como executar

```
npm run setup
```

## 📝 Endpoints

### API

```
GET /api/health-check - Health check da aplicação
```

### Produtos

```
GET /api/produtos - Listar produtos
POST /api/produtos - Criar produto
PUT /api/produtos/:id - Atualizar produto
DELETE /api/produtos/:id - Remover produto
```

## Pedidos

```
GET /api/pedidos - Listar pedidos
POST /api/pedidos - Criar pedido
```

## 🧪 Testes

```
npm run test
```
