let gameSessions = {}; // 게임 세션 저장

function makeNewGameSession(player1 = {}, player2 = {}) {
	const sessionId = new Date().toString();
	gameSessions[sessionId] = { player1, player2 };
	player1.sessionId = sessionId;
	player2.sessionId = sessionId;

	let msg = {
		type: 'GAME_START',
		data: {
			sessionId: sessionId,
			player1: { id: player1.user.id, unique: player1.user.unique, turn: 'black' },
			player2: { id: player2.user.id, unique: player2.user.unique, turn: 'white' }
		}
	};
	player1.send(JSON.stringify(msg));
	player2.send(JSON.stringify(msg));
}

function gameControl(gameData) {
	let correctSession = false;
	const sessionId = gameData.sessionId;
	let { player1, player2 } = gameSessions[sessionId];
	let opponent;
	// 게임 세션 일치하는지 확인
	if (
		gameData.sendUser.id === player1.user.id &&
		gameData.sendUser.unique === player1.user.unique
	) {
		correctSession = true;
		opponent = player2;
	}
	if (
		gameData.sendUser.id === player2.user.id &&
		gameData.sendUser.unique === player2.user.unique
	) {
		correctSession = true;
		opponent = player1;
	}
	if (correctSession) {
		let msg = {
			type: 'OPPONENT_MOVE',
			data: {
				x: gameData.x,
				y: gameData.y
			}
		};
		opponent.send(JSON.stringify(msg));
	}
}

function gameSessionTerminate(leaveData) {
	let correctSession = false;
	const sessionId = leaveData.sessionId;
	let { player1, player2 } = gameSessions[sessionId];
	let opponent;
	// 게임 세션 일치하는지 확인
	if (leaveData.id === player1.user.id && leaveData.unique === player1.user.unique) {
		correctSession = true;
		opponent = player2;
	}
	if (leaveData.id === player2.user.id && leaveData.unique === player2.user.unique) {
		correctSession = true;
		opponent = player1;
	}
	if (correctSession) {
		let msg = {
			type: 'SESSION_TERMINATED',
			data: {
				id: leaveData.id
			}
		};
		opponent.send(JSON.stringify(msg));
		delete gameSessions[sessionId]; // 세션 삭제
		delete player1.sessionId;
		delete player2.sessionId;
	}
}

// 게임중에 통신 끊길 경우
function wasGaming(ws) {
	let correctSession = false;
	const sessionId = ws.sessionId;
	if (!sessionId) return false;
	if (!gameSessions[sessionId]) return false;
	let { player1, player2 } = gameSessions[sessionId];
	let opponent;
	// 게임 세션 일치하는지 확인
	if (ws.user.id === player1.user.id && ws.user.unique === player1.user.unique) {
		correctSession = true;
		opponent = player2;
	}
	if (ws.user.id === player2.user.id && ws.user.unique === player2.user.unique) {
		correctSession = true;
		opponent = player1;
	}
	if (correctSession) {
		let msg = {
			type: 'SESSION_TERMINATED',
			data: {
				id: ws.user.id
			}
		};
		opponent.send(JSON.stringify(msg));
		delete gameSessions[sessionId]; // 세션 삭제
		delete player1.sessionId;
		delete player2.sessionId;
	}
}

// 재대결 신청
function gameReqAgain(reqAgainData) {
	let correctSession = false;
	const sessionId = reqAgainData.sessionId;
	let { player1, player2 } = gameSessions[sessionId];
	let opponent;
	// 게임 세션 일치하는지 확인
	if (reqAgainData.id === player1.user.id && reqAgainData.unique === player1.user.unique) {
		correctSession = true;
		opponent = player2;
	}
	if (reqAgainData.id === player2.user.id && reqAgainData.unique === player2.user.unique) {
		correctSession = true;
		opponent = player1;
	}
	if (correctSession) {
		let msg = {
			type: 'NEWREQUEST',
			data: { requesterId: reqAgainData.id, requesterUnique: reqAgainData.unique }
		};
		opponent.send(JSON.stringify(msg));
	}
}

module.exports = { makeNewGameSession, gameControl, gameSessionTerminate, wasGaming, gameReqAgain };
