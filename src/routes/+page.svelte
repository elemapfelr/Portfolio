<script>
	import Grid from '$lib/components/intro/Grid.svelte';
	import gomoku from '$lib/img/gomoku.svg';

	let grids = [
		{
			col: '1/3',
			row: '1/3',
			title: 'grid cell',
			contents:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?',
			link: ''
		},
		{
			col: '3/5',
			row: '1/2',
			title: 'grid cell',
			contents:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?',
			link: ''
		},
		{
			col: '3/4',
			row: '2/3',
			title: 'Omock',
			contents: 'This is a simple gomoku that can be played online. Do you want to play?',
			link: '/omock',
			titleImgSrc: gomoku
		},
		{
			col: '4/5',
			row: '2/3',
			title: 'grid cell',
			contents:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?',
			link: ''
		},
		{
			col: '1/2',
			row: '3/4',
			title: 'grid cell',
			contents:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?',
			link: ''
		},
		{
			col: '1/2',
			row: '4/5',
			title: 'grid cell',
			contents:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?',
			link: ''
		},
		{
			col: '2/3',
			row: '3/5',
			title: 'grid cell',
			contents:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?',
			link: ''
		},
		{
			col: '3/5',
			row: '3/5',
			title: 'grid cell',
			contents:
				'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?',
			link: ''
		}
	];
</script>

<div class="gridArea">
	{#each grids as item}
		<Grid
			col={item.col}
			row={item.row}
			title={item.title}
			contents={item.contents}
			link={item.link}
			titleImgSrc={item.titleImgSrc}
		></Grid>
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
