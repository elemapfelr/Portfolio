<script>
	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	import '$lib/scss/style.scss';
	import Nav from '$lib/components/common/Nav.svelte';
	export let data;
</script>

<main>
	<Nav />
	{#key data.pathname}
		<div
			class="slotArea"
			in:fly={{ easing: cubicOut, y: 10, duration: 300, delay: 400 }}
			out:fly={{ easing: cubicIn, y: -10, duration: 300 }}
		>
			<slot />
		</div>
	{/key}
</main>

<style lang="scss">
	.slotArea {
		height: 100vh;
		overflow: hidden;
		transition: all 0.3s;
	}
</style>
