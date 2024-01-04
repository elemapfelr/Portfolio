<script>
	import { fade } from 'svelte/transition';

	export let i;
	export let j;
	export let handleCellClick;
	export let value;
	export let turn;
	export let isWinningStone = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="cell {i === 0 ? 'top' : i === 15 ? 'bottom' : ''} {j === 0
		? 'left'
		: j === 15
			? 'right'
			: ''}"
	on:click={() => {
		handleCellClick(i, j);
	}}
>
	{#if value === 'black' || value === 'white'}
		<span transition:fade class="{value} {isWinningStone ? 'winning' : ''}"></span>
	{:else}
		<!-- 마우스를 올렸을 때 보여줄 반투명한 원 -->
		<span class="preview {turn}"></span>
	{/if}
</div>

<style lang="scss">
	.cell {
		background-color: #fff;
		width: 30px;
		height: 30px;
		position: relative;
		border: none;
		cursor: pointer;

		&::before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 1px;
			height: 30px;
			background-color: gray;
		}
		&::after {
			content: '';
			display: block;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			width: 30px;
			height: 1px;
			background-color: gray;
		}

		&.top {
			&::before {
				height: 15px;
				top: auto;
				bottom: 0;
			}
		}
		&.bottom {
			&::before {
				height: 15px;
			}
		}
		&.left {
			&::after {
				width: 15px;
				left: auto;
				right: 0;
			}
		}
		&.right {
			&::after {
				width: 15px;
			}
		}

		&:hover {
			.preview {
				display: block; // 마우스를 올렸을 때만 보이게 합니다.
			}
		}

		span.preview {
			display: none; // 기본적으로는 숨겨져 있습니다.
			opacity: 0.5; // 반투명하게 설정합니다.
			&.black {
				background-color: black;
			}
			&.white {
				background-color: white;
				border: 1px solid black; // 흰색 원의 경우 경계가 보이도록 설정합니다.
			}
		}

		span.winning {
			outline: 2px solid red; // 승리한 돌에 빨간색 테두리를 적용합니다.
		}

		span {
			display: block;
			width: 15px;
			height: 15px;
			border-radius: 10px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;

			&.white {
				background-color: #fff;
				border: 1px solid black;
			}
			&.black {
				background-color: black;
				border: none;
			}
		}
	}
</style>
