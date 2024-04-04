const express = require('express');
const app = express();
const path = require('path');
const { setupWebSocket } = require('./controller/webSocketController');

setupWebSocket(3001);

// Svelte 정적 파일 서빙
app.use(express.static('public')); // 'public'은 빌드된 파일이 있는 디렉토리

// 모든 요청에 대해 index.html을 반환
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
