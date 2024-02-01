<script>
	import Header from '$lib/components/Header.svelte';
	import '$lib/scss/style.scss';
	export const prerender = true;
</script>

<Header />

<main>
	<slot />
</main>
