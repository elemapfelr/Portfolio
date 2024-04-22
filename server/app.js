const express = require("express");
const app = express();
const path = require("path");
const { setupWebSocket } = require("./controller/webSocketController");
const useragent = require("useragent");

setupWebSocket(3001);
app.use(express.json({ limit: "100mb" }));
app.use("/api/gpt", require("./routes/openaiGPT"));

app.get("/demo/:dir/:page", (req, res) => {
	const dir = req.params.dir;
	const page = req.params.page;
	res.sendFile(path.resolve(__dirname, "public", "demo", dir, `${page}.html`));
});

// 접속자 로그 기록
app.use((req, res, next) => {
	if (req.path === "/") {
		const agent = useragent.parse(req.headers["user-agent"]);
		let identityLog = `Accessor identity
Time :		${new Date().toString()}
IP:			${req.headers["x-forwarded-for"] || req.ip}
Device:		${agent.device.toString()}
OS:			${agent.os.toString()}
Browser:	${agent.toAgent()}`;
		console.log(identityLog);
	}
	next();
});

// Svelte 정적 파일 서빙
app.use(express.static("public/build")); // 'public'은 빌드된 파일이 있는 디렉토리

// 그 외 모든 요청에 대해 index.html을 반환 (혹시 몰라)
app.get("*", (req, res) => {
	// console.log('Access *')
	res.sendFile(path.resolve(__dirname, "public", "build", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
