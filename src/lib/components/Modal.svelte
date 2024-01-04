<!-- Modal.svelte -->
<script>
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import JSConfetti from 'js-confetti';

	export let message = '';
	export let showModal = false;
	export let onClose = () => {};

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
	<div transition:fade class="modal-overlay" on:click={onClose}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="modal-content" on:click|stopPropagation>
			<p>{message}</p>
		</div>
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
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.5); /* 투명 배경 */
		z-index: 2;
	}

	.modal-content {
		padding: 20px;
		text-align: center;
	}

	p {
		font-size: 40px;
		font-weight: bold;
		color: white;
		cursor: default;
	}
</style>
