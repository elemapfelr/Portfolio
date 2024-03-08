<script>
	import { goto } from '$app/navigation';
	import { fly, fade } from 'svelte/transition';

	export let col;
	export let row;
	export let title;
	export let contents;
	export let link;
	export let titleImgSrc;

	let clicked = false;

	function gridClick() {
		clicked = clicked ? false : true;
	}

	function goLink() {
		goto(link);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- <div class="grid" style="grid-column: {col}; grid-row: {row}" on:click={gridClick}> -->
<div class="grid" on:click={gridClick}>
	<div class="contents">
		{#if clicked}
			<div
				class="details"
				in:fly={{ x: 100, duration: 1000, delay: 300 }}
				out:fly={{ x: 200, duration: 500 }}
			>
				<h5>{title}</h5>
				<p>{contents}</p>
				<button on:click={goLink}>Go!</button>
			</div>
		{:else}
			<div
				class="title"
				in:fade={{ duration: 200, delay: 500 }}
				out:fly={{ y: -100, duration: 300 }}
			>
				<div class="square">
					<img src={titleImgSrc} alt="title logo" />
				</div>
				<h4>{title}</h4>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	@mixin keyframes($name) {
		@keyframes #{$name} {
			@content;
		}
	}

	.grid {
		transition: all 0.2s;
		border-radius: 30px;
		padding: 30px;
		box-sizing: border-box;
		background-color: transparentize(#fff, 0.3);
		cursor: default;
		overflow: hidden;

		.contents {
			width: 100%;
			height: 100%;
			position: relative;
			.title {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
				.square {
					width: 90px;
					height: 90px;
					// padding: 10px;
					border-radius: 30px;
					box-sizing: border-box;
					overflow: hidden;
					margin: 0 auto;
					background-color: #fff;
					transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

					img {
						width: 100%;
						height: auto;
						margin: 0 auto;
					}
				}

				h4 {
					margin-top: 5px;
					font-size: 1rem;
					text-align: center;
					transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
				}
			}
			.details {
				width: 100%;
				max-height: 100%;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				h5 {
					text-align: left;
					font-size: 1.5rem;
					margin-bottom: 10px;
				}
				p {
					text-align: left;
					letter-spacing: -1px;
				}
				button {
					float: right;
					margin-top: 10px;
					padding: 5px 20px 4px;
					border: none;
					outline: none;
					background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
					background-size: 200% 200%;
					color: #202020;
					background-position: 0% 50%;
					cursor: pointer;

					&:hover {
						animation: gradientMove 15s linear infinite;
					}

					@include keyframes(gradientMove) {
						0% {
							background-position: 0% 50%;
						}
						50% {
							background-position: 100% 50%;
						}
						100% {
							background-position: 0% 50%;
						}
					}
				}
			}
		}

		&:hover {
			.contents {
				.title {
					transform: translate(-50%, -50%) scale(1.05);
					.square {
						box-shadow: 0 0 20px #7775;
					}
				}
			}
		}
	}
</style>
