const WebSocket = require('ws');
const { makeNewGameSession } = require('./gameSessionController');

function setupWebSocket(PORT) {
	const wss = new WebSocket.Server({ port: PORT });

	let clients = new Set();

	wss.on('connection', (ws) => {
		clients.add(ws);

		ws.on('message', (message) => {
			const parsedMessage = JSON.parse(message);
			switch (parsedMessage.type) {
				case 'JOIN':
					let joinData = parsedMessage.data;
					ws.user = {
						id: joinData.id,
						unique: joinData.unique
					}; // user 속성 할당
					broadcastOnlineUsers(); // 새로운 연결이 되었을 때 모든 클라이언트에게 사용자 목록 전송
					break;
				case 'GAMEREQUEST':
					let reqData = parsedMessage.data;
					const targetClient = Array.from(clients).find(
						(client) => client.user.id === reqData.targetId && client.user.unique === reqData.targetUnique
					);
					if (targetClient) {
						let msg = {
							type: 'NEWREQUEST',
							data: { requesterId: reqData.id, requesterUnique: reqData.unique }
						}
						targetClient.send(JSON.stringify(msg));
					}
					break;
				case 'GAMEREQUEST_CANCEL':
					let reqCancelData = parsedMessage.data;
					const targetClient2 = Array.from(clients).find(
						(client) => client.user.id === reqCancelData.targetId && client.user.unique === reqCancelData.targetUnique
					);
					if (targetClient2) {
						let msg = {
							type: 'REQUEST_CANCELED',
							data: { requesterId: reqCancelData.id, requesterUnique: reqCancelData.unique }
						}
						targetClient2.send(JSON.stringify(msg));
					}
					break;
				case 'GAMEREQUEST_REJECT':
					let reqRejectData = parsedMessage.data;
					const targetClient3 = Array.from(clients).find(
						(client) => client.user.id === reqRejectData.targetId && client.user.unique === reqRejectData.targetUnique
					);
					if (targetClient3) {
						let msg = {
							type: 'REQUEST_REJECTED',
							data: { rejecterId: reqRejectData.id, rejecterUnique: reqRejectData.unique }
						}
						targetClient3.send(JSON.stringify(msg));
					}
					break;
				case 'GAMEREQUEST_ACCEPT':
					let reqAcceptData = parsedMessage.data;
					const acceptingClient = Array.from(clients).find(
						(client) => client.user.id === reqAcceptData.id && client.user.unique === reqAcceptData.unique
					);
					const targetClient4 = Array.from(clients).find(
						(client) => client.user.id === reqAcceptData.targetId && client.user.unique === reqAcceptData.targetUnique
					);
					if (targetClient4) {
						let msg = {
							type: 'REQUEST_ACCEPTED',
							data: { accepterId: reqAcceptData.id, accepterUnique: reqAcceptData.unique }
						}
						targetClient4.send(JSON.stringify(msg));

						makeNewGameSession(targetClient4, acceptingClient); //게임 요청한 사람이 흑
					}
					break;
			}
		});

		ws.on('close', () => {
			clients.delete(ws);
			broadcastOnlineUsers();
		});
	});

	function broadcastOnlineUsers() {
		let msg = {
			type: 'ONLINE_USERS'
		}
		const userIds = Array.from(clients).map(
			(client) => {
				return {id: client.user.id, unique: client.user.unique}
			}
		);
		msg.data = userIds;
		clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(msg));
			}
		});
	}
}

module.exports = { setupWebSocket };
