<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Title from '$lib/components/Title.svelte';
	
	let username = '';
	let password = '';
	let users = [];

	// Funktion: Opret bruger
	const createUser = async () => {
		const response = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		await response.json();

		if (response.ok) {
			alert('Bruger oprettet!');
			username = '';
			password = '';
			await loadUsers(); // Opdatér listen efter oprettelse
		} else {
			alert('Fejl ved oprettelse af bruger!');
		}
	};

	// Funktion: Hent brugere
	const loadUsers = async () => {
		const res = await fetch('/api/user');
		users = await res.json();
        console.log("Hentede brugere:", users);
	};

	// Funktion: Slet bruger
	const deleteUser = async (id) => {
		const confirmed = confirm("Vil du slette denne bruger?");
		if (!confirmed) return;

		const res = await fetch('/api/user', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id })
		});

		if (res.ok) {
			users = users.filter(u => u.id !== id); // Fjern bruger fra visning
		} else {
			alert('Kunne ikke slette brugeren');
		}
	};

	// Kør ved indlæsning
	onMount(() => {
		loadUsers();
	});
</script>

<!-- UI -->

<Title>Den hemmelige administratorside</Title>

<!-- knap til vitals-oversigt -->
<button class="btn btn-secondary mb-4" on:click={() => goto('/admin/vitals')}>Se alle brugeres målinger</button>

<div class="space-y-2 mb-4">
	<input type="text" bind:value={username} placeholder="Brugernavn" class="input input-bordered w-full" />
	<input type="password" bind:value={password} placeholder="Adgangskode" class="input input-bordered w-full" />
	<button class="btn btn-primary w-full" on:click={createUser}>Opret bruger</button>
</div>

<h2 class="text-xl font-semibold mt-6 mb-2">Eksisterende brugere:</h2>
<ul class="space-y-1">
	{#each users as u}
		<li class="flex justify-between items-center bg-base-200 p-2 rounded">
			<span>{u.username}</span>
			<button class="btn btn-sm btn-error" on:click={() => deleteUser(u.id)}>❌ Slet</button>
		</li>
	{/each}
</ul>

