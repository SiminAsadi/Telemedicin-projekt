<script>
    import { onMount } from "svelte";
    import Title from '$lib/components/Title.svelte';
    
    let allVitals = [];
    let allDiary = [];
    let groupedData = {};

    // Hjælpefunktion: Gruppér vitals og diary pr. bruger og dato
    function groupByUserAndDate(vitals, diary) {
        const grouped = {};
        const getDate = (d) => d && d.substring(0, 10);
        for (const v of vitals) {
            const date = getDate(v.date);
            if (!date) continue; // spring målinger uden dato over
            if (!grouped[v.userName]) grouped[v.userName] = {};
            if (!grouped[v.userName][date]) grouped[v.userName][date] = { vitals: [], diary: [] };
            grouped[v.userName][date].vitals.push(v);
        }
        for (const d of diary) {
            const date = getDate(d.created_at);
            if (!date) continue; // spring dagbog uden dato over
            if (!grouped[d.userName]) grouped[d.userName] = {};
            if (!grouped[d.userName][date]) grouped[d.userName][date] = { vitals: [], diary: [] };
            grouped[d.userName][date].diary.push(d);
        }
        return grouped;
    }

    // Hent data fra API og gruppér dem
    onMount(async () => {
        const res = await fetch('/api/admin/vitals');
        const data = await res.json();
        allVitals = data.vitals;
        allDiary = data.diary;
        groupedData = groupByUserAndDate(allVitals, allDiary);
    });
</script>

<Title>Alle Brugeres Målinger og Dagbogsindlæg pr. Dato</Title>

<div class="container">
    <!-- Hvis der er data, vis dem grupperet -->
    {#if Object.keys(groupedData).length > 0}
        {#each Object.entries(groupedData) as [userName, dates]}
            <div class="user-section">
                <!-- Brugernavn -->
                <h2>Bruger: {userName}</h2>
                {#each Object.entries(dates) as [date, entry]}
                    <div class="date-section">
                        <!-- Datoen vises altid øverst -->
                        <h3>{date ? date : '(Dato mangler)'}</h3>
                        <!-- Målinger vises først -->
                        {#if entry.vitals.length > 0}
                            <div class="vitals-block">
                                <span class="block-label">Målinger:</span>
                                <ul>
                                    {#each entry.vitals as v}
                                        <li>
                                            Vægt: {v.weight} kg — Puls: {v.pulse} bpm — SpO₂: {v.spo2}% — 
                                            Status: <strong style="color: {v.status === 'red' ? 'red' : v.status === 'yellow' ? 'orange' : 'green'}">{v.status}</strong>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}
                        <!-- Dagbogsindlæg vises bagefter -->
                        {#if entry.diary.length > 0}
                            <div class="diary-block">
                                <span class="block-label">Dagbog:</span>
                                <ul>
                                    {#each entry.diary as d}
                                        <li>
                                            <em>{d.title}</em><br>
                                            {d.content}<br>
                                            <span style="font-size: 0.9em; color: #888;">{d.created_at}</span>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}
                    </div>
                {/each}
            </div>
        {/each}
    {:else}
        <p>Ingen data at vise</p>
    {/if}
</div>

<style>
    /* Container for hele indholdet */
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
    /* Sektion for hver bruger */
    .user-section {
        margin-bottom: 2.5rem;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 1.5rem;
    }
    /* Sektion for hver dato */
    .date-section {
        margin-bottom: 1.5rem;
        background: #f9f9f9;
        border-radius: 8px;
        padding: 12px 18px;
    }
    h2 {
        margin-top: 1.5rem;
        color: #2c3e50;
    }
    h3 {
        margin-bottom: 0.5rem;
        color: #3498db;
    }
    .block-label {
        font-weight: bold;
        color: #888;
        display: block;
        margin-bottom: 0.2rem;
    }
    .vitals-block, .diary-block {
        margin-bottom: 0.5rem;
    }
    ul {
        list-style: none;
        padding: 0;
        margin-bottom: 0.5rem;
    }
    li {
        padding: 8px 0;
        border-bottom: 1px solid #e2e8f0;
    }
    li:last-child {
        border-bottom: none;
    }
</style>
