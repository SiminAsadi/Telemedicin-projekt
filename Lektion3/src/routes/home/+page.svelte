<nav>
	<div class="button-container">
		<a href="/vitals">📊 Indtast vitale målinger</a>
		<a href="/diary">📝 Skriv dagbog</a>
		<a href="/admin">🔧 Admin-side</a>
	</div>
</nav>

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

	.button-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
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
		width: 80%; /* Adjust width for better centering */
		max-width: 400px;
		text-align: center;
	}

	nav a:hover {
		background-color: #d7ebf7;
	}
</style>