<script>
	import Cell from "$lib/components/omock/Cell.svelte";
	import Modal from "$lib/components/omock/Modal.svelte";
	import FbModal from "$lib/components/omock/FbModal.svelte";
	import { checkForWin, checkForbiddenMoves } from "$lib/js/omock/gameLogic.js";
	import { fade } from "svelte/transition";
	import OnlineModal from "$lib/components/omock/OnlineModal.svelte";
	import SetIdModal from "$lib/components/omock/SetIdModal.svelte";
	import LeftSessionModal from "$lib/components/omock/LeftSessionModal.svelte";
	import { setId, checkId, checkTs } from "$lib/js/omock/cookie.js";
	import timestamp from "$lib/js/omock/timestamp.js";
	import { onDestroy } from "svelte";

	let boardSize = 16;
	let cells = Array(boardSize)
		.fill()
		.map(() => Array(boardSize).fill(null));

	//임시
	let forbiddenPlace = Array(boardSize)
		.fill()
		.map(() => Array(boardSize).fill(null));

	$: player1UserName = "Player 1";
	$: player2UserName = "Player 2";
	$: turn = "black";
	let showModal = false;
	let showFBModal = false;
	let showOnlineModal = false;
	let showSetIdModal = false;
	$: checkFB = "";
	$: winner = "";
	$: winningStones = [];
	let end = false;
	$: onlineUsers = [];
	$: onlineUsersExceptMe = [];
	$: idCookie = "";
	$: gameReq = null;
	$: resOfRequest = null;
	let requesting = false;
	let gameMatched = false;
	$: currentSession = null;
	$: currentUser = null;
	let itsOnline = false;
	$: boardDisabled = "";
	let leftSessionAlert = false;
	$: terminated = null;

	let socket;

	// 셀 클릭 시 이벤트 처리
	function handleCellClick(row, col, online = false) {
		console.log(`Cell clicked: Row ${row}, Col ${col}`);
		// 여기에 게임 로직 추가

		if (cells[row][col] === null) {
			checkFB = checkForbiddenMoves(cells, row, col, turn);
			if (checkFB) {
				// 금수의 경우
				showFBModal = true;
				return false;
			}
			cells[row][col] = turn;

			if (online) {
				// 본인 턴에 수를 놓으면 보드 비활성화
				boardDisabled = "boardDisabled";
				const msg = {
					type: "MAKE_MOVE",
					data: {
						sessionId: currentSession,
						sendUser: currentUser,
						x: col,
						y: row,
					},
				};
				socket.send(JSON.stringify(msg));
			}

			checkForWin(cells, boardSize, turn, row, col, setWinningStonesAndWinner);
			if (!winner) {
				turn = turn == "black" ? "white" : "black";

				//임시
				if (turn == "black") {
					// 금수 자리 초기화
					forbiddenPlace = Array(boardSize)
						.fill()
						.map(() => Array(boardSize).fill(null));
					for (let i = 0; i < cells.length; i++) {
						for (let j = 0; j < cells[i].length; j++) {
							let tempCheckFB = checkForbiddenMoves(cells, i, j, turn);
							if (tempCheckFB) {
								forbiddenPlace[i][j] = true;
							}
						}
					}
				}
			}
		}
	}

	function setWinningStonesAndWinner(winningStonesArray, winnerTurn) {
		winningStones = winningStonesArray;
		winner = winnerTurn === "black" ? "Player 1" : "Player 2";
		if (itsOnline) {
			if (currentUser.turn === "black") {
				winner = winnerTurn === "black" ? player1UserName : player2UserName;
			} else {
				winner = winnerTurn === "white" ? player2UserName : player1UserName;
			}
		}
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		end = true;
	}

	function closeFBmodal() {
		showFBModal = false;
	}

	function closeOnlinemodal() {
		showOnlineModal = false;
		itsOnline = false;
		socket.close();
	}

	function clostSetIdModal() {
		showSetIdModal = false;
	}

	function resetGame() {
		// 게임 리셋
		cells = cells.map((row) => row.fill(null));
		turn = "black"; // 또는 'white', 게임 시작 플레이어에 따라 다름
		winner = "";
		showModal = false; // 모달을 숨깁니다.
		end = false;
		winningStones = [];
	}

	function playAgain() {
		if (itsOnline) {
			// 온라인의 경우
			showModal = false;
			showOnlineModal = true;
			requesting = true;
			const msg = {
				type: "GAMEREQUEST_AGAIN",
				data: {
					id: checkId(),
					unique: checkTs(),
					sessionId: currentSession,
				},
			};
			socket.send(JSON.stringify(msg));
		} else {
			resetGame();
		}
	}

	const winEmojis = ["😎", "🤪", "😄", "😋", "🫡", "🥱", "😝", "🤭", "🤓", "💩"];
	const loseEmojis = ["😭", "😢", "😥", "😒", "🙁", "😔", "😟", "😧", "😱", "💀"];

	// 이모티콘을 랜덤으로 선택하는 함수
	function getRandomEmoji(win) {
		let emojis = win ? winEmojis : loseEmojis;
		const randomIndex = Math.floor(Math.random() * emojis.length);
		return emojis[randomIndex];
	}

	function onlineClick() {
		if (itsOnline) {
			leftSessionAlert = true;
		} else {
			idCookie = checkId();
			showSetIdModal = true;
		}
	}

	function leaveGame() {
		resetGame();
		player1UserName = "Player 1";
		player2UserName = "Player 2";
		boardDisabled = "";
		leftSessionAlert = false;
		if (!terminated) {
			const msg = {
				type: "LEAVE_GAME",
				data: {
					sessionId: currentSession,
					id: currentUser.id,
					unique: currentUser.unique,
					turn: currentUser.turn,
				},
			};
			socket.send(JSON.stringify(msg));
		}
		currentSession = null;
		currentUser = null;
		// gameReq = null;
		// resOfRequest = null;
		// requesting = false;
		// gameMatched = false;
		showOnlineModal = true;
	}

	function setIdAndConnect(id) {
		let ts = timestamp();
		setId(id, ts);
		showSetIdModal = false;
		connectWebSocket(id, ts);
		showOnlineModal = true;
	}

	function connectWebSocket(omockId, timestamp) {
		let scheme = location.protocol === "https:" ? "wss:" : "ws:";
		let socketUrl = `${scheme}//${location.hostname}:3001`;

		socket = new WebSocket(socketUrl);

		socket.onopen = function (e) {
			const msg = {
				type: "JOIN",
				data: { id: omockId, unique: timestamp },
			};
			socket.send(JSON.stringify(msg));
			console.log("Connection established!");
		};

		socket.onmessage = function (event) {
			const recieved = JSON.parse(event.data);
			switch (recieved.type) {
				case "ONLINE_USERS":
					onlineUsers = recieved.data;
					onlineUsersExceptMe = onlineUsers.filter((x) => x.id !== checkId() && x.unique !== checkTs());
					break;
				case "NEWREQUEST":
					if (showModal) showModal = false;
					if (!showOnlineModal) showOnlineModal = true;
					gameReq = recieved.data;
					break;
				case "REQUEST_CANCELED":
					let cancelData = { ...recieved.data, canceled: true };
					gameReq = cancelData;
					break;
				case "REQUEST_REJECTED":
					let rejectData = { ...recieved.data, rejected: true };
					resOfRequest = rejectData;
					break;
				case "REQUEST_ACCEPTED":
					let acceptedData = { ...recieved.data, accepted: true };
					resOfRequest = acceptedData;
					break;
				case "GAME_START":
					let gameStartData = recieved.data;
					currentSession = gameStartData.sessionId;
					currentUser =
						gameStartData.player1.id === checkId() && gameStartData.player1.unique === checkTs()
							? gameStartData.player1
							: gameStartData.player2;
					setTimeout(() => {
						// 게임 UI 초기화 및 게임 준비
						initializeGameUI(gameStartData);
					}, 1000);
					break;
				case "OPPONENT_MOVE":
					let opponentMoveData = recieved.data;
					// 상대방의 움직임 처리
					handleOpponentMove(opponentMoveData);
					break;
				case "SESSION_TERMINATED":
					// 게임 세션 종료 처리
					let terminatedData = recieved.data;
					terminated = terminatedData;
					leaveGame();
					break;
			}
		};

		socket.onclose = () => {
			console.log("Disconnected from the server");
			onlineUsers = [];
		};

		socket.onerror = function (error) {
			console.error(`WebSocket Error: ${error.message}`);
		};
	}

	function initializeGameUI(gameData) {
		resetGame();
		if (currentUser.turn === "black") {
			player1UserName = currentUser.id;
			player2UserName = gameData.player2.id;
		} else {
			player1UserName = gameData.player1.id;
			player2UserName = currentUser.id;
		}
		if (turn !== currentUser.turn) {
			boardDisabled = "boardDisabled";
		} else {
			boardDisabled = "";
		}
		showOnlineModal = false;
		itsOnline = true;
		requesting = false;
		gameMatched = false;
		resOfRequest = null;
		gameReq = null;
	}

	function handleOpponentMove(moveData) {
		let opTurn = currentUser.turn === "black" ? "white" : "black";
		cells[moveData.y][moveData.x] = opTurn;
		checkForWin(cells, boardSize, opTurn, moveData.y, moveData.x, setWinningStonesAndWinner);
		if (!winner) {
			turn = currentUser.turn;
			boardDisabled = "";
		}
	}

	onDestroy(() => {
		if (socket) {
			socket.close();
		}
	});
</script>

<div class="flexArea">
	<div class="user blackUser {turn === 'black' ? ' active' : ''}">
		{#if winner == player1UserName}
			<div class="userProfile">
				<span class="emoji">👑</span>
				<p>{getRandomEmoji(true)}</p>
			</div>
		{:else if winner == player2UserName}
			<div class="userProfile">
				<p>{getRandomEmoji(false)}</p>
			</div>
		{:else}
			<div class="userProfile">
				<p>😗</p>
			</div>
		{/if}
		<p class="userName">{player1UserName}</p>
	</div>
	{#if end}
		<button class="w-btn-neon2" transition:fade on:click={playAgain}> Play Again! </button>
	{/if}
	<div class="user whiteUser {turn === 'white' ? ' active' : ''}">
		{#if winner == player2UserName}
			<div class="userProfile">
				<span class="emoji">👑</span>
				<p>{getRandomEmoji(true)}</p>
			</div>
		{:else if winner == player1UserName}
			<div class="userProfile">
				<p>{getRandomEmoji(false)}</p>
			</div>
		{:else}
			<div class="userProfile">
				<p>🙂</p>
			</div>
		{/if}
		<p class="userName">{player2UserName}</p>
	</div>
</div>
<div transition:fade class="board {end} {boardDisabled}">
	{#each cells as row, i}
		{#each row as _, j}
			<Cell
				{i}
				{j}
				{handleCellClick}
				{itsOnline}
				{turn}
				value={_}
				isWinningStone={winningStones.some((stone) => stone.r === i && stone.c === j)}
				isForbidden={forbiddenPlace[i][j]}
			/>
		{/each}
	{/each}
</div>

<button class="online" on:click={onlineClick}>Online Play</button>
<Modal message={`${winner} wins!`} {showModal} onClose={closeModal} {playAgain} />
<FbModal message={checkFB} {showFBModal} onClose={closeFBmodal} />
<SetIdModal show={showSetIdModal} {idCookie} onSave={setIdAndConnect} close={clostSetIdModal} />
<OnlineModal
	on:gameMatchedChange={(e) => (gameMatched = e.detail)}
	{gameMatched}
	on:requestingChange={(e) => (requesting = e.detail)}
	{requesting}
	on:resOfRequestChange={(e) => (resOfRequest = e.detail)}
	{resOfRequest}
	on:gameReqChange={(e) => (gameReq = e.detail)}
	{gameReq}
	{onlineUsersExceptMe}
	{showOnlineModal}
	onClose={closeOnlinemodal}
	{socket}
/>
<LeftSessionModal {leftSessionAlert} {leaveGame} {terminated} on:terminatedChange={(e) => (terminated = e.detail)} />

<style lang="scss">
	.flexArea {
		width: 90%;
		max-width: 600px;
		margin: 0 auto;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		row-gap: 20px;
		align-items: center;
		column-gap: 20px;

		.user {
			border: 1px solid #aaa;
			border-radius: 10px;
			padding: 10px;
			display: flex;
			flex-direction: column;
			align-items: center;

			&.blackUser {
				.userProfile {
					background-color: #000;
				}
			}

			&.whiteUser {
				.userProfile {
					background-color: #fff;
				}
			}

			&.active {
				box-shadow: 6px 6px 12px rgba(79, 209, 197, 0.64);
				outline: 2px solid #00ffcb;
			}

			.userProfile {
				width: 50px;
				height: 50px;
				background-color: #fff;
				border: 1px solid #aaa;
				border-radius: 50px;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;

				p {
					font-size: 25px;
					margin-bottom: 5px;
				}

				span.emoji {
					top: -20px;
					left: 10%;
					transform: rotate(-15deg);
					position: absolute;
					font-size: 20px;
				}
			}
			.userName {
				font-size: 14px;
				font-weight: bold;
			}
		}
	}

	.board {
		width: 90%;
		max-width: 600px;
		display: grid;
		grid-template-columns: repeat(16, 1fr);
		position: relative;
		background-image: url(./../../img/wood_texture.jpg);
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		box-shadow:
			3px 7px 10px rgba(0, 0, 0, 0.432),
			inset 5px 5px 3px rgba(255, 255, 255, 0.5); /* 외부 그림자와 내부 그림자 */
		border-radius: 5px;

		&.true {
			pointer-events: none;
		}
		&.boardDisabled {
			pointer-events: none;
			filter: brightness(0.8);
		}
	}

	@media screen and (max-width: 500px) {
		.board {
			width: 100%;
		}
	}

	@keyframes ring {
		0% {
			width: 20px;
			height: 20px;
			opacity: 1;
		}
		100% {
			width: 80px;
			height: 80px;
			opacity: 0;
		}
	}

	.w-btn-neon2 {
		position: relative;
		border: none;
		min-width: 120px;
		min-height: 30px;
		background: linear-gradient(90deg, rgba(129, 230, 217, 1) 0%, rgba(79, 209, 197, 1) 100%);
		border-radius: 1000px;
		color: darkslategray;
		cursor: pointer;
		box-shadow: 12px 12px 24px rgba(79, 209, 197, 0.64);
		font-weight: 700;
		transition: 0.3s;
	}

	.w-btn-neon2:hover {
		transform: scale(1.2);
	}

	.w-btn-neon2:hover::after {
		content: "";
		width: 30px;
		height: 30px;
		border-radius: 100%;
		border: 3px solid #00ffcb;
		position: absolute;
		z-index: -1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: ring 1.5s infinite;
	}

	.online {
		$bg: #fff;
		$fg: #06c17f;
		$border-width: 3px;
		$corner-size: 20px;
		$dur: 0.3s;

		margin-top: 30px;
		letter-spacing: 0.02rem;
		cursor: pointer;
		background: transparent;
		border: $border-width solid currentColor;
		padding: 10px 20px;
		font-size: 12px;
		color: $fg;
		position: relative;
		transition: color $dur;
		z-index: 1;

		&:hover {
			color: rgb(56, 202, 212);
			&::before {
				width: 0;
			}
			&::after {
				height: 0;
			}
		}

		&::before,
		&::after {
			content: "";
			position: absolute;
			background: $bg;
			z-index: -1;
			transition: all $dur;
		}
		//the 101% is because of a pixel rounding issue in firefox
		&::before {
			width: calc(100% - #{$corner-size});
			height: calc(101% + #{$border-width * 2});
			top: -$border-width;
			left: 50%;
			transform: translateX(-50%);
		}
		&::after {
			height: calc(100% - #{$corner-size});
			width: calc(101% + #{$border-width * 2});
			left: -$border-width;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>
