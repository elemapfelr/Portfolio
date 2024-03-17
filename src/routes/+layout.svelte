<script>
  import { fly } from "svelte/transition";
  import { cubicIn, cubicOut } from "svelte/easing";
  import "$lib/scss/style.scss";
  import Nav from "$lib/components/common/Nav.svelte";
  import Loading from "$lib/components/common/Loading.svelte";
  import { onMount } from "svelte";
  export let data;

  let s_time = new Date();
  let loading = true;
  onMount(() => {
    if (!sessionStorage.getItem("loaded")) {
      let e_time = new Date();
      // 일부러 로딩 보여주기
      if (e_time - s_time < 2000) {
        setTimeout(
          () => {
            loading = false;
          },
          2000 - (e_time - s_time)
        );
      } else {
        loading = false;
      }
      sessionStorage.setItem("loaded", 1);
    } else {
      setTimeout(() => {
        loading = false;
      }, 300);
    }
  });
</script>

<main>
  {#if loading}
    <Loading />
  {/if}
  <Nav {loading} />
  {#key data.pathname}
    <div
      class="slotArea"
      in:fly={{ easing: cubicOut, y: 10, duration: 300, delay: 400 }}
      out:fly={{ easing: cubicIn, y: -10, duration: 300 }}
    >
      <slot />
    </div>
  {/key}
</main>

<style lang="scss">
  main {
    overflow: hidden;
  }
  .slotArea {
    height: 100dvh;
    overflow: hidden;
    transition: all 0.3s;
    position: relative;
  }
  @media screen and (max-width: 720px) {
    .slotArea {
      height: calc(100dvh - 50px);
    }
  }
</style>
