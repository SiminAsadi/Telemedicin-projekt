//importerer funktioner/typer fra drizzle-orm, som bruges til at definere tabel og dens kolonner
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

//definerer en tabel i databasen, der hedder "user"
export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
 	password: text('password').notNull()
});
