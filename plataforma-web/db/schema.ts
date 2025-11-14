import { sql } from 'drizzle-orm';
import { 
  sqliteTable, 
  text, 
  integer, 
  primaryKey,
} from 'drizzle-orm/sqlite-core';

// --- Entidades del Modelo de Datos ---

/**
 * Usuario: Entidad central para perfiles y autenticación.
 */
export const users = sqliteTable('Usuario', {
  id: integer('ID').primaryKey({ autoIncrement: true }),
  nombre: text('nombre').notNull(),
  email: text('email').unique().notNull(),
  contrasena_cifrada: text('contrasena_cifrada').notNull(),
  avatar: text('avatar'),
  bio: text('bio'),
});

/**
 * PublicacionForo: Hilos de discusión.
 */
export const forumPosts = sqliteTable('PublicacionForo', {
  id: integer('ID').primaryKey({ autoIncrement: true }),
  autor_id: integer('autor_id')
    .notNull()
    .references(() => users.id),
  titulo: text('titulo').notNull(),
  contenido: text('contenido').notNull(),
  categoria: text('categoria').notNull(),
  // Usamos TEXT para CURRENT_TIMESTAMP en SQLite
  fecha: text('fecha') 
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`), 
});

/**
 * ComentarioForo: Respuestas a los hilos del foro.
 */
export const forumComments = sqliteTable('ComentarioForo', {
  id: integer('ID').primaryKey({ autoIncrement: true }),
  autor_id: integer('autor_id')
    .notNull()
    .references(() => users.id),
  publicacion_id: integer('publicacion_id')
    .notNull()
    .references(() => forumPosts.id),
  contenido: text('contenido').notNull(),
  // Usamos TEXT
  fecha: text('fecha') 
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

/**
 * LikePublicacion: Entidad asociativa para votos (Like N:M).
 */
export const postLikes = sqliteTable('LikePublicacion', {
  usuario_id: integer('usuario_id')
    .notNull()
    .references(() => users.id),
  publicacion_id: integer('publicacion_id')
    .notNull()
    .references(() => forumPosts.id),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.usuario_id, table.publicacion_id] }),
  };
});


/**
 * Amistad: Relación N:M entre dos Usuarios.
 */
export const friendships = sqliteTable('Amistad', {
  id: integer('ID').primaryKey({ autoIncrement: true }),
  solicitante_id: integer('solicitante_id')
    .notNull()
    .references(() => users.id),
  receptor_id: integer('receptor_id')
    .notNull()
    .references(() => users.id),
  estado: text('estado', { enum: ['pendiente', 'aceptada', 'bloqueada'] }).notNull(),
});

/**
 * MensajeChat: Historial de mensajes privados.
 */
export const chatMessages = sqliteTable('MensajeChat', {
  id: integer('ID').primaryKey({ autoIncrement: true }),
  emisor_id: integer('emisor_id')
    .notNull()
    .references(() => users.id),
  receptor_id: integer('receptor_id')
    .notNull()
    .references(() => users.id),
  mensaje: text('mensaje').notNull(),
  // Usamos TEXT
  hora: text('hora') 
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});


/**
 * Notificacion: Alertas para el usuario.
 */
export const notifications = sqliteTable('Notificacion', {
  id: integer('ID').primaryKey({ autoIncrement: true }),
  usuario_id: integer('usuario_id')
    .notNull()
    .references(() => users.id),
  tipo: text('tipo').notNull(), 
  // CORRECCIÓN: Eliminamos { mode: 'boolean' } para evitar el conflicto con default(0)
  leida: integer('leida') 
    .notNull()
    .default(0), // 0 es 'no leída'
  // Usamos TEXT
  fecha: text('fecha') 
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});