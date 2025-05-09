<script>
	import Title from '$lib/components/Title.svelte';
	// valgfri
</script>

<style>
	.container {
		max-width: 700px;
		margin: auto;
		padding: 2rem;
		font-family: sans-serif;
	}

	h1 {
		color: #136b9f;
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	p {
		margin-bottom: 2rem;
		font-size: 1.1rem;
	}

	nav a {
		display: block;
		padding: 1rem;
		background-color: #f0f4f8;
		border: 1px solid #ccc;
		border-radius: 8px;
		text-decoration: none;
		color: #333;
		margin-bottom: 1rem;
		font-weight: bold;
		transition: 0.2s ease;
	}

	nav a:hover {
		background-color: #d7ebf7;
	}
</style>

<div class="container">
	<Title>Telemedicin Portal</Title>
	<p style="margin-top: 1cm;">Velkommen til vores digitale sundhedsplatform for patienter med hjertesvigt.</p>

	<nav style="margin-top: 2cm;">
		<a href="/login">🔐 Login</a>
	</nav>
</div>
