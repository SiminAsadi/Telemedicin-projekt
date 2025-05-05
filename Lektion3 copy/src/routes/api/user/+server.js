import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema.js';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm'; // 👈 tilføj denne!

export async function POST({ request }) {
	const { username, password } = await request.json();
	const hashedPass = await bcrypt.hash(password, 10);
	const createduser = await db.insert(user).values({ username, password: hashedPass }).returning();
	return new Response(JSON.stringify(createduser), { status: 201 });
}

//Opdatere min +server.js til at håndtere både GET og DELETE.
//for at tilføje funktionalitet til at vise alle brugere og til at slette brugere:
export async function GET() {
	const users = await db.select().from(user);
	return new Response(JSON.stringify(users), { status: 200 });
}

export async function DELETE({ request }) {
	const { id } = await request.json();
	await db.delete(user).where(eq(user.id, id));
	return new Response(JSON.stringify({ message: 'Bruger slettet' }), { status: 200 });
}
