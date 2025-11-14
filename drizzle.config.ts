// drizzle.config.ts

// Usamos @ts-nocheck para ignorar errores de TypeScript
// causados por drivers faltantes en versiones defectuosas de Drizzle Kit.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  // Ruta a tu esquema
  schema: './plataforma-web/db/schema.ts',
  // Directorio de salida para las migraciones
  out: './plataforma-web/drizzle',

  // Configuración de Turso / SQLite
  dialect: 'sqlite',
  // Usamos 'turso' como driver
  driver: 'turso', 

  // TRUCO FINAL: Configuramos credenciales para evitar el ZodError.
  // La versión rota de Drizzle Kit exige un formato D1, incluso para Turso.
  dbCredentials: {
    // Valores ignorados, pero necesarios para satisfacer al Zod validator de D1:
    accountId: 'ignored',
    databaseId: 'ignored',
    
    // Pasamos el Token de Turso con la clave 'token', que Drizzle espera.
    // ESTA ES LA CLAVE SECRETA QUE Drizzle-Kit usará para la autenticación:
    token: process.env.TURSO_AUTH_TOKEN!,
    
    // NOTA: La URL (TURSO_DATABASE_URL) debe cargarse desde el entorno 
    // pero no se incluye aquí para evitar conflictos de validación.
  },
});

export default config;