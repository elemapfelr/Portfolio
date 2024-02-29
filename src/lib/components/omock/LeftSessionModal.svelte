<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let leftSessionAlert = false;
	export let leaveGame = () => {};
	export let terminated = null;

	const dispatch = createEventDispatcher();

	function terminateConfirm() {
		terminated = null;
		dispatch('terminatedChange', terminated); // 이벤트 발생
	}
</script>

{#if leftSessionAlert}
	<div transition:fade={{ duration: 100 }} class="modal-overlay">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="leaveModal" on:click|stopPropagation>
			<h5>Leave Game</h5>
			<p>Are you really want to leave current game?</p>
			<div class="btns">
				<button class="w-btn-neon1" on:click={leaveGame}>Leave</button>
			</div>
		</div>
	</div>
{/if}
{#if terminated}
	<div transition:fade={{ duration: 100 }} class="modal-overlay">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="leaveModal" on:click|stopPropagation>
			<h5>Leave Game</h5>
			<p>{terminated.id} left game.</p>
			<div class="btns">
				<button class="w-btn-neon1" on:click={terminateConfirm}>Leave</button>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
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

		.leaveModal {
			width: 300px;
			min-height: 150px;
			background-color: #ececec;
			padding: 20px;
			border-radius: 10px;
			text-align: center;

			h5 {
				margin-bottom: 10px;
			}

			p {
				font-size: 14px;
				font-weight: bold;
				color: black;
				cursor: default;
			}

			.btns {
				margin-top: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				column-gap: 20px;

				.w-btn-neon1 {
					margin: 0;
					border: none;
					min-width: 100px;
					min-height: 30px;
					background: linear-gradient(90deg, rgb(230, 129, 205) 0%, rgb(209, 79, 79) 100%);
					border-radius: 1000px;
					color: rgb(79, 47, 47);
					cursor: pointer;
					box-shadow: 6px 6px 12px rgba(209, 79, 90, 0.64);
					font-weight: 700;
				}
			}
		}
	}
</style>
