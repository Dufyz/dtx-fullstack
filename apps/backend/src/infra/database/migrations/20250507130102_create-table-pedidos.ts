import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
        CREATE TYPE pedido_status as ENUM ('pendente', 'concluido', 'cancelado');

        CREATE TABLE IF NOT EXISTS pedidos (
            id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            total_pedido NUMERIC(10, 2),
            status pedido_status NOT NULL DEFAULT 'pendente',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
        )
    `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
          DROP TABLE IF EXISTS pedidos;
          DROP TYPE IF EXISTS pedido_status;
      `);
}
