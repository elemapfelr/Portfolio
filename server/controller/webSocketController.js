const WebSocket = require('ws');

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
						id: String(joinData.id),
						unique: String(joinData.unique)
					}; // user 속성 할당
					broadcastOnlineUsers(); // 새로운 연결이 되었을 때 모든 클라이언트에게 사용자 목록 전송
					break;
				case 'GAMEREQUEST':
					let reqData = parsedMessage.data;
					const targetClient = Array.from(clients).find(
						(client) => client.user.id === reqData.id && client.user.unique === reqData.unique
					);
					if (targetClient) {
						targetClient.send('New Request');
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
		const userIds = Array.from(clients).map(
			(client) => `${client.user.id}|${client.user.unique}` || 'Unknown'
		);
		const userIdsString = userIds.join(',');
		clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(userIdsString);
			}
		});
	}
}

module.exports = { setupWebSocket };
