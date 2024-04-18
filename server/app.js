const express = require("express");
const app = express();
const path = require("path");
const { setupWebSocket } = require("./controller/webSocketController");

setupWebSocket(3001);
app.use(express.json({ limit: "100mb" }));
app.use("/api/gpt", require("./routes/openaiGPT"));

// Svelte 정적 파일 서빙
app.use(express.static("public/build")); // 'public'은 빌드된 파일이 있는 디렉토리

app.get("/demo/:dir/:page", (req, res) => {
	const dir = req.params.dir;
	const page = req.params.page;
	res.sendFile(path.resolve(__dirname, "public", "demo", dir, `${page}.html`));
});

// 그 외 모든 요청에 대해 index.html을 반환
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
	console.log("Connected");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
