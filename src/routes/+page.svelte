<script>
  import { fade } from "svelte/transition";
  import Grid from "$lib/components/intro/Grid.svelte";
  import gomoku from "$lib/img/gomoku.svg";
  import only1Logo from "$lib/img/only1_logo.svg";
  import omockSample from "$lib/img/omockSample.png";

  let grids = [
    {
      title: "Omock",
      contents: `웹소켓을 이용하여 온라인 플레이가 가능한 간단한 오목 게임입니다.<br>
        33금지, 장목금지 등 흑돌의 유리함을 상쇄하고자 렌주룰 알고리즘을 적용하였습니다.`,
      skills: ["svelte", "js", "node", "sass"],
      link: "/omock",
      titleImgSrc: gomoku,
      sampleImg: omockSample,
      externalLink: null,
      clicked: false,
    },
    {
      title: "Home Page",
      contents:
        "자사 홈페이지 리뉴얼 작업물입니다. docker 이미지와 gitlab ci/cd 를 통해 프로덕션 환경에 배포할 수 있게 구성하여, 수정사항이 생기더라도 곧 바로 적용이 가능합니다.",
      skills: ["docker", "gitlab", "node", "js", "sass"],
      link: "/only1home",
      titleImgSrc: only1Logo,
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: ["svelte", "js", "node", "sass"],
      link: "",
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: ["svelte", "js", "node", "sass"],
      link: "",
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: ["svelte", "js", "node", "sass"],
      link: "",
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: ["svelte", "js", "node", "sass"],
      link: "",
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: ["svelte", "js", "node", "sass"],
      link: "",
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: ["svelte", "js", "node", "sass"],
      link: "",
      externalLink: null,
      clicked: false,
    },
  ];

  $: overflowHidden = false;
</script>

<div class="gridArea {overflowHidden ? 'no-overflow' : ''}" out:fade>
  {#each grids as item}
    <Grid
      bind:overflowHidden
      clicked={item.clicked}
      title={item.title}
      contents={item.contents}
      skills={item.skills}
      link={item.link}
      externalLink={item.externalLink}
      titleImgSrc={item.titleImgSrc}
    ></Grid>
  {/each}
</div>

<!-- </div> -->

<!-- <Footer /> -->

<style lang="scss">
  .gridArea {
    height: 100%;
    display: grid;
    padding: 10px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 250px;
    gap: 10px;
    background-image: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
    overflow-y: scroll;
    position: relative;

    &.no-overflow {
      overflow-y: hidden;
    }

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
  }

  @media screen and (max-width: 720px) {
    .gridArea {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
</style>
