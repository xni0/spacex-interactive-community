CREATE TABLE `MensajeChat` (
	`ID` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`emisor_id` integer NOT NULL,
	`receptor_id` integer NOT NULL,
	`mensaje` text NOT NULL,
	`hora` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`emisor_id`) REFERENCES `Usuario`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`receptor_id`) REFERENCES `Usuario`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `ComentarioForo` (
	`ID` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`autor_id` integer NOT NULL,
	`publicacion_id` integer NOT NULL,
	`contenido` text NOT NULL,
	`fecha` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`autor_id`) REFERENCES `Usuario`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`publicacion_id`) REFERENCES `PublicacionForo`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `PublicacionForo` (
	`ID` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`autor_id` integer NOT NULL,
	`titulo` text NOT NULL,
	`contenido` text NOT NULL,
	`categoria` text NOT NULL,
	`fecha` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`autor_id`) REFERENCES `Usuario`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Amistad` (
	`ID` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`solicitante_id` integer NOT NULL,
	`receptor_id` integer NOT NULL,
	`estado` text NOT NULL,
	FOREIGN KEY (`solicitante_id`) REFERENCES `Usuario`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`receptor_id`) REFERENCES `Usuario`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Notificacion` (
	`ID` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`usuario_id` integer NOT NULL,
	`tipo` text NOT NULL,
	`leida` integer DEFAULT 0 NOT NULL,
	`fecha` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `LikePublicacion` (
	`usuario_id` integer NOT NULL,
	`publicacion_id` integer NOT NULL,
	PRIMARY KEY(`usuario_id`, `publicacion_id`),
	FOREIGN KEY (`usuario_id`) REFERENCES `Usuario`(`ID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`publicacion_id`) REFERENCES `PublicacionForo`(`ID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Usuario` (
	`ID` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL,
	`email` text NOT NULL,
	`contrasena_cifrada` text NOT NULL,
	`avatar` text,
	`bio` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Usuario_email_unique` ON `Usuario` (`email`);