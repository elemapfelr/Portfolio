const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const express = require("express");
const app = express();
const path = require("path");
const { setupWebSocket } = require("./controller/webSocketController");

async function main() {
	const completion = await openai.chat.completions.create({
		messages: [{ role: "system", content: "You are a helpful assistant." }],
		model: "gpt-3.5-turbo",
	});

	console.log(completion.choices[0]);
}

// main();

setupWebSocket(3001);

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
