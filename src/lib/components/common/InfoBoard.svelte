<script>
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import Modal from "$lib/components/common/Modal.svelte";

	export let title;
	export let simpleDesc;
	export let galleryType;
	export let galleryImg;
	export let skillStacks;
	export let desc;
	export let link;
	export let demoLink = false;

	onMount(() => {
		if (galleryType == "vertical") {
			let verticalImg = document.querySelector(".gallery.vertical img");
			let sliderId;
			let imgVerticalSlider = () => {
				let imgHeight = verticalImg.offsetHeight;
				verticalImg.style.top = verticalImg.offsetTop - 1 + "px";

				if (verticalImg.offsetTop - 1 < -imgHeight + 300) {
					verticalImg.style.top = 0 + "px";
				}
				sliderId = requestAnimationFrame(imgVerticalSlider);
			};
			requestAnimationFrame(imgVerticalSlider);
		} else if (galleryType == "multi") {
			let duration = 5000; // 몇초동안 보여줄지 정하기 (단위 ms)

			let images = document.querySelectorAll(".gallery.multi .imgWrap");
			const progressBar = document.querySelector("#progress-bar");
			let currentIndex = 0; // 현재 보여줄 이미지의 인덱스
			let start = null;

			function updateProgressBar(timestamp) {
				if (!start) start = timestamp;
				const runtime = timestamp - start;
				const progress = Math.min(runtime / duration, 1); // duration 동안 진행

				progressBar.style.width = `${progress * 100}%`;

				if (runtime < duration) {
					// duration이 지나기 전까지 progress bar를 업데이트
					requestAnimationFrame(updateProgressBar);
				} else {
					start = null; // 다음 사이클을 위해 리셋
				}
			}

			function fadeImages() {
				// 모든 이미지를 fade out
				images.forEach((img) => {
					img.style.opacity = 0;
				});

				// 현재 인덱스의 이미지만 fade in
				images[currentIndex].style.opacity = 1;

				// 다음 이미지로 인덱스 업데이트
				currentIndex = (currentIndex + 1) % images.length;

				requestAnimationFrame(updateProgressBar); // progress bar 업데이트 시작

				// 다음 이미지로 넘어가기 전에 약간의 딜레이를 주어 fade 효과가 보이도록 함
				setTimeout(() => {
					requestAnimationFrame(fadeImages);
				}, duration); // duration 후 다음 이미지로 넘어감
			}

			// 애니메이션 시작
			fadeImages();
		} else if (galleryType == "grid") {

		}
	});

	function openWindow() {
		window.open(link, "_blank");
	}

	let modalContent = null;
	function setModalContent(prop) {
		modalContent = prop;
	}
</script>

<div class="infoBoard">
	<h2>{title}</h2>
	<p class="simpleDesc">{simpleDesc}</p>
	{#if galleryType == "vertical"}
		<div class="gallery vertical">
			<img src={galleryImg} alt="gallery Img" />
		</div>
	{:else if galleryType == "carousel"}
		<div class="gallery carousel"></div>
	{:else if galleryType == "multi"}
		<div class="gallery multi">
			{#each galleryImg as item}
				<div
					class="imgWrap"
					style="background-image: url({item})"
				></div>
			{/each}
		</div>
		<div class="progress-bar-track">
			<div id="progress-bar"></div>
		</div>
	{:else if galleryType == "grid"}
		<div class="gallery grid">
			{#each galleryImg as item}
				<!-- svelte-ignore missing-declaration -->
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div class="imgWrap"
					on:click={() => {
						setModalContent(item);
				  	}}
				>
					<img src={item} alt="">
				</div>
			{/each}
		</div>
	{:else if galleryType == "one"}
		<div class="gallery"></div>
	{/if}
	<div class="skillStacks">
		{#each skillStacks as item}
			<span>#{item}</span>
		{/each}
	</div>
	<div class="description">
		{#if desc}
			{#each desc as item}
				<h3>{item.title}</h3>
				<p>{item.desc}</p>
			{/each}
		{/if}
	</div>
	{#if link}
		<button class="go" on:click={openWindow}>
			<p class="link">
				{#if demoLink}
				데모 페이지 <i class="fa-regular fa-window-restore"></i>
				{:else}
				웹페이지 방문 <i class="fa-regular fa-window-restore"></i>
				{/if}
			</p>
		</button>
	{/if}
	<Modal content={modalContent} />
</div>

<style lang="scss">
	@mixin keyframes($name) {
		@keyframes #{$name} {
			@content;
		}
	}
	.infoBoard {
		height: 100%;
		padding: 10px;
		box-sizing: border-box;
		overflow-y: scroll;
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

		h2 {
			font-size: 1.4rem;
			letter-spacing: -1px;
			position: relative;

			&::before {
				content: "";
				display: block;
				position: absolute;
				bottom: 0;
				left: 0px;
				width: 200px;
				height: 50%;
				background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
				z-index: -1;
			}
		}

		p.simpleDesc {
			font-size: 1rem;
			letter-spacing: -1.4px;
			margin: 5px 0 10px 0;
			text-wrap: balance;
		}

		.gallery {
			&.vertical {
				width: 100%;
				max-width: 640px;
				height: 360px;
				position: relative;
				overflow: hidden;
				box-shadow: 0 5px 10px #20202044;

				img {
					position: absolute;
					width: 100%;
					top: 0;
					left: 0;
				}
			}

			&.multi {
				width: 100%;
				max-width: 640px;
				height: 305px;
				position: relative;
				box-shadow: 0 5px 10px #20202044;
				border-radius: 10px 10px 0 0;
				overflow: hidden;

				.imgWrap {
					width: 100%;
					height: 100%;
					position: absolute;
					background-position: center;
					background-size: cover;
					background-repeat: no-repeat;
					top: 0;
					left: 0;
					transition: opacity 2s ease;
					opacity: 0;
				}
			}

			&.grid {
				width: 100%;
				max-width: 920px;
				height: auto;
				display: flex;
				flex-wrap: wrap;
				// box-shadow: 0 5px 10px #20202044;
				gap: 5px;

				.imgWrap {
					width: calc(100% / 3 - 10px);
					height: 100%;
					box-shadow: 0 0 5px #20202044;
					border-radius: 10px;

					transition: all 0.3s;

					&:hover {
						transform: scale(1.05);
					}

					img{
						width: 100%;
						height: auto;
					}
				}
			}
		}

		.progress-bar-track {
			width: 100%;
			height: auto;
			max-width: 640px;

			#progress-bar {
				width: 0%;
				height: 2px;
				background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
			}
		}

		.skillStacks {
			margin-top: 10px;
			display: flex;
			flex-wrap: wrap;
			row-gap: 5px;
			column-gap: 5px;
			span {
				font-size: 0.7rem;
				color: #202020;
				letter-spacing: -0.7px;
				background-color: #dedede;
			}
		}
		.description {
			margin: 30px 0;

			h3 {
				letter-spacing: -1px;
				margin-top: 40px;
				margin-bottom: 5px;
				font-weight: 300;
				position: relative;
				margin-left: 5px;
				text-indent: 5px;
				&::after {
					content: "";
					width: 2px;
					height: 100%;
					display: block;
					position: absolute;
					top: 0;
					left: -5px;
					background-color: #cacaca;
				}
			}
			p {
				letter-spacing: -0.7px;
				line-height: 1.6;
			}
		}

		button.go {
			display: flex;
			align-items: center;
			padding: 10px 0;
			position: relative;
			cursor: pointer;
			background: none;
			border: none;
			outline: none;
			transition: all 0.3s 0.5s ease-in-out;

			/* button */
			p.link {
				background-color: transparent;
				font-size: 1rem;
				letter-spacing: -0.7px;
				color: #4c6082;
				position: relative;
				transition: all 0.3s ease-in-out;
				cursor: pointer;
				border: 0;
				padding-left: 20px;
				left: 0;
				line-height: auto;
				overflow: hidden;
				text-decoration: none;
				padding-right: 1px;

				/*line*/
				&:before {
					content: "";
					background-color: #4c6082;
					width: 3px;
					height: 100%;
					position: absolute;
					z-index: 1;
					left: 0px;
					top: 0px;
					border-radius: 50px;
					transition: all 0.3s ease-in-out;
				}
				/*arrow*/
				&:after {
					content: "";
					width: 15px;
					height: 15px;
					display: flex;
					align-items: center;
					background-color: transparent;
					position: absolute;
					border: solid 3px #4c6082;
					border-left: 0;
					border-bottom: 0;
					top: calc(50% - 9px);
					border-radius: 2px;
					transform: translateX(-42px) rotate(45deg);
					transition: all 0.3s 0.2s ease-in-out;
				}
			}
			/* bg button */
			&:before {
				content: "";
				background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
				width: 0;
				height: 100%;
				position: absolute;
				right: 0;
				top: 0px;
				transition: all 0.4s 0.3s ease-in-out;
			}
			&:hover {
				padding: 10px 15px;
				&:before {
					width: 100%;
					height: 100%;
					left: 0;
					bottom: 0px;
				}

				p.link {
					padding-left: 50px;
					color: #000;

					&:before {
						left: 21px;
						transform: rotate(90deg);
					}

					&:after {
						transform: translate(-33px) rotate(45deg);
					}
				}
			}
		}
	}
	@media screen and (max-width: 1200px) {
		.infoBoard {
			h2 {
				font-size: 1.2rem;
				transition: all 0.2s;
			}
			p.simpleDesc {
				font-size: 0.8rem;
				letter-spacing: -1.2px;
				transition: all 0.2s;
			}
			.description {
				margin: 20px 0;
				transition: all 0.2s;
				h3 {
					margin-top: 30px;
					font-size: 1rem;
					letter-spacing: -0.8px;
					transition: all 0.2s;
				}
				p {
					font-size: 0.8rem;
					letter-spacing: -0.6px;
					font-weight: 300;
					transition: all 0.2s;
				}
			}
		}
	}
	@media screen and (max-width: 720px) {
		.infoBoard {
			.gallery{
				&.grid {
					.imgWrap {
						width: calc(100% / 2 - 5px);
					}
				}
			}
			button.go {
				&:hover {
					padding: 10px 10px;

					p.link {
						&:before {
							left: 24px;
						}
					}
				}
				p.link {
					font-size: 0.8rem;
				}
			}
		}
	}
</style>
