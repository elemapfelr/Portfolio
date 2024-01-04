<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/scss/style.scss';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />
