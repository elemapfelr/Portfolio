<script>
	import { fade } from 'svelte/transition';
	import '$lib/scss/style.scss';
	import { page } from '$app/stores';
</script>

<main>
	<nav>
		<div class="top">
			<h1>I'm Junhyeok Choi</h1>
			<h2>Front-end Developer</h2>
			<br />
			<p>
				Hello, I am a passionate and creative front-end developer. I aim to improve user experience
				and provide value to users through innovative design. Based on my continuous learning and
				development experience on the latest web technology, I am striving to provide user-centered
				solutions. I look forward to creating innovative web applications together through my
				portfolio.
			</p>
		</div>
		<div class="bottom">
			{#if $page.url.pathname !== '/'}
				<a href="/" transition:fade>Go Index</a>
			{/if}
			<div class="skills">
				<span><i class="fa-brands fa-js"></i></span>
				<span><i class="fa-brands fa-node"></i></span>
				<span><i class="fa-brands fa-sass"></i></span>
				<span>
					<svg
						fill="#ffffff"
						width="24px"
						height="24px"
						viewBox="0 0 24 24"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						><title>Svelte icon</title><path
							d="M20.68 3.17a7.3 7.3 0 0 0-9.8-2.1l-5.6 3.56a6.36 6.36 0 0 0-2.89 4.3 6.66 6.66 0 0 0 .67 4.33 6.14 6.14 0 0 0-.95 2.4 6.84 6.84 0 0 0 1.16 5.16 7.33 7.33 0 0 0 9.8 2.12l5.6-3.56a6.36 6.36 0 0 0 2.88-4.3 6.66 6.66 0 0 0-.67-4.32 6.79 6.79 0 0 0-.2-7.59zM10.32 21.13a4.43 4.43 0 0 1-4.76-1.77c-.65-.9-.89-2.01-.7-3.11l.11-.53.1-.33.3.2c.66.5 1.4.86 2.19 1.1l.2.07-.02.2c-.02.28.06.59.22.83.33.47.9.7 1.45.55.12-.04.24-.08.34-.14l5.58-3.56c.28-.18.46-.45.53-.77.06-.33-.02-.67-.2-.94-.33-.46-.9-.67-1.45-.53-.12.04-.25.09-.35.15l-2.11 1.34a4.43 4.43 0 0 1-5.9-1.28 4.1 4.1 0 0 1-.7-3.11A3.85 3.85 0 0 1 6.92 6.9l5.57-3.56c.35-.22.73-.38 1.14-.5 1.8-.47 3.7.24 4.76 1.76a4.12 4.12 0 0 1 .57 3.64l-.1.33-.29-.2a7.42 7.42 0 0 0-2.2-1.1l-.2-.06.02-.2c.02-.29-.06-.6-.22-.84-.33-.47-.9-.67-1.45-.53-.12.04-.24.08-.34.14L8.59 9.37c-.28.19-.46.45-.52.78-.06.32.02.67.2.93.32.47.9.67 1.44.53.13-.04.25-.08.35-.14l2.13-1.36c.35-.23.74-.4 1.14-.51 1.81-.47 3.7.24 4.76 1.77.65.9.9 2.01.72 3.1a3.85 3.85 0 0 1-1.75 2.6l-5.58 3.55a4.9 4.9 0 0 1-1.16.51z"
						/></svg
					>
				</span>
				<span><i class="fa-brands fa-php"></i></span>
				<span><i class="fa-brands fa-docker"></i></span>
				<span><i class="fa-brands fa-github"></i></span>
				<span><i class="fa-brands fa-gitlab"></i></span>
			</div>
		</div>
	</nav>
	<div class="slotArea">
		<slot />
	</div>
</main>

<style lang="scss">
	@mixin keyframes($name) {
		@keyframes #{$name} {
			@content;
		}
	}

	nav {
		background-color: #202020;
		color: #fff;
		padding: 50px 0 50px 50px;
		width: calc(500px / 1920px);
		max-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.top {
			h2 {
				text-shadow: 0px 0px 2px #fff;
				color: #202020;
				font-weight: bold;
				font-size: 35px;
				letter-spacing: -1.5px;
			}
			h1 {
				font-size: 50px;
				letter-spacing: -2px;
			}

			p {
				letter-spacing: -0.4px;
			}
		}

		.bottom {
			a {
				padding: 10px 30px 9px;
				text-decoration: none;
				background: linear-gradient(135deg, #81ffef 10%, #f067b4 40%, #f0b067 70%, #7ef067 100%);
				background-size: 600% 600%;
				display: inline-block;
				color: #202020;
				margin-bottom: 50px;
				background-position: 0% 50%;

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
			.skills {
				display: flex;
				align-items: center;
				column-gap: 10px;
				i {
					color: #fff;
					font-size: 24px;
				}
			}
		}
	}
	.slotArea {
		flex: 1;
		height: 100vh;
	}
</style>
