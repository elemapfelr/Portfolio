<script>
  import { goto } from "$app/navigation";
  import { fly, fade } from "svelte/transition";
  import svelteLogo from "$lib/img/svelte_logo.svg";

  export let title;
  export let contents;
  export let link;
  export let externalLink;
  export let skills;
  export let titleImgSrc;
  export let clicked;
  export let overflowHidden;

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
        <h4>{title}</h4>
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
      <button on:click={goLink}>Go!</button>
    </div>
    <div
      class="skills"
      in:fly={{ y: -100, duration: 500, delay: 500 }}
      out:fly={{ y: -200, duration: 500 }}
    >
      {#if skills.length > 0}
        {#each skills as item}
          {#if item == "svelte"}
            <span><img src={svelteLogo} alt="svelte logo" /></span>
          {:else}
            <span><i class="fa-brands fa-{item}"></i></span>
          {/if}
        {/each}
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

  .detail-contents {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background-color: #fffa;
    box-shadow: 0px 0px 30px #20202077;
    padding: 30px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    backdrop-filter: blur(5px);
    z-index: 1;

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
      }
      button {
        float: right;
        margin-top: 10px;
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
    }
    .skills {
      margin-top: 20px;
      display: flex;
      align-items: center;
      column-gap: 10px;
      span {
        i {
          color: #7e7e7e;
          font-size: 16px;
          vertical-align: middle;
        }
        img {
          width: 16px;
          filter: brightness(0.5);
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
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      background-color: #fffa;
      box-shadow: 0px 0px 30px #20202077;
      padding: 30px;
      box-sizing: border-box;
      transform: translate(-50%, -50%);
      backdrop-filter: blur(5px);
      z-index: 1;

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
        .skills {
          span {
            i {
              font-size: 12px;
            }
            img {
              width: 12px;
            }
          }
        }
        button {
          font-size: 0.8rem;
        }
      }
    }
    .grid {
      border-radius: 20px;
      padding: 20px;

      .contents {
        .title {
          .square {
            width: 70px;
            height: 70px;
            border-radius: 20px;
          }

          h4 {
            font-size: 0.8rem;
          }
        }
      }
    }
  }
</style>
