import { jangmok, samsam, sasa } from './forbiddenStone';

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

	while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && cells[r][c] === turn) {
		stones.push({ r, c });
		count++;
		r += dx;
		c += dy;
	}

	return { count, stones };
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
export function checkForbiddenMoves(cells, row, col, turn) {
	if (turn !== 'black') return false; // 검은색 돌에만 적용
	if (samsam(cells, col, row, turn, 'white')) {
		return '33 금지!';
	} else if (sasa(cells, col, row, turn, 'white')) {
		return '44 금지!';
	} else if (jangmok(cells, col, row, turn, 'white')) {
		return '장목 금지!';
	}
}
