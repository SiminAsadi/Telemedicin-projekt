<script>
    import { onMount } from "svelte";
    
    let allVitals = [];
    
    onMount(async () => {
        const res = await fetch('/api/admin/vitals');
        allVitals = await res.json();
    });
</script>

<div class="container">
    <h1>Alle Brugeres Målinger</h1>
    <div class="card">
        {#if allVitals.length > 0}
            <ul class="measurements-list">
                {#each allVitals as measurement}
                    <li class="measurement-item">
                        <strong>Bruger: {measurement.userName}</strong><br>
                        Vægt: {measurement.weight} kg — Puls: {measurement.pulse} bpm — SpO₂: {measurement.spo2}% —
                        Status:
                        <strong style="color: {measurement.status === 'red' ? 'red' : measurement.status === 'yellow' ? 'orange' : 'green'}">
                            {measurement.status}
                        </strong>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>Ingen målinger at vise</p>
        {/if}
    </div>
</div>

<style>
    /* Genbruger eksisterende styling fra vitals siden */
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }
    
    .card {
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .measurements-list {
        list-style: none;
        padding: 0;
    }

    .measurement-item {
        padding: 12px;
        border-bottom: 1px solid #e2e8f0;
    }

    .measurement-item:last-child {
        border-bottom: none;
    }
</style>
