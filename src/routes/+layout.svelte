<script>
	import { fly } from "svelte/transition";
	import { cubicIn, cubicOut } from "svelte/easing";
	import "$lib/scss/style.scss";
	import Nav from "$lib/components/common/Nav.svelte";
	import Loading from "$lib/components/common/Loading.svelte";
	import { onMount } from "svelte";
	export let data;

	let loading = true;
	onMount(() => {
		loading = false;
	});
</script>

<main>
	{#if loading}
		<Loading />
	{/if}
	<Nav {loading} />
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
		height: 100dvh;
		overflow: hidden;
		transition: all 0.3s;
	}
	@media screen and (max-width: 720px) {
		.slotArea {
			height: calc(100dvh - 50px);
		}
	}
</style>
