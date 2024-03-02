<script>
	import { goto } from '$app/navigation';
	import { fly } from "svelte/transition";

	export let col;
	export let row;
	export let content;
	export let link;

	let clicked = false;

	function gridClick(){
		clicked = clicked ? false : true;
	}

	function goLink(){
		goto(link);
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="grid" style="grid-column: {col}; grid-row: {row}" on:click={gridClick}>
	<div class="contents">
		<div class="square"></div>
		<h5>{content}</h5>
	</div>
</div>

<style lang="scss">
	@mixin keyframes($name){
		@keyframes #{$name}{
			@content;
		}
	}

	.grid {
		transition: all 0.2s;
		border-radius: 30px;
		padding: 30px;
		box-sizing: border-box;
		background-color: transparentize(#fff, 0.3);
		position: relative;
		cursor: pointer;
		
		.contents{
			transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			.square{
				width: 100px;
				height: 100px;
				background-color: #fff;
				border-radius: 15px;
				transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
			}

			h5{
				margin-top: 5px;
				font-size: 1rem;
				text-align: center;
				transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
			}
		}

		@include keyframes(shaking){
			0% { transform: translate(-50%, -50%) rotate(0deg); }
			5% { transform: translate(-50%, -50%) rotate(5deg); }
			7.5% { transform: translate(-50%, -50%) rotate(0eg); }
			10% { transform: translate(-50%, -50%) rotate(-5deg); }
			12.5% { transform: translate(-50%, -50%) rotate(0deg); }
			15% { transform: translate(-50%, -50%) rotate(5deg); }
			17.5% { transform: translate(-50%, -50%) rotate(0eg); }
			20% { transform: translate(-50%, -50%) rotate(-5deg); }
			22.5% { transform: translate(-50%, -50%) rotate(0deg); }
			25% { transform: translate(-50%, -50%) rotate(5deg); }
			30% { transform: translate(-50%, -50%) rotate(0deg); }
			100% { transform: translate(-50%, -50%) rotate(0deg); }
		}

		&:hover{
			.contents{
				animation: shaking 1s linear infinite;
			}
		}
	}
</style>
