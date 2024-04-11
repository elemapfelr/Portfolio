<script>
	import { onMount } from "svelte";

	export let keyName = "";
	export let sound = "";
	export let clickSound = () => {};

	$: effect = false;
	$: clickTimeout = null;
	function clickEffect() {
		if (clickTimeout) {
			effect = false;
			setTimeout(() => {
				effect = true;
			}, 1);
			clearTimeout(clickTimeout);
		} else {
			effect = true;
		}
		clickTimeout = setTimeout(() => {
			effect = false;
		}, 500); // 0.5초 후에 shadow 클래스 제거
	}

	onMount(() => {
		window.addEventListener("keydown", (e) => {
			if (String(e.key) == String(keyName).toLowerCase()) {
				clickEffect();
				clickSound();
			}
		});
	});
</script>

<button
	class:shadow={effect}
	on:mousedown={() => {
		clickEffect();
		clickSound();
	}}
	on:mouseup={() => {
		clickEffect();
	}}
>
	<span>{keyName}</span>
	<p>{sound}</p>
</button>

<style lang="scss">
	@mixin keyframes($name) {
		@keyframes #{$name} {
			@content;
		}
	}

	button {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: 10px;
		background-color: #363636;
		box-sizing: border-box;
		padding: 5px;
		position: relative;

		span {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 1.2rem;
			font-weight: bold;
			color: #252525;
		}

		p {
			font-family: Arial, Helvetica, sans-serif;
			font-size: 0.7rem;
			color: #ddd;
			font-weight: 300;
		}

		&:active {
			box-shadow: 0 0px 5px #81ffef !important;
		}

		&.shadow {
			transition: box-shadow 0.5s ease;
			box-shadow: 0 0px 5px #81ffef;
			animation: fadeout 0.5s forwards;

			@include keyframes(fadeout) {
				100% {
					box-shadow: 0 0px 5px transparent;
				}
			}
		}
	}
</style>
