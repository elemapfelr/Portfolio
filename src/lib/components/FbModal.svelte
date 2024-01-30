<!-- Modal.svelte -->
<script>
	import { fade } from 'svelte/transition';

	export let message = '';
	export let showFBModal = false;
	export let onClose = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if showFBModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div transition:fade class="modal-overlay">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="modal-content" on:click|stopPropagation>
			<p>{message}</p>
		</div>
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

	.w-btn-neon1 {
		border: none;
		min-width: 100px;
		min-height: 30px;
		background: linear-gradient(90deg, rgb(230, 129, 205) 0%, rgb(209, 79, 79) 100%);
		border-radius: 1000px;
		color: rgb(79, 47, 47);
		cursor: pointer;
		box-shadow: 12px 12px 24px rgba(209, 79, 90, 0.64);
		font-weight: 700;
	}
</style>
