export const directions = [
	{ x: 1, y: 0 }, // 가로
	{ x: 0, y: 1 }, // 세로
	{ x: 1, y: 1 }, // 우하향 대각선
	{ x: 1, y: -1 } // 우상향 대각선
];

export function countStones(cells, boardSize, turn, row, col, dx, dy) {
	let count = 0;
	let r = row + dx;
	let c = col + dy;
	let stones = [];
	let openEnds = 0;

	while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && cells[r][c] === turn) {
		stones.push({ r, c });
		count++;
		r += dx;
		c += dy;
	}

	// 첫 번째 돌의 뒤쪽 끝 체크 (역방향)
	if (isEndOpen(cells, boardSize, row - dx, col - dy, dx, dy)) {
		openEnds++;
	}

	// 마지막 돌의 앞쪽 끝 체크 (정방향)
	if (isEndOpen(cells, boardSize, r, c, dx, dy)) {
		openEnds++;
	}

	return { count, stones, openEnds };
}

export function checkForWin(cells, boardSize, turn, row, col, winningStonesCallback) {
	for (const { x, y } of directions) {
		const forward = countStones(cells, boardSize, turn, row, col, x, y);
		const backward = countStones(cells, boardSize, turn, row, col, -x, -y);
		const count = forward.count + backward.count;

		if (count >= 4) {
			const winningStones = [...forward.stones, ...backward.stones, { r: row, c: col }];
			winningStonesCallback(winningStones, turn); // 콜백 함수를 호출하여 승리 돌과 승리자를 설정합니다.
		}
	}
}

// 삼삼, 사사 금지 규칙을 체크하는 함수
export function checkForbiddenMoves(cells, boardSize, row, col, turn) {
	if (turn !== 'black') return false; // 검은색 돌에만 적용

	let threeThrees = 0; // 열린 삼목의 개수
	let fourFours = 0; // 열린 사목의 개수

	// 각 방향에 대해 확인
	for (let direction of directions) {
		const { count, stones, openEnds } = countStones(
			cells,
			boardSize,
			turn,
			row,
			col,
			direction.x,
			direction.y
		);

		if (count === 3 && openEnds === 2) threeThrees++;
		if (count === 4 && openEnds === 2) fourFours++;
	}

	// 삼삼 또는 사사 금지 규칙 위반 여부 반환
	return threeThrees >= 2 || fourFours >= 2;
}

// 주어진 위치의 끝이 열려있는지 체크하는 함수
function isEndOpen(cells, boardSize, r, c, dx, dy) {
	// 보드 범위를 벗어나면 열린 끝이 아님
	if (r < 0 || r >= boardSize || c < 0 || c >= boardSize) return false;

	// 해당 위치가 비어있으면 열린 끝
	return cells[r][c] === null;
}
