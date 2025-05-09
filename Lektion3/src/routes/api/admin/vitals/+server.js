import { db } from '$lib/server/db';
import { vitals, user, diaryPost } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import { triageStatus } from '$lib/server/triage.js';

export async function GET() {
    // Hent alle vitals og join med brugernavn
    const allVitals = await db.select({
        id: vitals.id,
        userName: user.username,
        weight: vitals.weight,
        pulse: vitals.pulse,
        spo2: vitals.spo2,
        date: vitals.date
    })
    .from(vitals)
    .leftJoin(user, eq(vitals.user_id, user.id));

    // Tilføj status til hver måling med fælles triage-funktion
    const vitalsResult = allVitals.map(m => ({
        ...m,
        status: triageStatus(m)
    }));

    // Hent alle dagbogsindlæg og join med brugernavn
    const allDiary = await db.select({
        id: diaryPost.id,
        userName: user.username,
        title: diaryPost.title,
        content: diaryPost.content,
        created_at: diaryPost.created_at
    })
    .from(diaryPost)
    .leftJoin(user, eq(diaryPost.user_id, user.id));

    return new Response(JSON.stringify({
        vitals: vitalsResult,
        diary: allDiary
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
} 