<script>
	import { onMount } from "svelte";
	import { on } from "svelte/events";
	import Title from '$lib/components/Title.svelte';

	let weight = '';
	let pulse = '';
	let spo2 = '';
	let status = '';
	let vitalsList = $state([]);

	async function sendVitals() {
		const res = await fetch('/api/vitals', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ weight, pulse, spo2 })
		});

		const data = await res.json();
		status = data.status;

		 // Save in local list for display
		vitalsList = [
			...vitalsList,
			{
				weight,
				pulse,
				spo2,
				status
			}
		];

		 // Reset input fields
		weight = '';
		pulse = '';
		spo2 = '';
	}

    onMount( async () => {
        const res = await fetch('/api/vitals');
        vitalsList = await res.json();
    });
</script>

<Title>Indtast vitale målinger</Title>
<div class="container">
    <div class="card">
        <div class="input-container">
            <input class="input-field" bind:value={weight} type="number" placeholder="Vægt (kg)" />
            <input class="input-field" bind:value={pulse} type="number" placeholder="Puls" />
            <input class="input-field" bind:value={spo2} type="number" placeholder="O2 %" />
            <button class="submit-btn" on:click={sendVitals}>Send Målinger</button>
        </div>
    </div>

    {#if vitalsList.length > 0}
        <div class="card">
            <h3>Dine tidligere målinger:</h3>
            <ul class="measurements-list">
                {#each vitalsList as m}
                    <li class="measurement-item">
                        Vægt: {m.weight} kg — Puls: {m.pulse} bpm — SpO₂: {m.spo2}% —
                        Status:
                        <strong style="color: {m.status === 'red' ? 'red' : m.status === 'yellow' ? 'orange' : 'green'}">
                            {m.status}
                        </strong>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</div>

<style>
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
        margin-bottom: 20px;
    }

    h1 {
        color: #2c3e50;
        margin-bottom: 30px;
        text-align: center;
    }

    .input-container {
        display: flex;
        flex-direction: column;
        gap: 15px;
        max-width: 400px;
        margin: 0 auto;
    }

    .input-field {
        padding: 12px;
        border: 2px solid #e2e8f0;
        border-radius: 6px;
        font-size: 16px;
        transition: border-color 0.2s;
    }

    .input-field:focus {
        outline: none;
        border-color: #3498db;
    }

    .submit-btn {
        padding: 12px 20px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .submit-btn:hover {
        background: #2980b9;
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