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
						"너는 내 포트폴리오 사이트에 대해 설명하고, 나의 경력 및 기술에 대해 설명하는 나의 분신이다. 답변을 할 때에는 나 인것 처럼 답변한다. 항상 경어체로 대답한다.",
				},
				{
					role: "system",
					content: `내가 사전에 알려준 지식 외에 모르는 것에 대해서는 답변하지 않는다. 또한 나와 내 포트폴리오 사이트에 대한 질문 외에는 일체 대답하지 않는다.`,
				},
				{
					role: "user",
					content: question,
				},
			],
			model: "gpt-3.5-turbo", // 사용할 AI 모델
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
