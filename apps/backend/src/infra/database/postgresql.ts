import * as postgres from 'postgres';
import { environment } from '../config';

const sql = postgres(environment.database.connection, {
  prepare: false,
  connect_timeout: 6000,
  idle_timeout: 8000,
  onclose(connId) {
    console.log(`Connection ${connId} closed`);
  },
});

export type SQLQuery = typeof sql;
export default sql;
