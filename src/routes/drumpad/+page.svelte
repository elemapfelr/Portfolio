<script>
	import { onDestroy } from "svelte";
	import * as Tone from "tone";
	import Pad from "$lib/components/drumpad/Pad.svelte";

	let metronomeIsActive = false;
	let bpm = 120;
	let metronome;
	let drumSounds;
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

	// 오디오 컨텍스트 시작
	async function audioCtx() {
		await Tone.start();
		setupDrumSounds();
		setupMetronome();
		return [
			{
				keyName: "1",
				sound: "Kick",
				clickSound: () => {
					playSound("kick", "C2", "8n");
				},
			},
			{
				keyName: "2",
				sound: "Snare",
				clickSound: () => {
					drumSounds["snare"].triggerAttackRelease("16n", Tone.now());
				},
			},
			{
				keyName: "3",
				sound: "Hihat-Closed",
				clickSound: () => {
					playSound("hihatClosed", "32n");
				},
			},
			{
				keyName: "4",
				sound: "Hihat-Open",
				clickSound: () => {
					playSound("hihatOpen", "32n");
				},
			},
			{
				keyName: "Q",
				sound: "Tom-Low",
				clickSound: () => {
					playSound("tomLow", "G2", "8n");
				},
			},
			{
				keyName: "W",
				sound: "Tom-Mid",
				clickSound: () => {
					playSound("tomMid", "C3", "8n");
				},
			},
			{
				keyName: "E",
				sound: "Tom-High",
				clickSound: () => {
					playSound("tomHigh", "E3", "8n");
				},
			},
			{
				keyName: "R",
				sound: "Clap",
				clickSound: () => {
					drumSounds["clap"].triggerAttackRelease("16n", Tone.now());
				},
			},
			{
				keyName: "A",
				sound: "Cowbell",
				clickSound: () => {
					playSound("cowbell", "G4", "16n");
				},
			},
			{
				keyName: "S",
				sound: "Crash-Cymbal",
				clickSound: () => {
					playSound("crashCymbal", "32n");
				},
			},
			{
				keyName: "D",
				sound: "Ride-Cymbal",
				clickSound: () => {
					playSound("rideCymbal", "32n");
				},
			},
			{
				keyName: "F",
				sound: "Ride-Bell",
				clickSound: () => {
					playSound("rideBell", "G5", "16n");
				},
			},
			{
				keyName: "Z",
				sound: "Bongo-High",
				clickSound: () => {
					playSound("bongoHigh", "E4", "16n");
				},
			},
			{
				keyName: "X",
				sound: "Bongo-Low",
				clickSound: () => {
					playSound("bongoLow", "G3", "16n");
				},
			},
			{
				keyName: "C",
				sound: "Conga-High",
				clickSound: () => {
					playSound("congaHigh", "E2", "8n");
				},
			},
			{
				keyName: "V",
				sound: "Conga-Low",
				clickSound: () => {
					playSound("congaLow", "G2", "8n");
				},
			},
		];
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
			clap: new Tone.NoiseSynth({
				volume: -5,
				envelope: {
					attack: 0.005,
					decay: 0.1,
					sustain: 0,
				},
				filterEnvelope: {
					attack: 0.006,
					decay: 0.2,
					sustain: 0,
				},
			}).toDestination(),
			cowbell: new Tone.MetalSynth({
				frequency: 560,
				envelope: {
					attack: 0.001,
					decay: 0.2,
					release: 0.01,
				},
				harmonicity: 5.1,
				modulationIndex: 32,
				resonance: 8000,
				octaves: 1.5,
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
			rideBell: new Tone.MetalSynth({
				frequency: 560,
				envelope: {
					attack: 0.001,
					decay: 0.4,
					release: 0.2,
				},
				harmonicity: 5.1,
				modulationIndex: 32,
				resonance: 8000,
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
			congaHigh: new Tone.MembraneSynth({
				pitchDecay: 0.1,
				octaves: 4,
			}).toDestination(),
			congaLow: new Tone.MembraneSynth({
				pitchDecay: 0.1,
				octaves: 4,
			}).toDestination(),
		};
	}

	function setupMetronome() {
		const click = new Tone.MembraneSynth().toDestination();
		const loop = new Tone.Loop((time) => {
			click.triggerAttackRelease("C2", "64n", time);
		}, "4n");

		metronome = {
			start: () => {
				Tone.Transport.bpm.value = bpm;
				Tone.Transport.start();
				loop.start(0);
			},
			stop: () => {
				loop.stop();
				Tone.Transport.stop();
			},
			setBpm: (newBpm) => {
				bpm = newBpm;
				Tone.Transport.bpm.value = bpm;
			},
		};
	}

	function playSound(soundName, note = "C2", duration = "8n") {
		const sound = drumSounds[soundName];
		sound.triggerAttackRelease(note, duration, Tone.now());
	}

	onDestroy(() => {
		// 정리 로직
		if (drumSounds) {
			Object.values(drumSounds).forEach((synth) => synth.dispose());
		}
		if (metronome) {
			metronome.stop();
		}
	});

	let drumSoundsPromise = audioCtx();

	function toggleMetronome() {
		metronomeIsActive = !metronomeIsActive;
		metronomeIsActive ? metronome.start() : metronome.stop();
	}

	function handleBpmChange(event) {
		const newBpm = event.target.value;
		bpm = newBpm;
		metronome.setBpm(newBpm);
	}
</script>

<div class="bg">
	{#await drumSoundsPromise}
		<button
			class="refresh"
			on:click={() => {
				drumSoundsPromise = audioCtx();
			}}>Start Drum Pad <i class="fa-solid fa-rotate"></i></button
		>
	{:then pads}
		<div class="metronome">
			<div class="metronome-input">
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
				<input type="range" id="bpmRange" min="40" max="240" value={bpm} on:input={handleBpmChange} />
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
			<button on:click={toggleMetronome}>
				{metronomeIsActive ? "Stop Metronome" : "Start Metronome"}
			</button>
		</div>
		<div class="drumPad">
			{#each pads as item}
				<Pad keyName={item.keyName} sound={item.sound} clickSound={item.clickSound} />
			{/each}
		</div>
		<div class="align-right">
			<a href="/looppad">Loop Pad</a>
		</div>
	{/await}
</div>

<style lang="scss">
	.bg {
		width: 100%;
		height: 100%;
		background-color: #363636;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		button.refresh {
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

		.metronome {
			width: 415px;
			display: flex;
			flex-direction: column;
			row-gap: 5px;
			margin-bottom: 10px;

			.metronome-input {
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

		.drumPad {
			display: grid;
			grid-template-columns: repeat(4, 100px);
			grid-template-rows: repeat(4, 100px);
			gap: 5px;
			// background-color: #363636;
			// padding: 20px;
			// box-shadow: 3px 5px 8px #000a;
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
