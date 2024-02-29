<script>
	import '$lib/scss/style.scss';
</script>

<main>
	<nav>
		<h1>Hello World.</h1>
		<h2>My name is John.</h2>
	</nav>
	<div class="slotArea">
		<slot />
	</div>
</main>

<style lang="scss">
	nav {
		background-color: #202020;
		color: #fff;
		padding-right: 10px;
	}
	.slotArea {
		flex: 1;
		height: 100vh;
	}
</style>
