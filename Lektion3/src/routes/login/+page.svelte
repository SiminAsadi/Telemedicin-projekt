<script>
	import { goto } from '$app/navigation';
	import Title from '$lib/components/Title.svelte';

	let username = $state('user');
	let password = $state('password');

	const login = async () => {
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});

		const data = await response.json();

		if (response.ok) {
			// Hvis brugeren hedder 'admin', send til adminside
			if (username === 'admin') {
				goto('/admin');
			} else {
				goto('/home');
			}
		} else {
			alert('Login failed!');
		}
	};
</script>

<Title>Login</Title>

<input class="input" bind:value={username} type="text" placeholder="Indtast Email" />
<input class="input" bind:value={password} type="password" placeholder="Indtast Password" />
<button class="btn btn-primary" onclick={login}>Login</button>
