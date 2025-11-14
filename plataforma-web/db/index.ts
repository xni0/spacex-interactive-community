// Archivo: plataforma-web/db/index.ts

import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
// Importamos el esquema de las tablas que acabas de crear
import * as schema from './schema'; 

// 1. Inicializa el cliente Turso/libSQL usando las variables de entorno
const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// 2. Exporta la conexión de Drizzle (Lucilene la usará en las API Routes)
export const db = drizzle(client, { schema });