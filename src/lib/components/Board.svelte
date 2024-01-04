<script>
	import Cell from '$lib/components/Cell.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { checkForWin } from '$lib/js/gameLogic.js';

	let boardSize = 16;
	let cells = Array(boardSize)
		.fill()
		.map(() => Array(boardSize).fill(null));

	$: turn = 'black';
	$: showModal = false;
	$: winner = '';
	$: winningStones = [];
	$: end = false;

	// 셀 클릭 시 이벤트 처리
	function handleCellClick(row, col) {
		console.log(`Cell clicked: Row ${row}, Col ${col}`);
		// 여기에 게임 로직 추가

		if (cells[row][col] === null) {
			cells[row][col] = turn;
			checkForWin(cells, boardSize, turn, row, col, setWinningStonesAndWinner);
			turn = turn == 'black' ? 'white' : 'black';
		}
	}

	function setWinningStonesAndWinner(winningStonesArray, winnerTurn) {
		winningStones = winningStonesArray;
		winner = winnerTurn;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		end = true;
	}

	function resetGame() {
		// 게임 리셋
		cells = cells.map((row) => row.fill(null));
		turn = 'black'; // 또는 'white', 게임 시작 플레이어에 따라 다름
		winner = '';
		showModal = false; // 모달을 숨깁니다.
		end = false;
		winningStones = [];
	}

	const winEmojis = ['😎', '🤪', '😄', '😋', '🫡', '🥱', '😝', '🤭', '🤓', '💩'];
	const loseEmojis = ['😭', '😢', '😥', '😒', '🙁', '😔', '😟', '😧', '😱', '💀'];

	// 이모티콘을 랜덤으로 선택하는 함수
	function getRandomEmoji(win) {
		let emojis = win ? winEmojis : loseEmojis;
		const randomIndex = Math.floor(Math.random() * emojis.length);
		return emojis[randomIndex];
	}
</script>

<div class="flexArea">
	<div class="user blackUser {turn === 'black' ? ' active' : ''}">
		{#if winner == 'black'}
			<div class="userProfile">
				<span class="emoji">👑</span>
				<p>{getRandomEmoji(true)}</p>
			</div>
		{:else if winner == 'white'}
			<div class="userProfile">
				<p>{getRandomEmoji(false)}</p>
			</div>
		{:else}
			<div class="userProfile">
				<p>😗</p>
			</div>
		{/if}
		<p class="userName">name</p>
	</div>
	<div class="board {end}">
		{#each cells as row, i}
			{#each row as _, j}
				<Cell
					{i}
					{j}
					{handleCellClick}
					{turn}
					value={_}
					isWinningStone={winningStones.some((stone) => stone.r === i && stone.c === j)}
				/>
			{/each}
		{/each}
	</div>
	<div class="user whiteUser {turn === 'white' ? ' active' : ''}">
		{#if winner == 'white'}
			<div class="userProfile">
				<span class="emoji">👑</span>
				<p>{getRandomEmoji(true)}</p>
			</div>
		{:else if winner == 'black'}
			<div class="userProfile">
				<p>{getRandomEmoji(false)}</p>
			</div>
		{:else}
			<div class="userProfile">
				<p>🙂</p>
			</div>
		{/if}
		<p class="userName">name</p>
	</div>
</div>

{#if end}
	<button class="w-btn-neon2" on:click={resetGame}> Play Again! </button>
{/if}
<Modal message={`${winner} wins!`} {showModal} onClose={closeModal} playAgain={resetGame} />

<style lang="scss">
	.flexArea {
		display: flex;
		align-items: center;
		column-gap: 20px;

		.user {
			border: 1px solid #aaa;
			border-radius: 10px;
			padding: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;

			&.blackUser {
				.userProfile {
					background-color: #000;
				}
			}

			&.whiteUser {
				.userProfile {
					background-color: #fff;
				}
			}

			&.active {
				box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
				outline: 3px solid #00ffcb;
			}

			.userProfile {
				width: 100px;
				height: 100px;
				background-color: #fff;
				border: 1px solid #aaa;
				border-radius: 100px;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;

				p {
					font-size: 50px;
					margin-bottom: 5px;
				}

				span.emoji {
					top: -20px;
					left: 10%;
					transform: rotate(-15deg);
					position: absolute;
					font-size: 40px;
				}
			}
			.userName {
				font-weight: bold;
			}
		}

		.board {
			display: grid;
			grid-template-columns: repeat(16, 1fr);
			position: relative;

			&.true {
				pointer-events: none;
			}
		}
	}

	@keyframes ring {
		0% {
			width: 30px;
			height: 30px;
			opacity: 1;
		}
		100% {
			width: 100px;
			height: 100px;
			opacity: 0;
		}
	}

	.w-btn-neon2 {
		margin-top: 50px;
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
</style>
