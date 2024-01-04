<script>
	let boardSize = 16;
	let cells = Array(boardSize)
		.fill()
		.map(() => Array(boardSize).fill(null));

	// 셀 클릭 시 이벤트 처리
	function handleCellClick(row, col) {
		console.log(`Cell clicked: Row ${row}, Col ${col}`);
		// 여기에 게임 로직 추가
	}
</script>

<div class="board">
	{#each cells as row, i}
		{#each row as _, j}
			{#if i == 0}
				{#if j == 0}
					<button class="cell top left" on:click={() => handleCellClick(i, j)} />
				{:else if j == 15}
					<button class="cell top right" on:click={() => handleCellClick(i, j)} />
				{:else}
					<button class="cell top" on:click={() => handleCellClick(i, j)} />
				{/if}
			{:else if i == 15}
				{#if j == 0}
					<button class="cell bottom left" on:click={() => handleCellClick(i, j)} />
				{:else if j == 15}
					<button class="cell bottom right" on:click={() => handleCellClick(i, j)} />
				{:else}
					<button class="cell bottom" on:click={() => handleCellClick(i, j)} />
				{/if}
			{:else if j == 0}
				<button class="cell left" on:click={() => handleCellClick(i, j)} />
			{:else if j == 15}
				<button class="cell right" on:click={() => handleCellClick(i, j)} />
			{:else}
				<button class="cell" on:click={() => handleCellClick(i, j)} />
			{/if}
		{/each}
	{/each}
</div>

<style lang="scss">
	.board {
		display: grid;
		grid-template-columns: repeat(16, 1fr);
		position: relative;

		.cell {
			background-color: #fff;
			width: 30px;
			height: 30px;
			position: relative;
			border: none;

			&::before {
				content: '';
				display: block;
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 1px;
				height: 30px;
				background-color: gray;
			}
			&::after {
				content: '';
				display: block;
				position: absolute;
				top: 50%;
				left: 0;
				transform: translateY(-50%);
				width: 30px;
				height: 1px;
				background-color: gray;
			}

			&.top {
				&::before {
					height: 15px;
					top: auto;
					bottom: 0;
				}
			}
			&.bottom {
				&::before {
					height: 15px;
				}
			}
			&.left {
				&::after {
					width: 15px;
					left: auto;
					right: 0;
				}
			}
			&.right {
				&::after {
					width: 15px;
				}
			}
		}
	}
</style>
