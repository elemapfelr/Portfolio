<script>
	import Cell from '$lib/components/Cell.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import FbModal from '$lib/components/FbModal.svelte';
	import { checkForWin, checkForbiddenMoves } from '$lib/js/gameLogic.js';
	import { fade } from 'svelte/transition';

	let boardSize = 16;
	let cells = Array(boardSize)
		.fill()
		.map(() => Array(boardSize).fill(null));

	$: turn = 'black';
	$: showModal = false;
	$: showFBModal = false;
	$: checkFB = '';
	$: winner = '';
	$: winningStones = [];
	$: end = false;

	// 셀 클릭 시 이벤트 처리
	function handleCellClick(row, col) {
		console.log(`Cell clicked: Row ${row}, Col ${col}`);
		// 여기에 게임 로직 추가

		if (cells[row][col] === null) {
			checkFB = checkForbiddenMoves(cells, row, col, turn);
			if (checkFB) {
				// 금수의 경우
				showFBModal = true;
				return false;
			}
			cells[row][col] = turn;
			checkForWin(cells, boardSize, turn, row, col, setWinningStonesAndWinner);
			if (!winner) {
				turn = turn == 'black' ? 'white' : 'black';
			}
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

	function closeFBmodal() {
		showFBModal = false;
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
		<p class="userName">Player 1</p>
	</div>
	{#if end}
		<button class="w-btn-neon2" transition:fade on:click={resetGame}> Play Again! </button>
	{/if}
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
		<p class="userName">Player 2</p>
	</div>
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

<button class="online">Online Play</button>
<Modal message={`${winner} wins!`} {showModal} onClose={closeModal} playAgain={resetGame} />
<FbModal message={checkFB} {showFBModal} onClose={closeFBmodal} />

<style lang="scss">
	.flexArea {
		width: 80%;
		margin: 0 auto;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		row-gap: 20px;
		align-items: center;
		column-gap: 20px;

		.user {
			border: 1px solid #aaa;
			border-radius: 10px;
			padding: 10px;
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
				box-shadow: 6px 6px 12px rgba(79, 209, 197, 0.64);
				outline: 2px solid #00ffcb;
			}

			.userProfile {
				width: 50px;
				height: 50px;
				background-color: #fff;
				border: 1px solid #aaa;
				border-radius: 50px;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;

				p {
					font-size: 25px;
					margin-bottom: 5px;
				}

				span.emoji {
					top: -20px;
					left: 10%;
					transform: rotate(-15deg);
					position: absolute;
					font-size: 20px;
				}
			}
			.userName {
				font-weight: bold;
			}
		}
	}

	.board {
		width: 90%;
		display: grid;
		grid-template-columns: repeat(16, 1fr);
		position: relative;
		background-image: url(./../img/wood_texture.jpg);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		box-shadow:
			3px 7px 10px rgba(0, 0, 0, 0.432),
			inset 5px 5px 3px rgba(255, 255, 255, 0.5); /* 외부 그림자와 내부 그림자 */
		border-radius: 5px;

		&.true {
			pointer-events: none;
		}
	}

	@keyframes ring {
		0% {
			width: 20px;
			height: 20px;
			opacity: 1;
		}
		100% {
			width: 80px;
			height: 80px;
			opacity: 0;
		}
	}

	.w-btn-neon2 {
		position: relative;
		border: none;
		min-width: 120px;
		min-height: 30px;
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
		border: 3px solid #00ffcb;
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: ring 1.5s infinite;
	}

	.online {
		$bg: #fff;
		$fg: #06c17f;
		$border-width: 3px;
		$corner-size: 20px;
		$dur: 0.3s;

		margin-top: 30px;
		letter-spacing: 0.02rem;
		cursor: pointer;
		background: transparent;
		border: $border-width solid currentColor;
		padding: 10px 20px;
		font-size: 12px;
		color: $fg;
		position: relative;
		transition: color $dur;
		z-index: 1;

		&:hover {
			color: rgb(56, 202, 212);
			&::before {
				width: 0;
			}
			&::after {
				height: 0;
			}
		}

		&::before,
		&::after {
			content: '';
			position: absolute;
			background: $bg;
			z-index: -1;
			transition: all $dur;
		}
		//the 101% is because of a pixel rounding issue in firefox
		&::before {
			width: calc(100% - #{$corner-size});
			height: calc(101% + #{$border-width * 2});
			top: -$border-width;
			left: 50%;
			transform: translateX(-50%);
		}
		&::after {
			height: calc(100% - #{$corner-size});
			width: calc(101% + #{$border-width * 2});
			left: -$border-width;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>
