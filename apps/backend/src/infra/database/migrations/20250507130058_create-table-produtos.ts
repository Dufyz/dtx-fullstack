import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TABLE IF NOT EXISTS produtos (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            nome VARCHAR(255),
            categoria VARCHAR(255),
            descricao TEXT,
            preco NUMERIC(10, 2),
            quantidade_estoque INT NOT NULL CHECK (quantidade_estoque >= 0),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
          DROP TABLE IF EXISTS produtos;
      `);
}
