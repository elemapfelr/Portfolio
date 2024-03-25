<script>
  import only1Logo from "$lib/img/only1_logo.svg";
  import { fade } from "svelte/transition";

  let history = [
    {
      logo: only1Logo,
      cp_name: "주식회사 온리원",
      act: "웹 퍼블리셔 / 프론트엔드 개발자",
      duration: "2021/10 ~ 재직중",
      project: [
        {
          title: "온리원 홈페이지 리뉴얼",
          lang: ["node.js", "html", "js", "scss"],
          desc: [
            "웹사이트 디자인 개편",
            "php 기반에서 node.js 기반으로 마이그레이션",
            "반응형 UI 구성",
            "제플린을 통한 디자이너와의 협업 UI",
          ],
        },
        {
          title: "계열사 홈페이지(소드원) 리뉴얼",
          lang: ["docker", "php", "js", "scss"],
          desc: [
            "웹사이트 디자인 개편",
            "반응형 UI 구성",
            "curl을 이용한 비동기 API 통신",
            "휴대폰 인증 모듈을 이용한 본인 인증 프로세스 구축",
            "docker와 gitlab ci/cd 를 활용한 파이프라인 구축",
            "제플린을 통한 디자이너와의 협업 UI",
          ],
        },
        {
          title: "내부 서비스 관리용 대시보드 구축",
          lang: ["docker", "express.js", "ejs", "js", "scss", "chart.js"],
          desc: [
            "자사 서비스 관리용 대시보드",
            "관리자 기능 구현 (회원 관리, 권한 관리, 메뉴 관리, 서비스 이용 통계 등)",
            "UI 및 화면 레이아웃 구성",
            "클라이언트 측 API 요청 및 응답 관리",
            "템플릿 형태로 구성하여 기타 서비스에도 이식할 수 있도록 범용성 확보",
            "Profile에 따른 각 API 엔드포인트 설정",
          ],
        },
        {
          title: "셀러봇캐시 빠른정산 서비스 개발",
          lang: ["jsp", "js", "scss"],
          desc: [
            "정산 예정 데이터를 기반으로 쇼핑몰 정산일보다 미리 입금을 해주는 서비스",
            "서비스 계약 페이지, 서비스 이용 내역 페이지 개발",
            "휴대폰 인증 모듈을 이용한 본인 인증 프로세스 구축",
            "관리자 대시보드와 API 연동",
          ],
        },
        {
          title: "셀러봇캐시 회원가입 페이지 리뉴얼",
          lang: ["jsp", "js", "scss"],
          desc: [
            "서비스 유료화에 따른 회원가입 프로세스 수정",
            "수정된 프로세스에 따른 페이지 구현",
            "기가입자 결제수단 등록 페이지 구현",
          ],
        },
        {
          title: "셀러봇캐시 프론트 유지보수 및 랜딩 페이지 개발",
          lang: ["jsp", "js", "scss"],
          desc: [
            "이벤트 및 프로모션 랜딩 페이지 제작",
            "서비스 안내 팝업 등 다수의 레이어 팝업 제작",
          ],
        },
      ],
    },
    {
      logo: null,
      cp_name: "직업능력개발훈련",
      act: "스마트기기 UXUI 웹디자인&웹퍼블리셔 과정 수료",
      duration: "2021/04 ~ 2021/08",
      project: [
        {
          title: "UIUX 및 HTML, CSS, Javascript의 이해",
          desc: [
            "반응형 UI와 웹표준에 대한 교육",
            "화면 기획 및 설계, 정보구조도 작성 방법 교육",
            "HTML, CSS, Javascript의 기초 교육",
            "크로스 브라우징에 따른 벤더 프리픽스 사용 및 이해",
            "클론 사이트 퍼블리싱 프로젝트 진행",
          ],
        },
      ],
    },
  ];
</script>

<div
  class="wrap"
  in:fade={{ duration: 300, delay: 200 }}
  out:fade={{ duration: 200 }}
>
  <h3>경력</h3>
  {#each history as his}
    <div class="his">
      <span>{his.duration}</span>
      <div class="title">
        <div class="left">
          {#if his.logo}
            <img src={his.logo} alt="" />
          {:else}
            <div class="circle"></div>
          {/if}
        </div>
        <div class="right">
          <p>{his.cp_name}</p>
          <p>{his.act}</p>
        </div>
      </div>
      <div class="desc">
        {#each his.project as proj}
          <div class="project">
            <p class="title">{proj.title}</p>
            {#if proj.lang}
              <div class="lang">
                {#each proj.lang as lang}
                  <span>{lang}</span>
                {/each}
              </div>
            {/if}
            {#each proj.desc as desc}
              <p>- {desc}</p>
            {/each}
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
    .his {
      margin: 10px 0;
      border: 1px solid #ddd;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 20px;
      background-color: #fff;
      span {
        display: block;
        color: #777;
        font-size: 0.8rem;
        margin-bottom: 5px;
      }
      .title {
        display: flex;
        align-items: center;
        column-gap: 10px;
        .left {
          width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 50px;
          img {
            width: 100%;
            margin: 0;
          }
          .circle {
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #81ffef 10%, #f067b4 100%);
          }
        }
        .right {
          flex: 1;
          p {
            font-size: 1rem;
          }
        }
      }
      .desc {
        margin-top: 10px;

        .project {
          border-top: 1px solid #ddd;
          padding: 20px 10px;
          box-sizing: border-box;

          .lang {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 5px;
            margin-bottom: 5px;
            padding-left: 10px;
            span {
              background-color: #dadada;
              font-size: 0.8em;
              color: #202020;
              padding: 0 2px;
            }
          }

          p {
            margin: 3px 0;
            color: #505050;
            line-height: 1.7;
            font-size: 0.9rem;
            &.title {
              text-indent: 5px;
              margin-left: 5px;
              position: relative;
              font-size: 1rem;
              font-weight: 500;

              &::after {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: -5px;
                width: 5px;
                height: 5px;
                border-radius: 5px;
                transform: translateY(-50%);
                background-color: #f067b4;
              }
            }
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
      .his {
        margin: 10px 0;
        border: 1px solid #ddd;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 20px;
        span {
          font-size: 0.7rem;
        }
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
        .desc {
          .project {
            .lang {
              span {
                font-size: 0.6rem;
              }
            }
            p {
              margin: 0;
              font-size: 0.7rem;
              letter-spacing: -0.8px;
              &.title {
                font-size: 0.8rem;
              }
            }
          }
        }
      }
    }
  }
</style>
