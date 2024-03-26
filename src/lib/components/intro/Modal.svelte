<script>
  import { fade, fly } from "svelte/transition";
  export let content = null;

  function modalClose() {
    content = null;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if content}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    transition:fade={{ duration: 500 }}
    class="modal-overlay"
    on:click={modalClose}
  >
    <div class="modal-content" transition:fly={{ y: 200, duration: 500 }}>
      <img src={content} alt="" />
    </div>
  </div>
{/if}

<style lang="scss">
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7); /* 투명 배경 */
    z-index: 2;

    .modal-content {
      max-width: 90dvw;
      max-height: 90dvh;
      padding: 20px;
      text-align: center;
      margin-bottom: 30px;

      img {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
      }
    }
  }
</style>
