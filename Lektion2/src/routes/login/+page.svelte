<script>
	let username = '';
	let password = '';
	let errorMessage = '';

	const login = () => {
		if (username === 'admin' && password === '1234') {
			window.location = '/admin';
		} else {
			errorMessage = 'Brugernavn eller password er forkert';
		}
	};
</script>

<style>
	.container {
		max-width: 400px;
		margin: 5rem auto;
		padding: 2rem;
		border: 1px solid #ccc;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		text-align: center;
		background-color: white;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		margin: 1rem 0;
		border: 1px solid #ccc;
		border-radius: 6px;
		font-size: 1rem;
	}

	button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		cursor: pointer;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 6px;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: #0056b3;
	}

	.error {
		color: red;
		margin-top: 1rem;
	}
</style>


<div class="container">
	<h2>Login</h2>
	<input type="text" placeholder="Brugernavn" bind:value={username} />
	<input type="password" placeholder="Password" bind:value={password} />
	<button on:click={login}>Log ind</button>
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
</div>

