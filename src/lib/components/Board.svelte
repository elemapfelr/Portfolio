<script>
	import Cell from '$lib/components/Cell.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { checkForWin } from '$lib/js/gameLogic.js';

	let boardSize = 16;
	let cells = Array(boardSize)
		.fill()
		.map(() => Array(boardSize).fill(null));

	$: turn = 'black';

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

	let winningStones = [];

	$: showModal = false;
	$: winner = '';

	function closeModal() {
		showModal = false;
		// 게임 리셋 또는 추가적인 처리를 할 수 있습니다.
	}
</script>

<div class="board">
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

<Modal message={`${winner} wins!`} {showModal} onClose={closeModal} />

<style lang="scss">
	.board {
		display: grid;
		grid-template-columns: repeat(16, 1fr);
		position: relative;
	}
</style>
