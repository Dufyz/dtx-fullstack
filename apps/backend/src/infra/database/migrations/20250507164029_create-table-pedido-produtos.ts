import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
            CREATE TABLE IF NOT EXISTS pedido_produtos (
                id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                id_pedido BIGINT NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
                id_produto BIGINT NOT NULL REFERENCES produtos(id) ON DELETE RESTRICT,
                quantidade INT NOT NULL DEFAULT 1 CHECK (quantidade > 0),
                preco_unitario NUMERIC(10, 2) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
            );
            
            CREATE INDEX idx_pedido_produtos_id_pedido ON pedido_produtos(id_pedido);
            CREATE INDEX idx_pedido_produtos_id_produto ON pedido_produtos(id_produto);
        `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
            DROP TABLE IF EXISTS pedido_produtos;
        `);
}
