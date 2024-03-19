<script>
	import { goto } from "$app/navigation";
	import { fly, fade } from "svelte/transition";
	import preparing from "$lib/img/preparing.png";

	export let i;
	export let loading;
	export let item;
	export let overflowHidden;

	let clicked = item.clicked;
	let title = item.title;
	let contents = item.contents;
	let skills = item.skills;
	let skillStacks = item.skillStacks;
	let link = item.link;
	let externalLink = item.externalLink;
	let titleImgSrc = item.titleImgSrc;
	let sampleImg = item.sampleImg;

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
		{#if loading}
			<div class="skeleton_loading" out:fade>
				<div class="skeleton_square"></div>
				<div class="skeleton_noneBg">
					<div class="skeleton_text"></div>
					{#if skillStacks}
						<div class="skeleton_skills"></div>
					{/if}
				</div>
			</div>
		{:else}
			<div
				class="title"
				in:fly={{ y: -50, duration: 500, delay: i * 100 }}
			>
				<div class="square">
					{#if titleImgSrc}
						<img src={titleImgSrc} alt="title logo" />
					{:else}
						<img src={preparing} alt="preparing" />
					{/if}
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
			{#if title == "About"}
				<div class="history">
					<h3>경력</h3>
					{#each item.history as his}
						<div class="his">
							<span>{his.duration}</span>
							<div class="title">
								<div class="left">
									{#if his.logo}
										<img src={his.logo} alt="" />
									{:else}
										<div class="circle"></div>
									{/if}
								</div>
								<div class="right">
									<p>{his.cp_name}</p>
									<p>{his.act}</p>
								</div>
							</div>
							<div class="desc">
								{#each his.project as proj}
									<div class="project">
										<p class="title">{proj.title}</p>
										{#if proj.lang}
											<div class="lang">
												{#each proj.lang as lang}
													<span>{lang}</span>
												{/each}
											</div>
										{/if}
										{#each proj.desc as desc}
											<p>- {desc}</p>
										{/each}
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			{/if}
			{#if sampleImg}
				<img src={sampleImg} alt="sample" />
			{/if}
		</div>
		<div
			class="bottom"
			in:fly={{ y: -100, duration: 500, delay: 500 }}
			out:fly={{ y: -200, duration: 500 }}
		>
			{#if link}
				<button on:click={goLink}>Learn more</button>
			{/if}
			{#if skills}
				<p class="skillsTitle">Used Skill Stacks</p>
				<div class="skills">
					{#if skills.length > 0}
						{#each skills as item}
							<img src={item} alt="logo" />
						{/each}
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	@mixin keyframes($name) {
		@keyframes #{$name} {
			@content;
		}
	}

	.skeleton_loading {
		position: absolute;
		width: 100%;
		height: 100%;
		background: transparent;

		* {
			background: linear-gradient(
				120deg,
				#777777 30%,
				#acacac 38%,
				#acacac 40%,
				#777777 48%
			);
			border-radius: 100rem;
			background-size: 200% 100%;
			background-position: 100% 0;
			animation: load 1s infinite;
		}

		@include keyframes(load) {
			100% {
				background-position: -100% 0;
			}
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
			//   max-height: 100%;

			h5 {
				text-align: left;
				font-size: 2rem;
				padding: 10px 0;
			}

			p {
				font-size: 1.2rem;
				text-align: left;
				letter-spacing: -1px;
			}

			.history {
				margin-top: 30px;
				h3 {
					font-size: 1.5rem;
					position: relative;
					margin-left: 5px;
					text-indent: 5px;
					&::before {
						content: "";
						display: block;
						position: absolute;
						top: -3px;
						left: -10px;
						width: 5px;
						height: 100%;
						background-color: #777;
					}
				}
				.his {
					margin: 10px 0;
					border: 1px solid #ddd;
					padding: 20px;
					box-sizing: border-box;
					border-radius: 20px;
					span {
						display: block;
						color: #777;
						font-size: 0.8rem;
						margin-bottom: 5px;
					}
					.title {
						display: flex;
						align-items: center;
						column-gap: 10px;
						.left {
							width: 50px;
							height: 50px;
							overflow: hidden;
							border-radius: 50px;
							img {
								width: 100%;
								margin: 0;
							}
							.circle {
								width: 100%;
								height: 100%;
								background: linear-gradient(
									135deg,
									#81ffef 10%,
									#f067b4 100%
								);
							}
						}
						.right {
							flex: 1;
							p {
								font-size: 1rem;
							}
						}
					}
					.desc {
						margin-top: 10px;

						.project {
							border-top: 1px solid #ddd;
							padding: 20px 10px;
							box-sizing: border-box;

							.lang {
								display: flex;
								align-items: center;
								flex-wrap: wrap;
								gap: 5px;
								margin-bottom: 5px;
								padding-left: 10px;
								span {
									background-color: #dadada;
									font-size: 0.8em;
									color: #202020;
									padding: 0 2px;
								}
							}

							p {
								margin: 3px 0;
								color: #505050;
								line-height: 1.7;
								font-size: 0.9rem;
								&.title {
									text-indent: 5px;
									margin-left: 5px;
									position: relative;
									font-size: 1rem;
									font-weight: 500;

									&::after {
										content: "";
										display: block;
										position: absolute;
										top: 50%;
										left: -5px;
										width: 5px;
										height: 5px;
										border-radius: 5px;
										transform: translateY(-50%);
										background-color: #f067b4;
									}
								}
							}
						}
					}
				}
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

			/*스켈레톤 메인 컨테이너*/
			.skeleton_loading {
				.skeleton_square {
					width: 90px;
					height: 90px;
					margin-bottom: 10px;
					border-radius: 30px;
				}

				.skeleton_noneBg {
					background: none;

					.skeleton_text {
						width: 50%;
						height: 15px;
						margin-bottom: 13px;
					}
					.skeleton_skills {
						width: 90%;
						height: 0.8rem;
					}
				}
			}

			.title {
				transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

				.square {
					width: 90px;
					height: 90px;
					// padding: 10px;
					border-radius: 30px;
					box-sizing: border-box;
					overflow: hidden;
					// margin: 0 auto;
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
					// text-align: center;
					transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
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
				.history {
					h3 {
						font-weight: 300;
						font-size: 1rem;
						margin-left: 10px;
						text-indent: 3px;
						&::before {
							width: 3px;
						}
					}
					.his {
						margin: 10px 0;
						border: 1px solid #ddd;
						padding: 10px;
						box-sizing: border-box;
						border-radius: 20px;
						span {
							font-size: 0.7rem;
						}
						.title {
							.left {
								width: 40px;
								height: 40px;
							}
							.right {
								p {
									font-size: 0.8rem;
								}
							}
						}
						.desc {
							.project {
								.lang {
									span {
										font-size: 0.6rem;
									}
								}
								p {
									margin: 0;
									font-size: 0.7rem;
									letter-spacing: -0.8px;
									&.title {
										font-size: 0.8rem;
									}
								}
							}
						}
					}
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

				/*스켈레톤 메인 컨테이너*/
				.skeleton_loading {
					display: flex;
					column-gap: 20px;
					.skeleton_square {
						width: 70px;
						height: 70px;
						margin-bottom: 0;
						border-radius: 20px;
					}
					.skeleton_noneBg {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.skeleton_text {
							width: 30%;
							height: 1rem;
							margin-bottom: 0;
						}
						.skeleton_skills {
							width: 80%;
							height: 0.8rem;
						}
					}
				}

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
