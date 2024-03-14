<script>
	import { fade } from "svelte/transition";
	let items = [];
	for (let i = 1; i <= 16; i++) {
		items.push(i);
	}
</script>

<div class="glass" out:fade={{ duration: 300, delay: 300 }}>
	<div class="loader">
		{#each items as item}
			<span class="block-{item}"></span>
		{/each}
	</div>
</div>

<style lang="scss">
	$loader-color: #202020;
	$loader-size: 20vh;

	.glass {
		position: absolute;
		top: 0;
		left: 0;
		width: 100dvw;
		height: 100dvh;
		background-color: #fffa;
		backdrop-filter: blur(10px);
		z-index: 3;
		display: flex;
		justify-content: center;
		align-items: center;
		.loader {
			height: 60px;
			left: 50%;
			position: fixed;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
			width: 60px;
			span {
				animation: load 4s ease-in-out infinite;
				display: block;
				height: 12px;
				opacity: 0;
				position: absolute;
				width: 12px;
				background-image: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
				background-size: 400% 400%;

				@for $i from 1 through 16 {
					&.block-#{$i} {
						animation-delay: 1s - ($i * 0.08);
						@if $i <= 4 {
							left: 16px * ($i - 1);
							background-position-x: 25% * ($i - 1);
						} @else if $i <= 8 {
							left: 16px * ($i - 5);
							background-position-x: 25% * ($i - 5);
						} @else if $i <= 12 {
							left: 16px * ($i - 9);
							background-position-x: 25% * ($i - 9);
						} @else if $i <= 16 {
							left: 16px * ($i - 13);
							background-position-x: 25% * ($i - 13);
						}
						top: 16px * floor(calc($i / 4.01));
						background-position-y: 25% * floor(calc($i / 4.01));
					}
				}
			}
		}

		@keyframes load {
			0% {
				opacity: 0;
				transform: translateY(-100px);
			}
			15% {
				opacity: 0;
				transform: translateY(-100px);
			}
			30% {
				opacity: 1;
				transform: translateY(0);
			}
			70% {
				opacity: 1;
				transform: translateY(0);
			}
			85% {
				opacity: 0;
				transform: translateY(100px);
			}
			100% {
				opacity: 0;
				transform: translateY(100px);
			}
		}
	}
</style>
