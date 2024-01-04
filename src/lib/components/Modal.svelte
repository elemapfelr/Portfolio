<!-- Modal.svelte -->
<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import JSConfetti from 'js-confetti';

	export let message = '';
	export let showModal = false;
	export let onClose = () => {};
	export let playAgain = () => {};

	let confetti;

	onMount(() => {
		confetti = new JSConfetti(); // 컨페티 인스턴스 생성
	});

	$: if (showModal) {
		// 모달이 표시될 때 컨페티 발사
		confetti.addConfetti();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div transition:fade class="modal-overlay">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="modal-content" on:click|stopPropagation>
			<p>{message}</p>
		</div>
		<button class="w-btn-neon2" on:click={playAgain}> Play Again! </button>
		<button class="w-btn-neon1" on:click={onClose}>Close</button>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.5); /* 투명 배경 */
		z-index: 2;
	}

	.modal-content {
		padding: 20px;
		text-align: center;
		margin-bottom: 30px;
	}

	p {
		font-size: 40px;
		font-weight: bold;
		color: white;
		cursor: default;
	}

	@keyframes ring {
		0% {
			width: 30px;
			height: 30px;
			opacity: 1;
		}
		100% {
			width: 200px;
			height: 200px;
			opacity: 0;
		}
	}

	.w-btn-neon2 {
		position: relative;
		border: none;
		min-width: 200px;
		min-height: 50px;
		background: linear-gradient(90deg, rgba(129, 230, 217, 1) 0%, rgba(79, 209, 197, 1) 100%);
		border-radius: 1000px;
		color: darkslategray;
		cursor: pointer;
		box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
		font-weight: 700;
		transition: 0.3s;
		margin-bottom: 100px;
	}

	.w-btn-neon2:hover {
		transform: scale(1.2);
	}

	.w-btn-neon2:hover::after {
		content: '';
		width: 30px;
		height: 30px;
		border-radius: 100%;
		border: 6px solid #00ffcb;
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: ring 1.5s infinite;
	}

	.w-btn-neon1 {
		border: none;
		min-width: 100px;
		min-height: 30px;
		background: linear-gradient(90deg, rgb(129, 131, 230) 0%, rgb(79, 103, 209) 100%);
		border-radius: 1000px;
		color: rgb(56, 47, 79);
		cursor: pointer;
		box-shadow: 12px 12px 24px rgba(99, 79, 209, 0.64);
		font-weight: 700;
	}
</style>
