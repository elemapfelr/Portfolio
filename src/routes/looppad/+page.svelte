<script>
	import { onDestroy, onMount } from "svelte";
	import * as Tone from "tone";

	let drums = [
		{
			sound: "Kick",
			clickSound: () => {
				playSound("kick", "C2", "8n");
			},
		},
		{
			sound: "Snare",
			clickSound: () => {
				drumSounds["snare"].triggerAttackRelease("16n", Tone.now());
			},
		},
		{
			sound: "Hihat-Closed",
			clickSound: () => {
				playSound("hihatClosed", "32n");
			},
		},
		{
			sound: "Hihat-Open",
			clickSound: () => {
				playSound("hihatOpen", "32n");
			},
		},
		{
			sound: "Tom-Low",
			clickSound: () => {
				playSound("tomLow", "G2", "8n");
			},
		},
		{
			sound: "Tom-Mid",
			clickSound: () => {
				playSound("tomMid", "C3", "8n");
			},
		},
		{
			sound: "Tom-High",
			clickSound: () => {
				playSound("tomHigh", "E3", "8n");
			},
		},
		{
			sound: "Crash-Cymbal",
			clickSound: () => {
				playSound("crashCymbal", "32n");
			},
		},
		{
			sound: "Ride-Cymbal",
			clickSound: () => {
				playSound("rideCymbal", "32n");
			},
		},
		{
			sound: "Bongo-High",
			clickSound: () => {
				playSound("bongoHigh", "E4", "16n");
			},
		},
		{
			sound: "Bongo-Low",
			clickSound: () => {
				playSound("bongoLow", "G3", "16n");
			},
		},
	];
	let cells = Array(drums.length)
		.fill(null)
		.map(() => Array(16).fill(null));
	let isPlaying = false;
	let bpm = 120;
	let currentBeat = -1;
	let audioContextStarted = false;
	let synth, loop;
	let holdStartTimeoutId = null;
	let increaseIntervalId = null;
	let drumSounds;

	function playSound(soundName, note = "C2", duration = "8n") {
		const sound = drumSounds[soundName];
		sound.triggerAttackRelease(note, duration, Tone.now());
	}

	function setupDrumSounds() {
		// Define all your drum sounds here
		drumSounds = {
			kick: new Tone.MembraneSynth().toDestination(),
			snare: new Tone.NoiseSynth({
				noise: { type: "white" },
				envelope: { attack: 0.005, decay: 0.1, sustain: 0 },
			}).toDestination(),
			hihatClosed: new Tone.MetalSynth({
				frequency: 400,
				envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
				harmonicity: 5.1,
				modulationIndex: 32,
				resonance: 8000,
				octaves: 1.5,
			}).toDestination(),
			hihatOpen: new Tone.MetalSynth({
				frequency: 250,
				envelope: { attack: 0.001, decay: 0.3, release: 0.1 },
				harmonicity: 5.1,
				modulationIndex: 32,
				resonance: 4000,
				octaves: 1.5,
			}).toDestination(),
			tomLow: new Tone.MembraneSynth({
				pitchDecay: 0.1,
				octaves: 4,
				oscillator: { type: "sine" },
			}).toDestination(),
			tomMid: new Tone.MembraneSynth({
				pitchDecay: 0.1,
				octaves: 4,
				oscillator: { type: "sine" },
			}).toDestination(),
			tomHigh: new Tone.MembraneSynth({
				pitchDecay: 0.1,
				octaves: 4,
				oscillator: { type: "sine" },
			}).toDestination(),
			crashCymbal: new Tone.MetalSynth({
				frequency: 300,
				envelope: {
					attack: 0.001,
					decay: 1,
					release: 3,
				},
				harmonicity: 5.1,
				modulationIndex: 32,
				resonance: 4000,
				octaves: 1.5,
			}).toDestination(),
			rideCymbal: new Tone.MetalSynth({
				frequency: 400,
				envelope: {
					attack: 0.001,
					decay: 1,
					release: 3,
				},
				harmonicity: 5.1,
				modulationIndex: 32,
				resonance: 6000,
				octaves: 1.5,
			}).toDestination(),
			bongoHigh: new Tone.MembraneSynth({
				pitchDecay: 0.05,
				octaves: 6,
			}).toDestination(),
			bongoLow: new Tone.MembraneSynth({
				pitchDecay: 0.05,
				octaves: 6,
			}).toDestination(),
		};
	}

	async function initializeAudioContext() {
		await Tone.start();
		audioContextStarted = true;
		Tone.Transport.bpm.value = bpm;
		setupSequence();
		setupDrumSounds();
	}

	function stopIncreasing() {
		// 초기에 설정된 timeout과 interval을 취소
		clearTimeout(holdStartTimeoutId);
		clearInterval(increaseIntervalId);

		// 다음 클릭을 위해 null로 재설정
		holdStartTimeoutId = null;
		increaseIntervalId = null;
	}

	function setupSequence() {
		// synth = new Tone.MembraneSynth().toDestination();
		loop = new Tone.Sequence(
			(time, index) => {
				currentBeat = index;
				for (let row of cells) {
					if (row[index]) {
						drums.find((x) => x.sound == row[index]).clickSound();
					}
				}
			},
			[...Array(16).keys()],
			"16n"
		).start(0);

		Tone.Transport.loopEnd = "1m";
		Tone.Transport.loop = true;
	}

	function toggleCell(row, index, sound) {
		if (cells[row][index]) {
			cells[row][index] = null;
		} else {
			cells[row][index] = sound;
		}
	}

	function clearSound(row) {
		cells[row] = Array(16).fill(null);
	}

	function clearAllSound() {
		cells = Array(drums.length)
			.fill(null)
			.map(() => Array(16).fill(null));
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

	onMount(() => {
		initializeAudioContext();
	});

	onDestroy(() => {
		// 정리 로직
		if (loop) {
			loop.dispose();
		}
		if (synth) {
			synth.dispose();
		}
		if (Tone.Transport) {
			Tone.Transport.stop();
			Tone.Transport.cancel(0);
		}
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
		{#each cells as cell_row, row_index}
			<div class="flex">
				<h5>{drums[row_index].sound}</h5>
				<div class="grid">
					{#each cell_row as cell, index}
						<button
							class="cell {cell ? 'on' : ''} {index === currentBeat ? 'current' : ''}"
							on:click={() => toggleCell(row_index, index, drums[row_index].sound)}
						></button>
					{/each}
				</div>
				<button
					on:click={() => {
						clearSound(row_index);
					}}>Clear</button
				>
			</div>
		{/each}
		<div class="justify-content">
			<a href="/drumpad">Drum Pad</a>
			<button on:click={clearAllSound}>Clear All</button>
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

		.flex {
			display: flex;
			width: 100%;
			max-width: 415px;
			justify-content: center;
			align-items: center;
			position: relative;

			h5 {
				position: absolute;
				width: 100px;
				text-align: right;
				font-size: 0.7rem;
				font-weight: 500;
				color: #777;
				top: 50%;
				left: -105px;
				transform: translateY(-45%);
			}

			.grid {
				display: grid;
				grid-template-columns: repeat(16, 25px);
				grid-template-rows: repeat(1, 25px);
				gap: 1px;

				.cell {
					width: 100%;
					height: 100%;
					border-radius: 3px;
					background-color: #363636;
					box-sizing: border-box;
					padding: 5px;
					position: relative;
					transition: all 0.3s;

					// &.on {
					// 	background-color: #76c7c0;
					// }
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

			> button {
				position: absolute;
				border: 1px solid #777;
				background: none;
				color: #777;
				cursor: pointer;
				font-size: 0.7rem;
				padding: 3px 5px 2px;
				line-height: 1;
				top: 50%;
				right: -50px;
				transform: translateY(-45%);
			}

			$colors: (
				#ff9a9e #fad0c4,
				#a18cd1 #fbc2eb,
				#fad0c4 #ffd1ff,
				#ffecd2 #fcb69f,
				#ff9a9e #fecfef,
				#f6d365 #fda085,
				#fbc2eb #a6c1ee,
				#fdcbf1 #e6dee9,
				#a1c4fd #c2e9fb,
				#d4fc79 #96e6a1
			);

			@for $i from 1 through 20 {
				// 예를 들어 20개의 자식 요소를 가정
				$index: ($i - 1) % length($colors) + 1; // $colors 배열의 길이로 나눈 나머지를 사용하여 순환
				$gradient: nth($colors, $index);
				&:nth-child(#{$i}) {
					.cell.on {
						background: linear-gradient(45deg, nth($gradient, 1) 0%, nth($gradient, 2) 100%);
					}
				}
			}
			// @each $gradient in $colors {
			// 	$index: index($colors, $gradient);
			// 	&:nth-child(#{$index}) {
			// 		.cell.on {
			// 			background: linear-gradient(45deg, nth($gradient, 1) 0%, nth($gradient, 2) 100%);
			// 		}
			// 	}
			// }
		}

		.justify-content {
			width: 415px;
			margin-top: 10px;
			display: flex;
			justify-content: space-between;

			button {
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
