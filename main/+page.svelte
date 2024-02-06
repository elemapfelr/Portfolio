<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css" />
		<style>
			@keyframes fadeIn {
				from {
					opacity: 0;
				}
				to {
					opacity: 1;
				}
			}

			body {
				animation: fadeIn 2s ease-in-out;
			}
		</style>
		<title>Portfolio Intro Page</title>
	</head>
	<body>
		<nav class="container-fluid">
			<ul><li><strong>My Portfolio</strong></li></ul>
			<ul>
				<li><a href="#about">About</a></li>
				<li><a href="#projects">Projects</a></li>
				<li><a href="#contact" role="button">Contact</a></li>
			</ul>
		</nav>
		<main class="container">
			<div class="grid">
				<section>
					<hgroup>
						<h2>Welcome to My Portfolio</h2>
						<h3>Your gateway to my professional journey</h3>
					</hgroup>
					<p>
						Hi, I'm a passionate developer with a knack for creating engaging digital experiences.
						Below, you'll find highlights of my projects and skills.
					</p>
					<figure>
						<img src="https://source.unsplash.com/random/800x600" alt="Portfolio Overview" />
						<figcaption><a href="#projects" target="_blank">Explore My Projects</a></figcaption>
					</figure>
					<h3>My Skills</h3>
					<p>Expert in Web Development, UI/UX Design, and Software Engineering.</p>
					<h3>Contact Me</h3>
					<p>Ready to collaborate? Feel free to reach out via the Contact section below.</p>
				</section>
			</div>
		</main>
		<section aria-label="Subscribe example">
			<div class="container">
				<article>
					<hgroup>
						<h2>Stay Updated</h2>
						<h3>Subscribe to my newsletter</h3>
					</hgroup>
					<form class="grid">
						<input
							type="text"
							id="firstname"
							name="firstname"
							placeholder="Your Name"
							aria-label="Your Name"
							required
						/>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Your Email"
							aria-label="Your Email"
							required
						/>
						<button type="submit" onclick="event.preventDefault()">Subscribe</button>
					</form>
				</article>
			</div>
		</section>
		<footer class="container">
			<small><a href="#about">About</a> • <a href="#contact">Contact</a></small>
		</footer>
	</body>
</html>
