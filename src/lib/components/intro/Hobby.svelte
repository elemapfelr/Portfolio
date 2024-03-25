<script>
  import { fade } from "svelte/transition";
  import hiking from "$lib/img/about/hiking.png";
  import running from "$lib/img/about/running.png";
  import fashion from "$lib/img/about/fashion.png";
  import run_0 from "$lib/img/about/run_0.jpg";
  import run_1 from "$lib/img/about/run_1.jpg";
  import run_2 from "$lib/img/about/run_2.jpg";
  import run_3 from "$lib/img/about/run_3.jpg";
  import hiking_0 from "$lib/img/about/hiking_0.jpg";
  import hiking_1 from "$lib/img/about/hiking_1.jpg";
  import hiking_2 from "$lib/img/about/hiking_2.jpg";
  import hiking_3 from "$lib/img/about/hiking_3.jpg";
  import hiking_4 from "$lib/img/about/hiking_4.jpg";
  import hiking_5 from "$lib/img/about/hiking_5.jpg";
  import hiking_6 from "$lib/img/about/hiking_6.jpg";
  import hiking_7 from "$lib/img/about/hiking_7.jpg";
  import fashion_0 from "$lib/img/about/fashion_0.jpg";
  import fashion_1 from "$lib/img/about/fashion_1.jpg";
  import fashion_2 from "$lib/img/about/fashion_2.jpg";
  import fashion_3 from "$lib/img/about/fashion_3.jpg";
  import fashion_4 from "$lib/img/about/fashion_4.jpg";
  import fashion_5 from "$lib/img/about/fashion_5.jpg";
  import fashion_6 from "$lib/img/about/fashion_6.jpg";
  import fashion_7 from "$lib/img/about/fashion_7.jpg";

  let list = [
    {
      logo: hiking,
      title: "HIKING",
      desc: `등산은 제가 가장 좋아하는 취미입니다. 평소에 자연을 탐험하고 새로운 경험을 쌓는
      것을 즐기며, 등산을 통해 마음을 담담하게 정화할 수 있습니다.`,
      images: [
        hiking_0,
        hiking_1,
        hiking_2,
        hiking_3,
        hiking_4,
        hiking_5,
        hiking_6,
        hiking_7,
      ],
    },
    {
      logo: running,
      title: "RUNNING",
      desc: `평소에는 러닝도 즐깁니다. 달리면서 몸과 마음을 활기차게 만들고,
      새로운 목표를 달성하는 쾌감을 느낄 수 있습니다.`,
      images: [run_0, run_1, run_2, run_3],
    },
    {
      logo: fashion,
      title: "FASHION",
      desc: `저는 패션에도 관심을 가지고 있습니다. 특히 등산복과 같은 아웃도어 의류를
      선호하는데, 흔히 고프코어라고 칭하는 스타일을 즐겨 입습니다. 패션을 통해
      자신의 개성을 표현하고 새로운 스타일을 발견하는 것은 저에게 큰
      즐거움입니다.`,
      images: [
        fashion_0,
        fashion_1,
        fashion_2,
        fashion_3,
        fashion_4,
        fashion_5,
        fashion_6,
        fashion_7,
      ],
    },
  ];
</script>

<div
  class="wrap"
  in:fade={{ duration: 300, delay: 200 }}
  out:fade={{ duration: 200 }}
>
  <h3>취미</h3>
  {#each list as item}
    <div class="eachItem">
      <div class="title">
        <div class="left">
          <img src={item.logo} alt="hiking" />
        </div>
        <div class="right">
          <p>{item.title}</p>
        </div>
      </div>
      <p class="desc">{item.desc}</p>
      <div class="images">
        {#each item.images as image}
          <div>
            <img src={image} alt="" />
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .wrap {
    padding-top: 30px;
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
    .eachItem {
      margin: 10px 0;
      border: 1px solid #ddd;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 20px;
      background-color: #fff;
      .title {
        display: flex;
        align-items: center;
        column-gap: 10px;
        .left {
          width: 50px;
          height: 50px;
          padding: 10px;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 50px;
          border: 1px solid #dadada;
          img {
            width: 100%;
            margin: 0 auto;
          }
        }
        .right {
          flex: 1;
          p {
            font-size: 1rem;
          }
        }
      }
      p.desc {
        margin-top: 10px;
        letter-spacing: -1px;
      }
      .images {
        margin-top: 10px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        grid-auto-rows: 150px;
        gap: 2px;
        > div {
          width: 100%;
          height: 100%;
          overflow: hidden;
          transition: all 0.3s;

          &:hover {
            transform: scale(1.05);
          }
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }

  @media screen and (max-width: 720px) {
    .wrap {
      h3 {
        font-weight: 300;
        font-size: 1rem;
        margin-left: 10px;
        text-indent: 3px;
        &::before {
          width: 3px;
        }
      }
      .eachItem {
        margin: 10px 0;
        border: 1px solid #ddd;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 20px;

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
        p.desc {
          font-size: 0.7rem;
          letter-spacing: -0.8px;
        }
      }
    }
  }
</style>
