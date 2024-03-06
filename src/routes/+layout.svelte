<script>
	import { fade } from 'svelte/transition';
	import '$lib/scss/style.scss';
	import { page } from '$app/stores';
	import svelteLogo from '$lib/img/svelte_logo.svg';
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
				<span><img src={svelteLogo} alt="svelte logo" /></span>
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
		padding: 50px 25px;
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
				img {
					width: 24px;
				}
			}
		}
	}
	.slotArea {
		flex: 1;
		height: 100vh;
	}
</style>
