<script>
	import { fade } from 'svelte/transition';
	export let show;
	export let onSave;
	export let close;
	export let idCookie;

	$: id = idCookie || ''; // idCookie 값이 있으면 사용, 없으면 빈 문자열

	function saveId() {
		onSave(id);
	}
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div transition:fade={{ duration: 100 }} class="modal-overlay">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="modal-content" on:click|stopPropagation>
			<p>Set Your Name!</p>
			<input type="text" bind:value={id} />
			<button class="w-btn-neon1" on:click={saveId}>SET!</button>
			<button class="w-btn-neon2" on:click={close}>Close</button>
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
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.7); /* 투명 배경 */
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

	input {
		width: 200px;
		height: 30px;
		border-radius: 15px; /* 모서리 둥글기 */
		box-sizing: border-box;
		border: none;
		background-color: #fff;
		display: block;
		margin: 10px auto 30px;
		text-indent: 10px;
	}

	.w-btn-neon1 {
		border: none;
		min-width: 100px;
		min-height: 30px;
		background: linear-gradient(90deg, rgb(129, 230, 183) 0%, rgb(79, 125, 209) 100%);
		border-radius: 1000px;
		color: rgb(20, 18, 39);
		cursor: pointer;
		box-shadow: 6px 6px 12px rgba(79, 135, 209, 0.64);
		font-weight: 700;
		display: block;
		margin: 10px auto;
	}

	.w-btn-neon2 {
		border: none;
		min-width: 80px;
		min-height: 25px;
		background: linear-gradient(90deg, rgb(174, 180, 178) 0%, rgb(97, 100, 107) 100%);
		border-radius: 1000px;
		color: rgb(0, 0, 0);
		cursor: pointer;
		box-shadow: 6px 6px 12px rgba(174, 175, 175, 0.64);
		font-weight: 700;
		display: block;
		margin: 0 auto;
	}
</style>
