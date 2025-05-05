<script>
	let weight = '';
	let pulse = '';
	let spo2 = '';
	let status = '';
	let vitalsList = [];

	async function sendVitals() {
		const res = await fetch('/api/vitals', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ weight, pulse, spo2 })
		});

		const data = await res.json();
		status = data.status;

		// Gem i lokal liste for visning
		vitalsList = [
			...vitalsList,
			{
				weight,
				pulse,
				spo2,
				status
			}
		];

		// Nulstil felter
		weight = '';
		pulse = '';
		spo2 = '';
	}
</script>

<h1>Indtast vitale målinger</h1>

<input bind:value={weight} type="number" placeholder="Vægt (kg)" />
<input bind:value={pulse} type="number" placeholder="Puls" />
<input bind:value={spo2} type="number" placeholder="O2 %" />

<button on:click={sendVitals}>Send Målinger</button>

{#if status}
	<p>
		Status: <strong style="color: {status === 'red' ? 'red' : status === 'yellow' ? 'orange' : 'green'}">{status}</strong>
	</p>
{/if}

<hr />

{#if vitalsList.length > 0}
	<h3>Dine tidligere målinger:</h3>
	<ul>
		{#each vitalsList as m}
			<li>
				Vægt: {m.weight} kg — Puls: {m.pulse} bpm — SpO₂: {m.spo2}% —
				Status:
				<strong style="color: {m.status === 'red' ? 'red' : m.status === 'yellow' ? 'orange' : 'green'}">
					{m.status}
				</strong>
			</li>
		{/each}
	</ul>
{/if}
