<script>
	import { onMount, onDestroy } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	export let i;
	export let j;
	export let handleCellClick;
	export let itsOnline = false;
	export let value;
	export let turn;
	export let isWinningStone = false;
	export let isForbidden;

	let cellElement;

	function updateHeight() {
		const width = cellElement.offsetWidth;
		cellElement.style.height = `${width}px`;
	}

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', updateHeight);
			updateHeight(); // 초기 크기 설정
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', updateHeight);
		}
	});
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
		if (itsOnline) {
			handleCellClick(i, j, true);
		} else {
			handleCellClick(i, j);
		}
	}}
	bind:this={cellElement}
>
	{#if value === 'black' || value === 'white'}
		<span in:scale={{ start: 2 }} out:fade class="{value} {isWinningStone ? 'winning' : ''}"></span>
	{:else if turn === 'black' && isForbidden}
		<span class="forbiddenPlace"></span>
	{:else}
		<!-- 마우스를 올렸을 때 보여줄 반투명한 원 -->
		<span class="preview {turn}"></span>
	{/if}
</div>

<style lang="scss">
	.cell {
		// background-color: #fff;
		width: 100%;
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
			height: 100%;
			background-color: rgba(61, 32, 19, 0.6);
		}
		&::after {
			content: '';
			display: block;
			position: absolute;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			width: 100%;
			height: 1px;
			background-color: rgba(61, 32, 19, 0.6);
		}

		&.top {
			&::before {
				height: 50%;
				top: auto;
				bottom: 0;
			}
		}
		&.bottom {
			&::before {
				height: 50%;
			}
		}
		&.left {
			&::after {
				width: 50%;
				left: auto;
				right: 0;
			}
		}
		&.right {
			&::after {
				width: 50%;
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
			}
		}

		span.winning {
			outline: 2px solid #00ffcca9; // 승리한 돌에 빨간색 테두리를 적용합니다.
		}

		span.forbiddenPlace {
			&::after {
				content: '\f00d';
				display: block;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-size: 30px;
				font-family: 'Font Awesome 5 Free';
				font-weight: 700;
				opacity: 0.7;
				color: #e2551e;
			}
		}

		span {
			display: block;
			width: 80%;
			height: 80%;
			border-radius: 100px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			z-index: 1;

			&.white {
				background: radial-gradient(
					circle at 8px 8px,
					#ffffff,
					#fafafa 10%,
					#dddddd 50%
				); /* 광택 효과 */
				box-shadow:
					3px 7px 10px rgba(0, 0, 0, 0.432),
					inset 1px 3px 3px rgba(255, 255, 255, 0.8); /* 외부 그림자와 내부 그림자 */
			}
			&.black {
				background: radial-gradient(
					circle at 8px 8px,
					#b6b6b6,
					#5c5c5c 10%,
					#000000 25%
				); /* 광택 효과 */
				box-shadow:
					3px 7px 10px rgba(0, 0, 0, 0.432),
					inset 1px 2px 2px rgba(255, 255, 255, 0.5); /* 외부 그림자와 내부 그림자 */
			}
		}
	}
</style>
