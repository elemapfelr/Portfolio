export function samsam(board, x, y, currentPlayer, otherPlayer) {
	let open_sam_count = 0;
	open_sam_count += find1(board, x, y, currentPlayer, otherPlayer);
	open_sam_count += find2(board, x, y, currentPlayer, otherPlayer);
	open_sam_count += find3(board, x, y, currentPlayer, otherPlayer);
	open_sam_count += find4(board, x, y, currentPlayer, otherPlayer);

	if (open_sam_count >= 2) return true;
	else return false;
}

function find1(board, x, y, currentPlayer, otherPlayer) {
	let stone1 = 0,
		stone2 = 0,
		allStone = 0;
	let blink1 = 1;

	// ← 방향 탐색
	let xx = x - 1;
	let check = false;
	while (xx >= 0) {
		if (board[y][xx] === currentPlayer) {
			check = false;
			stone1++;
		} else if (board[y][xx] === otherPlayer) {
			break;
		} else if (board[y][xx] === null) {
			if (!check) {
				check = true;
			} else {
				blink1++;
				break;
			}
		}
		xx--;
	}

	// → 방향 탐색
	xx = x + 1;
	let blink2 = blink1;
	if (blink1 === 1) blink1 = 0;
	check = false;
	while (xx < 16) {
		if (board[y][xx] === currentPlayer) {
			check = false;
			stone2++;
		} else if (board[y][xx] === otherPlayer) {
			break;
		} else if (board[y][xx] === null) {
			if (!check) {
				check = true;
			} else {
				blink2++;
				break;
			}
		}
		xx++;
	}

	allStone = stone1 + stone2;
	if (allStone !== 2) return 0;

	// 열린 3인지 체크
	let left = stone1 + blink1;
	let right = stone2 + blink2;
	if (x - left === 0 || x + right === 15) return 0;
	if (board[y][x - left - 1] === otherPlayer || board[y][x + right + 1] === otherPlayer) return 0;

	return 1; // 열린 3인 경우
}
function find2(board, x, y, currentPlayer, otherPlayer) {
	let stone1 = 0,
		stone2 = 0,
		allStone = 0;
	let blink1 = 1;

	// ↖ 방향 탐색
	let xx = x - 1;
	let yy = y - 1;
	let check = false;
	while (xx >= 0 && yy >= 0) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone1++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			if (!check) {
				check = true;
			} else {
				blink1++;
				break;
			}
		}
		xx--;
		yy--;
	}

	// ↘ 방향 탐색
	xx = x + 1;
	yy = y + 1;
	let blink2 = blink1;
	if (blink1 === 1) blink1 = 0;
	check = false;
	while (xx < 16 && yy < 16) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone2++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			if (!check) {
				check = true;
			} else {
				blink2++;
				break;
			}
		}
		xx++;
		yy++;
	}

	allStone = stone1 + stone2;
	if (allStone !== 2) return 0;

	// 열린 3인지 체크
	let leftUp = stone1 + blink1;
	let rightDown = stone2 + blink2;
	if (y - leftUp === 0 || x - leftUp === 0 || y + rightDown === 15 || x + rightDown === 15)
		return 0;
	if (
		board[y - leftUp - 1][x - leftUp - 1] === otherPlayer ||
		board[y + rightDown + 1][x + rightDown + 1] === otherPlayer
	)
		return 0;

	return 1; // 열린 3인 경우
}
function find3(board, x, y, currentPlayer, otherPlayer) {
	let stone1 = 0,
		stone2 = 0,
		allStone = 0;
	let blink1 = 1;

	// ↑ 방향 탐색
	let yy = y - 1;
	let check = false;
	while (yy >= 0) {
		if (board[yy][x] === currentPlayer) {
			check = false;
			stone1++;
		} else if (board[yy][x] === otherPlayer) {
			break;
		} else if (board[yy][x] === null) {
			if (!check) {
				check = true;
			} else {
				blink1++;
				break;
			}
		}
		yy--;
	}

	// ↓ 방향 탐색
	yy = y + 1;
	let blink2 = blink1;
	if (blink1 === 1) blink1 = 0;
	check = false;
	while (yy < 16) {
		if (board[yy][x] === currentPlayer) {
			check = false;
			stone2++;
		} else if (board[yy][x] === otherPlayer) {
			break;
		} else if (board[yy][x] === null) {
			if (!check) {
				check = true;
			} else {
				blink2++;
				break;
			}
		}
		yy++;
	}

	allStone = stone1 + stone2;
	if (allStone !== 2) return 0;

	// 열린 3인지 체크
	let up = stone1 + blink1;
	let down = stone2 + blink2;
	if (y - up === 0 || y + down === 15) return 0;
	if (
		(board[y - up - 1] && board[y - up - 1][x] === otherPlayer) ||
		(board[y + down + 1] && board[y + down + 1][x] === otherPlayer)
	)
		return 0;

	return 1; // 열린 3인 경우
}
function find4(board, x, y, currentPlayer, otherPlayer) {
	let stone1 = 0,
		stone2 = 0,
		allStone = 0;
	let blink1 = 1;

	// ↙ 방향 탐색
	let xx = x - 1;
	let yy = y + 1;
	let check = false;
	while (xx >= 0 && yy < 16) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone1++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			if (!check) {
				check = true;
			} else {
				blink1++;
				break;
			}
		}
		xx--;
		yy++;
	}

	// ↗ 방향 탐색
	xx = x + 1;
	yy = y - 1;
	let blink2 = blink1;
	if (blink1 === 1) blink1 = 0;
	check = false;
	while (xx < 16 && yy >= 0) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone2++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			if (!check) {
				check = true;
			} else {
				blink2++;
				break;
			}
		}
		xx++;
		yy--;
	}

	allStone = stone1 + stone2;
	if (allStone !== 2) return 0;

	// 열린 3인지 체크
	let leftDown = stone1 + blink1;
	let rightUp = stone2 + blink2;
	if (x - leftDown === 0 || y + leftDown === 15 || y - rightUp === 0 || x + rightUp === 15)
		return 0;
	if (
		(board[y + leftDown + 1] && board[y + leftDown + 1][x - leftDown - 1] === otherPlayer) ||
		(board[y - rightUp - 1] && board[y - rightUp - 1][x + rightUp + 1] === otherPlayer)
	)
		return 0;

	return 1; // 열린 3인 경우
}

export function sasa(board, x, y, currentPlayer, otherPlayer) {
	let fourStone = 0;

	fourStone += fourORjang1(board, x, y, currentPlayer, otherPlayer, 1);
	fourStone += fourORjang2(board, x, y, currentPlayer, otherPlayer, 1);
	fourStone += fourORjang3(board, x, y, currentPlayer, otherPlayer, 1);
	fourStone += fourORjang4(board, x, y, currentPlayer, otherPlayer, 1);

	if (fourStone >= 2) return true;
	else return false;
}

function fourORjang1(board, x, y, currentPlayer, otherPlayer, trigger) {
	let stone1 = 0,
		stone2 = 0,
		allStone = 0;
	let blink1 = trigger === 3 ? 0 : 1;

	// ← 탐색
	let yy = y;
	let xx = x - 1;
	let check = false;
	while (xx >= 0) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone1++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			// if (!check) {
			check = true;
			// } else {
			blink1++;
			break;
			// }
		}
		xx--;
	}

	// → 탐색
	xx = x + 1;
	let blink2 = blink1;
	check = false;
	while (xx < 16) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone2++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			// if (!check) {
			check = true;
			// } else {
			blink2++;
			break;
			// }
		}
		xx++;
	}

	allStone = stone1 + stone2;

	// 사사찾는 트리거
	if (trigger === 1) {
		return allStone !== 3 ? 0 : 1;
	}

	// 장목찾는 트리거
	if (trigger === 2) {
		return allStone >= 5 && stone1 !== 0 && stone2 !== 0 ? 1 : 0;
	}

	// 오목 달성 트리거
	if (trigger === 3) {
		return allStone === 4 ? 1 : 0;
	}

	return 0; // 기본적으로 0을 반환
}
function fourORjang2(board, x, y, currentPlayer, otherPlayer, trigger) {
	let stone1 = 0,
		stone2 = 0,
		allStone = 0;
	let blink1 = trigger === 3 ? 0 : 1;

	// ↖ 탐색
	let yy = y - 1;
	let xx = x - 1;
	let check = false;
	while (xx >= 0 && yy >= 0) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone1++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			// if (!check) {
			check = true;
			// } else {
			blink1++;
			break;
			// }
		}
		xx--;
		yy--;
	}

	// ↘ 탐색
	yy = y + 1;
	xx = x + 1;
	let blink2 = blink1;
	check = false;
	while (xx < 16 && yy < 16) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone2++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			// if (!check) {
			check = true;
			// } else {
			blink2++;
			break;
			// }
		}
		xx++;
		yy++;
	}

	allStone = stone1 + stone2;

	// 사사찾는 트리거
	if (trigger === 1) {
		return allStone !== 3 ? 0 : 1;
	}

	// 장목찾는 트리거
	if (trigger === 2) {
		return allStone >= 5 && stone1 !== 0 && stone2 !== 0 ? 1 : 0;
	}

	// 오목 달성 트리거
	if (trigger === 3) {
		return allStone === 4 ? 1 : 0;
	}

	return 0; // 기본적으로 0을 반환
}
function fourORjang3(board, x, y, currentPlayer, otherPlayer, trigger) {
	let stone1 = 0,
		stone2 = 0,
		allStone = 0;
	let blink1 = trigger === 3 ? 0 : 1;

	// ↑ 탐색
	let yy = y - 1;
	let xx = x;
	let check = false;
	while (yy >= 0) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone1++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			// if (!check) {
			check = true;
			// } else {
			blink1++;
			break;
			// }
		}
		yy--;
	}

	// ↓ 탐색
	yy = y + 1;
	let blink2 = blink1;
	check = false;
	while (yy < 16) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone2++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			// if (!check) {
			check = true;
			// } else {
			blink2++;
			break;
			// }
		}
		yy++;
	}

	allStone = stone1 + stone2;

	// 사사찾는 트리거
	if (trigger === 1) {
		return allStone !== 3 ? 0 : 1;
	}

	// 장목찾는 트리거
	if (trigger === 2) {
		return allStone >= 5 && stone1 !== 0 && stone2 !== 0 ? 1 : 0;
	}

	// 오목 달성 트리거
	if (trigger === 3) {
		return allStone === 4 ? 1 : 0;
	}

	return 0; // 기본적으로 0을 반환
}
function fourORjang4(board, x, y, currentPlayer, otherPlayer, trigger) {
	let stone1 = 0,
		stone2 = 0,
		allStone = 0;
	let blink1 = trigger === 3 ? 0 : 1;

	// ↗ 탐색
	let yy = y - 1;
	let xx = x + 1;
	let check = false;
	while (xx < 16 && yy >= 0) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone1++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			// if (!check) {
			check = true;
			// } else {
			blink1++;
			break;
			// }
		}
		xx++;
		yy--;
	}

	// ↙ 탐색
	yy = y + 1;
	xx = x - 1;
	let blink2 = blink1;
	check = false;
	while (xx >= 0 && yy < 16) {
		if (board[yy][xx] === currentPlayer) {
			check = false;
			stone2++;
		} else if (board[yy][xx] === otherPlayer) {
			break;
		} else if (board[yy][xx] === null) {
			// if (!check) {
			check = true;
			// } else {
			blink2++;
			break;
			// }
		}
		xx--;
		yy++;
	}

	allStone = stone1 + stone2;

	// 사사찾는 트리거
	if (trigger === 1) {
		return allStone !== 3 ? 0 : 1;
	}

	// 장목찾는 트리거
	if (trigger === 2) {
		return allStone >= 5 && stone1 !== 0 && stone2 !== 0 ? 1 : 0;
	}

	// 오목 달성 트리거
	if (trigger === 3) {
		return allStone === 4 ? 1 : 0;
	}

	return 0; // 기본적으로 0을 반환
}

//장목
export function jangmok(board, x, y, currentPlayer, otherPlayer) {
	let result = 0;

	result += fourORjang1(board, x, y, currentPlayer, otherPlayer, 2);
	result += fourORjang2(board, x, y, currentPlayer, otherPlayer, 2);
	result += fourORjang3(board, x, y, currentPlayer, otherPlayer, 2);
	result += fourORjang4(board, x, y, currentPlayer, otherPlayer, 2);

	if (result >= 1)
		//하나라도 장목수가있으면
		return true;

	return false;
}

export function fiveStone() {
	let result = 0;

	result += fourORjang1(3);
	result += fourORjang2(3);
	result += fourORjang3(3);
	result += fourORjang4(3);

	if (result >= 1)
		//하나라도 오목이 달성되면.
		return true;

	return false;
}
