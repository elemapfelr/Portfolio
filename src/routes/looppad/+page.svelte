<script>
	import { onDestroy, onMount } from "svelte";
	import * as Tone from "tone";

	let cells = Array(16).fill(false);
	let isPlaying = false;
	let bpm = 120;
	let currentBeat = -1;
	let audioContextStarted = false;
	let holdStartTimeoutId = null;
	let increaseIntervalId = null;

	function stopIncreasing() {
		// 초기에 설정된 timeout과 interval을 취소
		clearTimeout(holdStartTimeoutId);
		clearInterval(increaseIntervalId);

		// 다음 클릭을 위해 null로 재설정
		holdStartTimeoutId = null;
		increaseIntervalId = null;
	}

	async function initializeAudioContext() {
		await Tone.start();
		audioContextStarted = true;
		Tone.Transport.bpm.value = bpm;
		setupSequence();
	}

	function setupSequence() {
		const synth = new Tone.MembraneSynth().toDestination();
		const loop = new Tone.Sequence(
			(time, index) => {
				currentBeat = index;
				if (cells[index]) {
					synth.triggerAttackRelease("C2", "8n", time);
				}
			},
			[...Array(16).keys()],
			"16n"
		).start(0);

		Tone.Transport.loopEnd = "1m";
		Tone.Transport.loop = true;
	}

	function toggleCell(index) {
		cells[index] = !cells[index];
	}

	function handleBpmChange(event) {
		bpm = event.target.value;
		Tone.Transport.bpm.value = bpm;
	}

	function togglePlayback() {
		if (!audioContextStarted) return;

		if (!isPlaying) {
			Tone.Transport.start();
			isPlaying = true;
		} else {
			Tone.Transport.stop();
			currentBeat = -1;
			isPlaying = false;
		}
	}

	onMount(async () => {
		await Tone.start(); // Tone.js 시작

		const synth = new Tone.MembraneSynth().toDestination();
		const loop = new Tone.Sequence(
			(time, index) => {
				currentBeat = index; // 현재 비트 위치 갱신
				if (cells[index]) {
					synth.triggerAttackRelease("C2", "8n", time);
				}
			},
			[...Array(16).keys()],
			"16n"
		);

		Tone.Transport.bpm.value = bpm;
		Tone.Transport.loopEnd = "1m"; // 1마디
		Tone.Transport.loop = true;

		loop.start(0);
	});
</script>

<div class="bg">
	{#if !audioContextStarted}
		<button class="startAudio" on:click={initializeAudioContext}>Start Audio</button>
	{:else}
		<div class="bpm">
			<div class="bpm-input">
				<button
					on:mousedown={() => {
						if (bpm > 40) {
							bpm--;
							// 버튼을 누른 상태로 0.5초 유지하면 0.1초마다 감소 시작
							holdStartTimeoutId = setTimeout(() => {
								increaseIntervalId = setInterval(() => {
									if (bpm > 40) {
										bpm--;
									}
								}, 50); // 0.05초마다 감소
							}, 500); // 0.5초 대기
						}
					}}
					on:mouseup={stopIncreasing}><i class="fa-solid fa-minus"></i></button
				>
				<input type="range" id="bpmRange" min="30" max="300" value={bpm} on:input={handleBpmChange} />
				<button
					on:mousedown={() => {
						if (bpm < 240) {
							bpm++;
							// 버튼을 누른 상태로 0.5초 유지하면 0.1초마다 증가 시작
							holdStartTimeoutId = setTimeout(() => {
								increaseIntervalId = setInterval(() => {
									if (bpm < 240) {
										bpm++;
									}
								}, 50); // 0.05초마다 증가
							}, 500); // 0.5초 대기
						}
					}}
					on:mouseup={stopIncreasing}><i class="fa-solid fa-plus"></i></button
				>
				<label for="bpmRange" class="bpm-display">BPM: {bpm}</label>
			</div>
			<button class="playBtn" on:click={togglePlayback}>{isPlaying ? "Stop" : "Play"}</button>
		</div>

		<div class="grid">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			{#each cells as cell, index}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<button
					class="cell {cell ? 'on' : ''} {index === currentBeat ? 'current' : ''}"
					on:click={() => toggleCell(index)}
				></button>
			{/each}
		</div>
		<div class="align-right">
			<a href="/drumpad">Drum Pad</a>
		</div>
	{/if}
</div>

<style lang="scss">
	@mixin keyframes($name) {
		@keyframes #{$name} {
			@content;
		}
	}

	.bg {
		width: 100%;
		height: 100%;
		background-color: #363636;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		button.startAudio {
			border: none;
			padding: 5px 10px;
			background-color: #363636;
			border: 2px solid #777;
			color: #777;
			cursor: pointer;
			transition: all 0.2s;

			&:hover {
				color: #ccc;
				border-color: #ccc;
			}
		}

		.bpm {
			width: 415px;
			display: flex;
			flex-direction: column;
			row-gap: 5px;
			margin-bottom: 10px;

			.bpm-input {
				display: flex;
				align-items: center;
				column-gap: 10px;
				input {
					flex: 1;
					accent-color: #f067b4;
				}
				label {
					text-align: start;
					width: 70px;
					font-size: 0.7rem;
					color: #f067b4;
				}
				button {
					border: none;
					padding: 0 10px;

					i {
						font-size: 0.7rem;
					}
				}
			}

			button {
				border: 1px solid #f067b4;
				background: none;
				color: #fff;
				cursor: pointer;
			}
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(4, 100px);
			grid-template-rows: repeat(4, 100px);
			gap: 5px;

			.cell {
				display: flex;
				justify-content: center;
				width: 100%;
				height: 100%;
				border-radius: 10px;
				background-color: #363636;
				box-sizing: border-box;
				padding: 5px;
				position: relative;
				transition: all 0.3s;

				&.on {
					background-color: #76c7c0;
				}
				&.current {
					box-shadow: 0 0px 15px #81ffef;
					animation: fadeout 0.5s forwards;

					@include keyframes(fadeout) {
						100% {
							box-shadow: 0 0px 10px transparent;
						}
					}
				}
			}
		}

		.align-right {
			width: 415px;
			margin-top: 10px;
			display: flex;
			justify-content: right;

			a {
				border: none;
				padding: 5px 10px;
				background-color: #363636;
				border: 2px solid #777;
				color: #777;
				cursor: pointer;
				transition: all 0.2s;
				text-decoration: none;
				font-size: 0.8rem;

				&:hover {
					color: #ccc;
					border-color: #ccc;
				}
			}
		}
	}
</style>
