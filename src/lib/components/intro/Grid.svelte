<script>
	import { goto } from "$app/navigation";
	import { fly, fade } from "svelte/transition";

	export let title;
	export let contents;
	export let link;
	export let externalLink;
	export let skills;
	export let titleImgSrc;
	export let clicked;
	export let overflowHidden;
	export let sampleImg;
	export let skillStacks;

	function goLink() {
		if (externalLink) {
			window.open(externalLink, "_blank");
		} else {
			goto(link);
		}
	}

	function gridClick() {
		overflowHidden = overflowHidden ? false : true;
		clicked = clicked ? false : true;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="grid" on:click={gridClick}>
	<div class="contents">
		{#if !clicked}
			<div
				class="title"
				in:fade={{ duration: 200, delay: 500 }}
				out:fly={{ y: -100, duration: 300 }}
			>
				<div class="square">
					<img src={titleImgSrc} alt="title logo" />
				</div>
				<div class="title_skills">
					<h4>{title}</h4>
					<div class="skillStacks">
						{#if skillStacks}
							{#each skillStacks as item}
								<span>#{item}</span>
							{/each}
						{/if}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
{#if clicked}
	<div
		class="detail-contents"
		in:fly={{ y: -500, duration: 300, delay: 300 }}
		out:fly={{ y: -500, duration: 500, delay: 200 }}
	>
		<button class="close" on:click={gridClick}>
			<i class="fa-solid fa-xmark"></i>
		</button>
		<div
			class="details"
			in:fly={{ y: -100, duration: 500, delay: 400 }}
			out:fly={{ y: -200, duration: 500, delay: 100 }}
		>
			<h5>{title}</h5>
			<p>{@html contents}</p>
			<img src={sampleImg} alt="sample" />
		</div>
		<div
			class="bottom"
			in:fly={{ y: -100, duration: 500, delay: 500 }}
			out:fly={{ y: -200, duration: 500 }}
		>
			<button on:click={goLink}>Go!</button>
			<p class="skillsTitle">Used Skill Stacks</p>
			<div class="skills">
				{#if skills.length > 0}
					{#each skills as item}
						<img src={item} alt="logo" />
					{/each}
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@mixin keyframes($name) {
		@keyframes #{$name} {
			@content;
		}
	}

	.detail-contents {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 100%;
		height: 100%;
		background-color: #fffe;
		box-shadow: 0px 0px 30px #20202077;
		padding: 30px;
		box-sizing: border-box;
		transform: translate(-50%, -50%);
		z-index: 1;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;
		}

		&::-webkit-scrollbar-track {
			background: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #fff7;
			border-radius: 2px;
		}

		button.close {
			float: right;
			background: none;
			border: none;
			outline: none;
			font-size: 30px;
			cursor: pointer;
			padding: 10px;
		}

		.details {
			width: 100%;
			max-width: 800px;
			max-height: 100%;

			h5 {
				text-align: left;
				font-size: 2rem;
				padding: 10px 0;
			}

			p {
				font-size: 1.2rem;
				text-align: left;
				letter-spacing: -1px;
				// text-wrap: balance;
			}

			img {
				width: 100%;
				height: auto;
				margin: 20px 0;
				box-shadow: 0 0 30px #cdcdcd;
				border-radius: 20px;
			}
		}

		.bottom {
			width: 100%;
			max-width: 800px;
			margin-top: 20px;

			button {
				padding: 15px 30px 14px;
				border: none;
				outline: none;
				background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
				background-size: 200% 200%;
				color: #202020;
				background-position: 0% 50%;
				cursor: pointer;
				font-size: 1.2rem;

				&:hover {
					animation: gradientMove 15s linear infinite;
				}

				@include keyframes(gradientMove) {
					0% {
						background-position: 0% 50%;
					}

					50% {
						background-position: 100% 50%;
					}

					100% {
						background-position: 0% 50%;
					}
				}
			}

			p.skillsTitle {
				margin-top: 30px;
				position: relative;
				&::after {
					content: "";
					display: block;
					position: absolute;
					bottom: -5px;
					width: 100%;
					height: 1px;
					background-color: #cdcdcd;
				}
			}
			.skills {
				margin-top: 15px;
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
				grid-auto-rows: 30px;
				gap: 10px 10px;

				img {
					width: 100%;
					height: 100%;
					object-fit: scale-down;
				}
			}
		}
	}

	.grid {
		transition: all 0.2s;
		border-radius: 30px;
		padding: 30px;
		box-sizing: border-box;
		background-color: transparentize(#fff, 0.3);
		cursor: default;
		overflow: hidden;
		box-shadow: 0px 5px 11px #20202077;

		.contents {
			width: 100%;
			height: 100%;
			position: relative;

			.title {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

				.square {
					width: 90px;
					height: 90px;
					// padding: 10px;
					border-radius: 30px;
					box-sizing: border-box;
					overflow: hidden;
					margin: 0 auto;
					background-color: #fff;
					transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
					display: flex;
					align-items: center;
					justify-content: center;

					img {
						width: 100%;
						height: auto;
						margin: 0 auto;
					}
				}

				h4 {
					margin-top: 5px;
					font-size: 1rem;
					text-align: center;
					transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
				}

				.skillStacks {
					display: none;
				}
			}
		}

		&:hover {
			.contents {
				.title {
					transform: translate(-50%, -50%) scale(1.05);

					.square {
						box-shadow: 0 0 20px #7775;
					}
				}
			}
		}
	}

	@media screen and (max-width: 1400px) {
		.detail-contents {
			.details {
				h5 {
					font-size: 1.5rem;
				}

				p {
					font-size: 1rem;
				}
			}
		}
	}

	@media screen and (max-width: 720px) {
		.detail-contents {
			padding: 20px;

			button.close {
				font-size: 20px;
			}

			.details {
				h5 {
					font-size: 1rem;
				}

				p {
					font-size: 0.7rem;
				}
			}
			.bottom {
				button {
					padding: 10px 20px 9px;
					font-size: 0.8rem;
				}

				p.skillsTitle {
					font-size: 0.8rem;
				}
				.skills {
					grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
					grid-auto-rows: 20px;
				}
			}
		}

		.grid {
			border-radius: 20px;
			padding: 20px;

			.contents {
				height: auto;
				.title {
					position: initial;
					transform: none;
					display: flex;
					column-gap: 20px;
					.square {
						width: 70px;
						height: 70px;
						border-radius: 20px;
						margin: 0;
					}

					.title_skills {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						flex: 1;
						h4 {
							text-align: left;
							margin-top: 0;
							font-size: 0.8rem;
						}

						.skillStacks {
							margin-top: 10px;
							display: flex;
							flex-wrap: wrap;
							row-gap: 3px;
							column-gap: 3px;
							span {
								font-size: 0.7rem;
								color: #505050;
								letter-spacing: -0.7px;
							}
						}
					}
				}
			}

			&:hover {
				.contents {
					.title {
						transform: scale(1.05);

						.square {
							box-shadow: 0 0 20px #7775;
						}
					}
				}
			}
		}
	}
</style>
