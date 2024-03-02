<script>
	import Grid from '$lib/components/intro/Grid.svelte';

	let grids = [
		{
			col: '1/3',
			row: '1/3',
			content: 'grid cell',
			link: ''
		},
		{
			col: '3/5',
			row: '1/2',
			content: 'grid cell',
			link: ''
		},
		{
			col: '3/4',
			row: '2/3',
			content: 'Omock',
			link: '/omock'
		},
		{
			col: '4/5',
			row: '2/3',
			content: 'grid cell',
			link: ''
		},
		{
			col: '1/2',
			row: '3/4',
			content: 'grid cell',
			link: ''
		},
		{
			col: '1/2',
			row: '4/5',
			content: 'grid cell',
			link: ''
		},
		{
			col: '2/3',
			row: '3/5',
			content: 'grid cell',
			link: ''
		},
		{
			col: '3/5',
			row: '3/5',
			content: 'grid cell',
			link: ''
		}
	];
</script>

<div class="gridArea">
	{#each grids as item}
		<Grid col={item.col} row={item.row} content={item.content} link={item.link}></Grid>
	{/each}
</div>

<!-- </div> -->

<!-- <Footer /> -->

<style lang="scss">
	.gridArea {
		flex: 1;
		// width: 100%;
		display: grid;
		padding: 10px;
		box-sizing: border-box;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, calc(25vh - 12.5px));
		gap: 10px;
		background-image: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
	}
</style>
