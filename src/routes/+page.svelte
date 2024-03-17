<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import Grid from "$lib/components/intro/Grid.svelte";
  import omockLogo from "$lib/img/omock_logo.svg";
  import only1Logo from "$lib/img/only1_logo.svg";
  import adminLogo from "$lib/img/admin_logo.png";
  import omockSample from "$lib/img/omock_sample.png";
  import only1Sample from "$lib/img/only1_sample.png";
  import adminSample from "$lib/img/admin_sample.png";
  import svelteLogo from "$lib/img/logos/svelte_logo.png";
  import jsLogo from "$lib/img/logos/javascript_logo.png";
  import dockerLogo from "$lib/img/logos/docker_logo.webp";
  import gitlabLogo from "$lib/img/logos/gitlab_logo.png";
  import nodejsLogo from "$lib/img/logos/nodejs_logo.png";
  import npmLogo from "$lib/img/logos/npm_logo.png";
  import sassLogo from "$lib/img/logos/sass_logo.png";
  import sshLogo from "$lib/img/logos/ssh_logo.png";
  import ejsLogo from "$lib/img/logos/ejs_logo.svg";

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
    } else {
      setTimeout(() => {
        loading = false;
      }, 300);
    }
  });

  let grids = [
    {
      title: "Omock",
      contents: `웹소켓을 이용하여 온라인 플레이가 가능한 간단한 오목 게임입니다. <wbr/>
        33금지, 장목금지 등 흑돌의 유리함을 상쇄하고자 렌주룰 알고리즘을 적용하였습니다.`,
      skills: [svelteLogo, jsLogo, nodejsLogo, sassLogo],
      skillStacks: ["svelte", "js", "nodejs", "scss"],
      link: "/omock",
      titleImgSrc: omockLogo,
      sampleImg: omockSample,
      externalLink: null,
      clicked: false,
    },
    {
      title: "Home Page",
      contents: `자사 홈페이지 리뉴얼 작업물입니다.<wbr/> Docker 이미지와 Gitlab CI/CD 를 통해 프로덕션 환경에 배포할 수 있게 구성하여, <wbr/>
        수정사항이 생기더라도 곧 바로 적용이 가능합니다.`,
      skills: [dockerLogo, gitlabLogo, nodejsLogo, jsLogo, sassLogo],
      skillStacks: ["docker", "gitlab", "nodejs", "js", "scss"],
      link: "/only1home",
      titleImgSrc: only1Logo,
      sampleImg: only1Sample,
      externalLink: null,
      clicked: false,
    },
    {
      title: "Admin Dashboard",
      contents: `사내 서비스 관리를 위한 대시보드 입니다.<wbr/> Nodejs 웹서버를 기반으로 한 ejs 템플릿을 사용합니다. <wbr/>
		프론트엔드 프레임워크를 사용하지 않고 직접 컴포넌트를 함수와 클래스로 구성하여 제작 하였습니다.`,
      skills: [
        dockerLogo,
        gitlabLogo,
        nodejsLogo,
        jsLogo,
        sassLogo,
        npmLogo,
        sshLogo,
        ejsLogo,
      ],
      skillStacks: [
        "docker",
        "gitlab",
        "nodejs",
        "js",
        "scss",
        "npm",
        "ejs",
        "ssh",
        "sftp",
      ],
      link: "/admin",
      titleImgSrc: adminLogo,
      sampleImg: adminSample,
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: [],
      skillStacks: [],
      link: "",
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: [],
      skillStacks: [],
      link: "",
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: [],
      skillStacks: [],
      link: "",
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: [],
      skillStacks: [],
      link: "",
      externalLink: null,
      clicked: false,
    },
    {
      title: "grid cell",
      contents:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam labore fugiat odit, consequuntur obcaecati sunt harum suscipit nemo minima hic? Facere tempora eaque voluptas adipisci at omnis labore repellat. Culpa?",
      skills: [],
      skillStacks: [],
      link: "",
      externalLink: null,
      clicked: false,
    },
  ];

  $: overflowHidden = false;
</script>

<div class="gridArea {overflowHidden ? 'no-overflow' : ''}" out:fade>
  {#each grids as item, i}
    <Grid
      {i}
      {loading}
      bind:overflowHidden
      clicked={item.clicked}
      title={item.title}
      contents={item.contents}
      skills={item.skills}
      skillStacks={item.skillStacks}
      link={item.link}
      externalLink={item.externalLink}
      titleImgSrc={item.titleImgSrc}
      sampleImg={item.sampleImg}
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
    grid-auto-rows: 220px;
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
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      grid-auto-rows: 120px;
    }
  }
</style>
