<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let title;
	export let simpleDesc;
	export let galleryType;
	export let galleryImg;
	export let skillStacks;
	export let desc;

	onMount(() => {
		if (galleryType == 'vertical') {
			let verticalImg = document.querySelector('.gallery.vertical img');
			let sliderId;
			let imgVerticalSlider = () => {
				let imgHeight = verticalImg.offsetHeight;
				verticalImg.style.top = verticalImg.offsetTop - 1 + 'px';

				if (verticalImg.offsetTop - 1 < -imgHeight + 300) {
					verticalImg.style.top = 0 + 'px';
				}
				sliderId = requestAnimationFrame(imgVerticalSlider);
			};
			requestAnimationFrame(imgVerticalSlider);
		}
	});
</script>

<div class="infoBoard">
	<h2>{title}</h2>
	<p class="simpleDesc">{simpleDesc}</p>
	{#if galleryType == 'vertical'}
		<div class="gallery vertical">
			<img src={galleryImg} alt="gallery Img" />
		</div>
	{:else if galleryType == 'multi'}
		<div class="gallery"></div>
	{:else if galleryType == 'grid'}
		<div class="gallery"></div>
	{:else if galleryType == 'one'}
		<div class="gallery"></div>
	{/if}
	<div class="skillStacks">
		{#each skillStacks as item}
			<span>#{item}</span>
		{/each}
	</div>
	<div class="description">
		{#if desc}
			{#each desc as item}
				<h3>{item.title}</h3>
				<p>{item.desc}</p>
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	@mixin keyframes($name) {
		@keyframes #{$name} {
			@content;
		}
	}
	.infoBoard {
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}
		&::-webkit-scrollbar-track {
			background: transparent;
		}
		&::-webkit-scrollbar-thumb {
			background-color: #fff7;
			border-radius: 2px;
		}

		h2 {
			font-size: 1.2rem;
			letter-spacing: -1px;
			position: relative;

			&::before {
				content: '';
				display: block;
				position: absolute;
				bottom: 0;
				left: 0px;
				width: 200px;
				height: 50%;
				background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
				z-index: -1;
			}
		}

		p.simpleDesc {
			font-size: 0.9rem;
			letter-spacing: -1.4px;
			margin: 5px 0 10px 0;
		}

		.gallery {
			&.vertical {
				width: 100%;
				max-width: 640px;
				height: 360px;
				position: relative;
				overflow: hidden;
				box-shadow: 0 5px 10px #20202044;

				img {
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
				}
			}
		}

		.skillStacks {
			margin-top: 10px;
			display: flex;
			flex-wrap: wrap;
			row-gap: 5px;
			column-gap: 5px;
			span {
				font-size: 0.7rem;
				color: #202020;
				letter-spacing: -0.7px;
				background-color: #dedede;
			}
		}
	}
</style>
