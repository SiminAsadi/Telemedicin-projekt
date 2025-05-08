import { db } from '$lib/server/db';
import { vitals } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const user = request.user;
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { weight, pulse, spo2 } = await request.json();

	// Triage-logik
	let status = 'green';
	if (weight > 100 || pulse > 100 || spo2 < 92) status = 'yellow';
	if (pulse > 120 || spo2 < 88) status = 'red';

	// Gem målingen
	await db.insert(vitals).values({
		user_id: user.id,
		weight,
		pulse,
		spo2
	});

	return json({ status });
}

export async function GET({ request }) {
	const user = request.user;
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const vitalsData = await db.query.vitals.findMany({
		where: (vitals, { eq }) => eq(vitals.user_id, user.id),
		orderBy: (vitals, { desc }) => desc(vitals.date)
	});

	return json(vitalsData);
}
