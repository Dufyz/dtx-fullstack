# FRONTEND

Este projeto implementa uma interface de usuário para gerenciamento de pedidos e produtos utilizando React com Next.js, seguindo boas práticas de desenvolvimento e princípios de UI/UX.

## 📋 Funcionalidades

### Produtos

- Listar produtos
- Acessar produto único
- Criar produto
- Editar produto
- Deletar produto

## 🛠️ Tecnologias Utilizadas

- Next.js - Framework React para desenvolvimento web
- Zustand - Biblioteca de gerenciamento de estado
- Zod - Biblioteca de validação de esquemas
- Jest - Framework para testes

## 📦 Estrutura do Projeto

```
src/
│   ├── actions/               # Client e server actions
│   ├── app/                   # Rotas e layouts da aplicação
│   ├── components/            # Componentes reutilizáveis
│   │   ├── ui/                # Componentes de interface
│   ├── data/                  # Funções de acesso a dados
│   │   ├── lib/               # Utilidades e configurações
│   ├── schemas/               # Esquemas de validação com Zod
│   └── stores/                # Stores do Zustand
│   └── types/                 # Tipos e interfaces TypeScript
```

## 🚀 Como executar

```
npm run setup
```

## 📝 Páginas

```
/produtos
/produtos/:id
```

## 🧪 Testes

```
npm run test
```
