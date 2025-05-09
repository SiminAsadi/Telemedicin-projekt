<script>
	import { onMount } from 'svelte';
	import Title from '$lib/components/Title.svelte';

	let diary = [];
	let title = '';
	let content = '';
	let loading = false;

	// Hjælpefunktion: Hent dagbogslisten fra API
	async function fetchDiary() {
		loading = true;
		const res = await fetch('/api/diary/self');
		diary = await res.json();
		loading = false;
	}

	// Gem dagbog og opdater listen automatisk
	const saveDiary = async () => {
		const response = await fetch('/api/diary/self', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content })
		});
		if (response.ok) {
			title = '';
			content = '';
			await fetchDiary(); // Opdater listen automatisk
		}
	};

	onMount(fetchDiary);
</script>

<style>
	.container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		font-family: Arial, sans-serif;
	}

	h1 {
		text-align: center;
		color: #333;
	}

	input, textarea {
		width: 100%;
		margin-bottom: 10px;
		padding: 10px;
		font-size: 16px;
		border: 1px solid #ccc; /* Synlig ramme */
		border-radius: 5px; /* Afrundede hjørner */

			}

	input:focus, textarea:focus {
		border-color: #007BFF; /* Fremhæv rammefarve ved fokus */
		
	}

	button {
		width: 100%;
		padding: 12px;
		font-size: 16px;
		font-weight: bold;
		color: white;
		background-color: #007BFF;
		border: none;
		border-radius: 10px;
		cursor: pointer;
		transition: background-color 0.3s ease;
		margin-bottom: 20px; 
	}

	button:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}

	.diary-entry {
		border: 1px solid #ddd;
		padding: 10px;
		margin-bottom: 10px;
		border-radius: 5px;
		background-color: #f9f9f9;
	}

	.diary-entry h2 {
		margin: 0 0 5px;
		color: #007BFF;
	}

	.diary-entry p {
		margin: 5px 0;
		color: #555;
	}
</style>

<div class="container">
	<Title>Patient Dagbog</Title>

	<h1>Tilføj en ny dagbogsindgang</h1>
	<input bind:value={title} type="text" placeholder="Titel" />
	<textarea bind:value={content} placeholder="Indhold"></textarea>
	<button on:click={saveDiary} disabled={loading}>Gem dagbog</button>

	{#if loading}
		<p>Indlæser...</p>
	{/if}

	<h1>Dagbogsindlæg</h1>
	{#each diary as post}
		<div class="diary-entry">
			<h2>{post.title}</h2>
			<p><strong>Dato:</strong> {post.created_at}</p>
			<p>{post.content}</p>
		</div>
	{/each}
</div>
