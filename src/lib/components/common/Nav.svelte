<script>
  import { fade, fly } from "svelte/transition";
  import { page } from "$app/stores";
  import svelteLogo from "$lib/img/logos/svelte_logo.png";

  let mNavState = false;
  function mNavClick() {
    mNavState = mNavState ? false : true;
  }
</script>

<nav>
  <div class="top">
    <h1>I'm Junhyeok Choi</h1>
    <h2>Front-end Developer</h2>
    <br />
    <p>
      Hello, I am a passionate and creative front-end developer. I aim to
      improve user experience and provide value to users through innovative
      design. Based on my continuous learning and development experience on the
      latest web technology, I am striving to provide user-centered solutions. I
      look forward to creating innovative web applications together through my
      portfolio.
    </p>
  </div>
  <div class="bottom">
    {#if $page.url.pathname !== "/"}
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
<header>
  {#if $page.url.pathname !== "/"}
    <a href="/" transition:fade>Go Index</a>
  {/if}
  <button class="navTrigger {mNavState ? 'active' : ''}" on:click={mNavClick}>
    <i></i><i></i><i></i>
  </button>
  {#if mNavState}
    <nav-m transition:fly={{ x: 400, duration: 800 }}>
      <h1>I'm Junhyeok Choi</h1>
      <h2>Front-end Developer</h2>
      <br />
      <p>
        Hello, I am a passionate and creative front-end developer. I aim to
        improve user experience and provide value to users through innovative
        design. Based on my continuous learning and development experience on
        the latest web technology, I am striving to provide user-centered
        solutions. I look forward to creating innovative web applications
        together through my portfolio.
      </p>
    </nav-m>
  {/if}
</header>

<style lang="scss">
  @import "./navTrigger";
  @mixin keyframes($name) {
    @keyframes #{$name} {
      @content;
    }
  }
  nav {
    background-color: #202020;
    color: #fff;
    padding: 50px 25px;
    box-sizing: border-box;
    width: 550px;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    float: left;

    .top {
      h2 {
        text-shadow: 0px 0px 2px #fff;
        color: #202020;
        font-weight: bold;
        font-size: 35px;
        letter-spacing: -1.5px;
        transition: all 0.2s;
      }
      h1 {
        font-size: 50px;
        letter-spacing: -2px;
        transition: all 0.2s;
      }

      p {
        letter-spacing: -0.6px;
        transition: all 0.2s;
      }
    }

    .bottom {
      a {
        padding: 10px 30px 9px;
        text-decoration: none;
        background: linear-gradient(
          135deg,
          #81ffef 10%,
          #f067b4 40%,
          #f0b067 70%,
          #7ef067 100%
        );
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
  header {
    width: 100%;
    background-color: #202020;
    height: 50px;
    display: none;
    position: relative;
    a {
      line-height: 50px;
      height: 100%;
      padding: 0 30px;
      text-decoration: none;
      background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
      background-size: 200% 200%;
      background-position: 0% 50%;
      color: #202020;
      transition: all 0.2s;
      font-size: 0.8rem;
      white-space: nowrap;
      float: left;
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

    nav-m {
      position: absolute;
      top: 50px;
      right: 0;
      width: 100%;
      height: calc(100dvh - 50px);
      background-color: #202020;
      z-index: 2;
      padding: 20px;
      box-sizing: border-box;

      h2 {
        text-shadow: 0px 0px 2px #fff;
        color: #202020;
        font-weight: bold;
        font-size: 25px;
        letter-spacing: -1.5px;
        transition: all 0.2s;
      }
      h1 {
        color: #fcfcfc;
        font-size: 35px;
        letter-spacing: -2px;
        transition: all 0.2s;
      }

      p {
        color: #fcfcfc;
        font-size: 0.9rem;
        letter-spacing: -0.6px;
        transition: all 0.2s;
      }
    }
  }

  @media screen and (max-width: 1650px) {
    nav {
      width: 450px;
      .top {
        h2 {
          font-size: 25px;
          letter-spacing: -1.3px;
        }
        h1 {
          font-size: 35px;
          letter-spacing: -1.8px;
        }

        p {
          font-size: 0.9rem;
          letter-spacing: -0.5px;
        }
      }
    }
  }
  @media screen and (max-width: 1400px) {
    nav {
      width: 350px;
      .top {
        h2 {
          font-size: 20px;
          letter-spacing: -1.2px;
        }
        h1 {
          font-size: 30px;
          letter-spacing: -1.7px;
        }

        p {
          font-size: 0.8rem;
          letter-spacing: -0.4px;
        }
      }
    }
  }
  @media screen and (max-width: 720px) {
    nav {
      display: none;
    }
    header {
      display: block;
    }
  }
</style>
