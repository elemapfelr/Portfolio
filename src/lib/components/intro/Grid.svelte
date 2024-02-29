<script>
	export let col;
	export let row;
	export let content;
	export let link;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="grid" style="grid-column: {col}; grid-row: {row}">
	<a href={link}>{content}</a>
</div>

<style lang="scss">
	.grid {
		transition: all 0.2s;
		border-radius: 30px;
		padding: 30px;
		box-sizing: border-box;
		background-color: transparentize(#fff, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
