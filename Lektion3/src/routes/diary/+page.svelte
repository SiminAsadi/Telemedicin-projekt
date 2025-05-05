<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Title from '$lib/components/Title.svelte';

	let diary = [];
	let title = '';
	let content = '';
	let loading = false;

	const saveDiary = async () => {
		const response = await fetch('/api/diary/self', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title, content })
		});
		const data = await response.json();
		if (response.ok) {
			diary.push(data);
			title = '';
			content = '';
		}
	};

	const logout = async () => {
		const response = await fetch('/api/logout', { method: 'POST' });
		if (response.ok) goto('/');
	};

	onMount(async () => {
		loading = true;
		const res = await fetch('/api/diary/self');
		diary = await res.json();
		loading = false;
	});
</script>

<button on:click={logout}>Log ud</button>

<Title>Patient Dagbog</Title>

<a href="/admin">Gå til Admin Side</a>

<input bind:value={title} type="text" placeholder="Titel" />
<textarea bind:value={content} placeholder="Indhold"></textarea>
<button on:click={saveDiary} disabled={loading}>Gem dagbog</button>

<hr />
{#if loading}
	<p>Indlæser...</p>
{/if}
{#each diary as post}
	<div>
		<h2>{post.title}</h2>
		<p>{post.created_at}</p>
		<p>{post.content}</p>
	</div>
{/each}
