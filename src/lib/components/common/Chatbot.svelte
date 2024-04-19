<script>
	import { fade, fly } from "svelte/transition";

	let isOpen = false;
	let messages = [{ text: "Hello, how can I help you?", sender: "bot" }];
	let newMessage = "";

	async function sendMessage() {
		if (newMessage.trim()) {
			messages = [...messages, { text: newMessage, sender: "user" }];
			askQuestion(newMessage).then((res) => {
				// 여기서 챗봇의 응답을 처리할 수 있습니다.
				let lastMessage = messages.pop();
				lastMessage.text = res;
				messages = [...messages, lastMessage];
				// 아래로 스크롤
				document
					.querySelector(".messages")
					.scrollTo({ behavior: "smooth", top: document.querySelector(".messages").offsetHeight });
			});
			messages = [...messages, { text: "answering...", sender: "bot" }];
			newMessage = ""; // 메시지 전송 후 입력칸 초기화
		}
	}

	function toggleChat() {
		isOpen = !isOpen;
	}

	async function askQuestion(question) {
		let response = "";
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
		return response;
	}
</script>

<!-- 챗봇 버튼 -->
<button on:click={toggleChat} class="chatbot-button">
	{#if !isOpen}
		<i class="fa-regular fa-message"></i>
	{:else}
		<i class="fa-solid fa-window-minimize"></i>
	{/if}
</button>

<!-- 대화창 -->
{#if isOpen}
	<div class="chat-window" transition:fly={{ y: 100 }}>
		<div class="messages">
			{#each messages as message}
				<div class="message {message.sender}" transition:fade>
					{message.text}
				</div>
			{/each}
		</div>
		<div class="flex">
			<input type="text" bind:value={newMessage} on:keyup={(e) => e.key === "Enter" && sendMessage()} />
			<button on:click={sendMessage}><i class="fa-regular fa-paper-plane"></i></button>
		</div>
	</div>
{/if}

<style lang="scss">
	.chatbot-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1;
		width: 50px;
		height: 50px;
		border-radius: 50px;
		border: none;
		background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
		box-shadow: 2px 3px 8px #0005;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;

		i {
			font-size: 1.3rem;
			color: #fff;
		}
	}
	.chat-window {
		position: fixed;
		bottom: 75px;
		right: 20px;
		width: calc(90dvw - 20px);
		max-width: 450px;
		background-color: #000c;
		border-radius: 10px;
		padding: 10px;
		z-index: 1000;

		.messages {
			height: 250px;
			overflow-y: auto;

			&::-webkit-scrollbar {
				width: 4px;
				height: 4px;
			}
			&::-webkit-scrollbar-track {
				background: transparent;
			}
			&::-webkit-scrollbar-thumb {
				background-color: #ccc7;
				border-radius: 2px;
			}

			.message {
				margin: 5px;
				padding: 10px;
				border-radius: 5px;
				font-size: 0.8rem;
				background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
				background-size: 200%;

				&.bot {
					text-align: left;
					background-position: left;
				}
				&.user {
					text-align: right;
					background-position: right;
				}
			}
		}

		.flex {
			display: flex;
			input {
				width: 90%;
				border: 1px solid #fff;
				background-color: transparent;
				color: #fff;
				font-size: 0.8rem;
				letter-spacing: -0.8px;
				padding: 8px;

				&:focus {
					outline: none;
					border-color: #81ffef;
				}
			}
			button {
				width: 10%;
				min-width: 50px;
				display: flex;
				align-items: center;
				justify-content: center;
				border: none;
				outline: none;
				padding: 2px 15px;
				font-size: 0.8rem;
				background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
				background-size: 200%;
				background-position: center;
				color: #fff;
				cursor: pointer;
			}
		}
	}
</style>
