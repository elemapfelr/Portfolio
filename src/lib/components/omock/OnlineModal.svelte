<!-- Modal.svelte -->
<script>
	import { fade } from 'svelte/transition';
	import { checkId, checkTs } from '$lib/js/omock/cookie.js';
	import { createEventDispatcher } from 'svelte';

	export let onlineUsersExceptMe = [];
	export let showOnlineModal = false;
	export let onClose = () => {};
	export let socket;
	export let gameReq = null;
	export let resOfRequest = null;
	export let requesting = false;
	export let gameMatched = false;

	let selectedItem = null;

	function selectUser(user) {
		selectedItem = user;
	}

	const dispatch = createEventDispatcher();

	function sendRequest() {
		requesting = true;
		dispatch('requestingChange', requesting); // 이벤트 발생
		const msg = {
			type: 'GAMEREQUEST',
			data: {
				id: checkId(),
				unique: checkTs(),
				targetId: selectedItem.id,
				targetUnique: selectedItem.unique
			}
		};
		socket.send(JSON.stringify(msg));
	}

	function cancelReq() {
		requesting = false;
		const msg = {
			type: 'GAMEREQUEST_CANCEL',
			data: {
				id: checkId(),
				unique: checkTs(),
				targetId: selectedItem.id,
				targetUnique: selectedItem.unique
			}
		};
		socket.send(JSON.stringify(msg));
	}

	function closeCancelAlert() {
		gameReq = null;
		dispatch('gameReqChange', gameReq); // 이벤트 발생
	}

	function rejectReq() {
		const msg = {
			type: 'GAMEREQUEST_REJECT',
			data: {
				id: checkId(),
				unique: checkTs(),
				targetId: gameReq.requesterId,
				targetUnique: gameReq.requesterUnique
			}
		};
		socket.send(JSON.stringify(msg));
		gameReq = null;
		dispatch('gameReqChange', gameReq); // 이벤트 발생
	}

	function closeRejectAlert() {
		requesting = false;
		resOfRequest = null;
		dispatch('resOfRequestChange', resOfRequest); // 이벤트 발생
	}

	function acceptReq() {
		const msg = {
			type: 'GAMEREQUEST_ACCEPT',
			data: {
				id: checkId(),
				unique: checkTs(),
				targetId: gameReq.requesterId,
				targetUnique: gameReq.requesterUnique
			}
		};
		socket.send(JSON.stringify(msg));
		gameMatched = true;
		dispatch('gameMatchedChange', gameMatched); // 이벤트 발생
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if showOnlineModal}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div transition:fade={{ duration: 100 }} class="modal-overlay">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		{#if requesting}
			{#if resOfRequest}
				{#if resOfRequest.accepted}
					<div class="requestingModal" on:click|stopPropagation>
						<h5>Request Accepted</h5>
						<p>
							{resOfRequest.accepterId} accepted your challenge!<br />
							READY TO FIGHT🔥
						</p>
						<span>Preparing...</span>
					</div>
				{:else if resOfRequest.rejected}
					<div class="requestingModal" on:click|stopPropagation>
						<h5>Request Rejected</h5>
						<p>
							{resOfRequest.rejecterId} doesn't want to play with you.🤭<br />
							Look for someone else.
						</p>
						<div class="btns">
							<button class="w-btn-neon1" on:click={closeRejectAlert}>Close</button>
						</div>
					</div>
				{/if}
			{:else}
				<div class="requestingModal" on:click|stopPropagation>
					<h5>Send Request</h5>
					<p>You sent request to {selectedItem.id}</p>
					<span>Waiting...</span>
					<div class="btns">
						<button class="w-btn-neon1" on:click={cancelReq}>Cancel</button>
					</div>
				</div>
			{/if}
		{:else if gameReq}
			{#if gameReq.canceled}
				<div class="gameReqModal" on:click|stopPropagation>
					<h5>Request Canceled</h5>
					<p>{gameReq.requesterId} canceled challenge.</p>
					<div class="btns">
						<button class="w-btn-neon1" on:click={closeCancelAlert}>Close</button>
					</div>
				</div>
			{:else if gameMatched}
				<div class="gameReqModal" on:click|stopPropagation>
					<h5>Match Success</h5>
					<p>
						Hold on!<br />
						READY TO FIGHT🔥
					</p>
					<span>Preparing...</span>
				</div>
			{:else if gameReq.reMatch}
				<div class="gameReqModal" on:click|stopPropagation>
					<h5>Match Again!</h5>
					<p>{gameReq.requesterId} Challenged you again!</p>
					<div class="btns">
						<button class="w-btn-neon2" on:click={acceptReq}>Accept</button>
						<button class="w-btn-neon1" on:click={rejectReq}>Reject</button>
					</div>
				</div>
			{:else}
				<div class="gameReqModal" on:click|stopPropagation>
					<h5>New Request!</h5>
					<p>{gameReq.requesterId} Challenged you!</p>
					<div class="btns">
						<button class="w-btn-neon2" on:click={acceptReq}>Accept</button>
						<button class="w-btn-neon1" on:click={rejectReq}>Reject</button>
					</div>
				</div>
			{/if}
		{:else}
			<div class="modal-content" on:click|stopPropagation>
				<h5>Online Users</h5>
				{#if onlineUsersExceptMe.length > 0}
					<ul>
						{#each onlineUsersExceptMe as user}
							<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
							<li
								class="{user.inSession ? 'inSession' : ''} {selectedItem === user
									? 'selected'
									: ''}"
								on:click={() => selectUser(user)}
							>
								<div class="circle"></div>
								<span>{user.id}</span>
							</li>
						{/each}
					</ul>
					{#if selectedItem !== null}
						<button transition:fade={{ duration: 100 }} class="w-btn-neon2" on:click={sendRequest}
							>Play!</button
						>
					{/if}
				{:else}
					<p>No users online.</p>
				{/if}
			</div>
			<button class="w-btn-neon1" on:click={onClose}>Close</button>
		{/if}
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

		.modal-content {
			width: 300px;
			min-height: 150px;
			background-color: #ececec;
			padding: 20px;
			border-radius: 10px;
			text-align: center;
			margin-bottom: 30px;

			h5 {
				margin-bottom: 10px;
			}

			p {
				font-size: 25px;
				font-weight: bold;
				color: black;
				cursor: default;
			}

			ul {
				display: flex;
				column-gap: 20px;
				row-gap: 20px;

				li {
					background: #ffffff;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					padding: 10px;
					box-sizing: border-box;
					border-radius: 10px;
					box-shadow: 2px 2px 4px #c4c4c4;

					&.selected {
						outline: 2px solid #afeafc;
						box-shadow: 2px 2px 6px #a1c4fd;
					}

					&.inSession {
						pointer-events: none;
						position: relative;
						&::after {
							content: 'Gaming';
							font-size: 12px;
							color: #000;
							display: block;
							position: absolute;
							top: 0;
							right: 0;
							padding: 2px 5px;
							background-color: #a1c4fd;
						}
					}

					.circle {
						width: 50px;
						height: 50px;
						border-radius: 50px;
					}

					span {
						display: block;
						margin: 5px auto 0;
						color: black;
						font-size: 12px;
						font-weight: normal;
					}

					$colors: (
						#ff9a9e #fad0c4,
						#a18cd1 #fbc2eb,
						#fad0c4 #ffd1ff,
						#ffecd2 #fcb69f,
						#ff9a9e #fecfef,
						#f6d365 #fda085,
						#fbc2eb #a6c1ee,
						#fdcbf1 #e6dee9,
						#a1c4fd #c2e9fb,
						#d4fc79 #96e6a1
					);
					@each $gradient in $colors {
						$index: index($colors, $gradient);
						&:nth-child(#{$index}) {
							.circle {
								background: linear-gradient(45deg, nth($gradient, 1) 0%, nth($gradient, 2) 100%);
							}
						}
					}
				}
			}
		}
		.requestingModal,
		.gameReqModal {
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
				font-size: 16px;
				font-weight: bold;
				color: black;
				cursor: default;
			}

			span {
				margin-top: 15px;
				font-size: 12px;
			}

			.btns {
				margin-top: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				column-gap: 20px;

				.w-btn-neon1,
				.w-btn-neon2 {
					margin: 0;
				}
			}
		}
	}

	.w-btn-neon1 {
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
	.w-btn-neon2 {
		border: none;
		min-width: 100px;
		min-height: 30px;
		background: linear-gradient(90deg, rgb(129, 173, 230) 0%, rgb(79, 209, 138) 100%);
		border-radius: 1000px;
		color: rgb(34, 28, 58);
		cursor: pointer;
		box-shadow: 2px 2px 8px rgba(79, 183, 209, 0.64);
		font-weight: 700;
		margin: 10px auto 0;
	}
</style>
