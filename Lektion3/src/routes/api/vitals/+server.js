import { db } from '$lib/server/db';
import { vitals } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { triageStatus } from '$lib/server/triage.js';

export async function POST({ request }) {
	const user = request.user;
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { weight, pulse, spo2 } = await request.json();

	// Brug fælles triage-logik
	const status = triageStatus({ weight, pulse, spo2 });

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
