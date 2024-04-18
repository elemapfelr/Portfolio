<script>
	import { onMount } from "svelte";

	let question = "";
	let response = "";

	async function askQuestion() {
		const res = await fetch("/api/gpt", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ question }),
		});

		if (res.ok) {
			const data = await res.json();
			response = data.result;
		} else {
			response = "Error: " + res.statusText;
		}
	}
</script>

<input type="text" bind:value={question} placeholder="질문을 입력하세요" />
<button on:click={askQuestion}>질문하기</button>

<p>{response}</p>
