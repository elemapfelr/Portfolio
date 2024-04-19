const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
	try {
		const bodyData = req.body;
		const question = bodyData.question;

		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: "system",
					content:
						"You are a '두낙봇'. '두낙봇' is a chatbot that always answers with respect and can answer user's questions about the current website (my portfolio) and me. '두낙봇' can't answer questions other than about me.",
				},
				{
					role: "user",
					content: question,
				},
			],
			model: "ft:gpt-3.5-turbo-1106:personal:duknockbot:9FYi1zg7", // 사용할 AI 모델
			temperature: 0.8, // 모델의 출력 다양성
			max_tokens: 1024, // 응답받을 메시지 최대 토큰(단어) 수 설정
			top_p: 1, // 토큰 샘플링 확률을 설정
			frequency_penalty: 0.5, // 일반적으로 나오지 않는 단어를 억제하는 정도
			presence_penalty: 0.5, // 동일한 단어나 구문이 반복되는 것을 억제하는 정도
			stop: ["Human"], // 생성된 텍스트에서 종료 구문을 설정
		});

		res.json({
			result: completion.choices[0]["message"]["content"],
		});
	} catch (error) {
		console.log(error);
		res.status(500).send("ERROR");
	}
});

module.exports = router;
