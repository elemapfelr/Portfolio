<script>
	import { onMount } from "svelte";

	export let galleryImg = [];

	onMount(() => {
		let carouselWidth = document.querySelector(".infoBoard").offsetWidth * 0.3;
		let carouselHeight = carouselWidth * 0.474;
		// 캐러셀 아이템의 너비 - 10px (여백 10px)
		let carouselItemWidth = carouselWidth - 10;
		let sceneHeight = carouselWidth + 60;
		// 캐러셀 아이템은 (캐러셀 너비/2) / (탄젠트(중앙각도/2))만큼 떨어짐
		let zValue = carouselWidth / 1.5 / Math.tan(22.5);
		document.querySelector(".gallery.scene").style.height = sceneHeight + "px";
		document.querySelector(".gallery.scene .carousel").style.width =
			carouselWidth + "px";
		document.querySelector(".gallery.scene .carousel").style.height =
			carouselHeight + "px";
		document
			.querySelectorAll(".gallery.scene .carousel .item")
			.forEach((el, idx) => {
				el.style.width = carouselItemWidth + "px";
				el.style.height = carouselHeight + "px";
				el.style.transform = `rotateY(${45 * idx}deg) translateZ(${zValue}px)`;
			});
	});
</script>

<div class="scene">
	<div class="carousel">
		{#each galleryImg as item, i}
			<div class="item">
				<img src={item} alt="gallery item {i}" />
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@mixin keyframes($name) {
		@keyframes #{$name} {
			@content;
		}
	}
	.scene {
		height: 470px;
		display: flex;
		justify-content: center;
		align-items: center;
		perspective: 1200px;

		.carousel {
			width: 410px;
			height: 190px;
			position: relative;
			transform-style: preserve-3d;
			animation: spin 45s infinite linear;

			&:hover {
				animation-play-state: paused;
			}

			.item {
				position: absolute;
				top: 0;
				left: 0;
				width: 400px;
				height: 190px;
				display: flex;
				align-items: flex-start;
				justify-content: center;
				overflow: hidden;

				img {
					width: 100%;
				}

				@for $i from 1 through 8 {
					&:nth-child(#{$i}) {
						$j: $i - 1;
						transform: rotateY($j * 45deg) translateZ(495px);
					}
				}
			}

			@include keyframes(spin) {
				from {
					transform: rotateY(0deg);
				}
				to {
					transform: rotateY(360deg);
				}
			}
		}
	}
</style>
