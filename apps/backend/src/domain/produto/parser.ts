import { Produto } from './entity';

export function parseProdutoFromDB(produto: Produto): Produto {
  return {
    id: produto.id,
    nome: produto.nome,
    categoria: produto.categoria,
    descricao: produto.descricao,
    preco: produto.preco,
    quantidade_estoque: produto.quantidade_estoque,
    created_at: produto.created_at,
    updated_at: produto.updated_at,
  };
}
