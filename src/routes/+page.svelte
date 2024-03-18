<script>
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";
	import Grid from "$lib/components/intro/Grid.svelte";
	import infoLogo from "$lib/img/info_logo.svg";
	import portfolioLogo from "$lib/img/portfolio_logo.png";
	import omockLogo from "$lib/img/omock_logo.svg";
	import only1Logo from "$lib/img/only1_logo.svg";
	import adminLogo from "$lib/img/admin_logo.png";
	import sellerbotLogo from "$lib/img/sellerbot_logo.svg";
	import omockSample from "$lib/img/omock_sample.png";
	import only1Sample from "$lib/img/only1_sample.png";
	import adminSample from "$lib/img/admin_sample.png";
	import sellerbotSignupSample from "$lib/img/sellerbot_signup_sample.png";
	import manageMallSample from "$lib/img/manage_mall_sample.png";
	import htmlLogo from "$lib/img/logos/html_logo.png";
	import svelteLogo from "$lib/img/logos/svelte_logo.png";
	import jsLogo from "$lib/img/logos/javascript_logo.png";
	import dockerLogo from "$lib/img/logos/docker_logo.webp";
	import gitlabLogo from "$lib/img/logos/gitlab_logo.png";
	import nodejsLogo from "$lib/img/logos/nodejs_logo.png";
	import npmLogo from "$lib/img/logos/npm_logo.png";
	import sassLogo from "$lib/img/logos/sass_logo.png";
	import sshLogo from "$lib/img/logos/ssh_logo.png";
	import ejsLogo from "$lib/img/logos/ejs_logo.svg";
	import oracleLogo from "$lib/img/logos/oracle_logo.svg";
	import pm2Logo from "$lib/img/logos/pm2_logo.png";
	import phpLogo from "$lib/img/logos/php_logo.png";

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
			title: "About",
			contents: `안녕하세요<br>
	  저는 프론트엔드 직군에서 웹 개발을 하고 있습니다. <br>
	  주로 사용하는 언어는 <b>자바스크립트</b> 입니다. <br><br>
	  현재 온라인 커머스 데이터를 기반으로 한 금융 서비스를 제공하는 회사에서 경력을 쌓고 있습니다.<br>
	  사용자 중심의 웹 애플리케이션을 개발하고, 혁신적인 기술을 적용하여 문제를 해결하는 것을 모토로 삼고 있습니다.<br><br>
	  제 포트폴리오를 통해 제 작업물과 역량을 확인해주시면 감사하겠습니다.
	  `,
			skills: null,
			skillStacks: ["이사람이", "뭐하는", "사람인지", "궁금하다면"],
			link: null,
			titleImgSrc: infoLogo,
			sampleImg: null,
			externalLink: null,
			clicked: false,
			history: [
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
							lang: [
								"docker",
								"express.js",
								"ejs",
								"js",
								"scss",
								"chart.js",
							],
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
			],
		},
		{
			title: "Portfolio",
			contents: `현재 보고 계신 포트폴리오 사이트는<br>
	  스벨트(Svelte)를 사용하여 프론트엔드 영역을 개발하였고,<br>
	  백엔드는 Node.js를 기반으로 구축하였습니다.<br><br>
	  또한 어플리케이션의 원활한 구동을 위해 pm2 런타임을 사용하여<br>
	  서버에 오류가 발생하더라도 서비스가 중단되지 않고 자동으로 재시작 하도록 설정하였습니다.<br><br>
	  오라클 클라우드의 가상 컴퓨팅 인스턴스를 활용하여 사이트를 호스팅하고 있으며,<br>
	  도메인을 통해 접근이 용이하도록 구성되어 있습니다.`,
			skills: [
				svelteLogo,
				jsLogo,
				nodejsLogo,
				sassLogo,
				oracleLogo,
				pm2Logo,
			],
			skillStacks: ["svelte", "js", "nodejs", "scss", "oci", "pm2"],
			link: null,
			titleImgSrc: portfolioLogo,
			sampleImg: null,
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
			title: "Sellerbot Cash Sign-up",
			contents: `셀러봇캐시 회원가입 페이지 리뉴얼 프로젝트입니다.<br>
			자사 서비스 유료화 정책에 따라 수정된 프로세스를 기반으로 회원가입 페이지를 재구성하였습니다.`,
			skills: [htmlLogo, jsLogo, sassLogo],
			skillStacks: ["html", "js", "scss"],
			link: "/sellerbot_signup",
			titleImgSrc: sellerbotLogo,
			sampleImg: sellerbotSignupSample,
			externalLink: null,
			clicked: false,
		},
		{
			title: "Sellerbot Cash Mall Management",
			contents: `셀러봇캐시 고객들의 판매몰 관리용 페이지입니다.<br>
			온라인 셀러들의 판매몰을 등록, 수정, 삭제 할 수 있습니다.`,
			skills: [htmlLogo, jsLogo, sassLogo],
			skillStacks: ["html", "js", "scss"],
			link: "/manage_mall",
			titleImgSrc: sellerbotLogo,
			sampleImg: manageMallSample,
			externalLink: null,
			clicked: false,
		},
		{
			title: "Sodeone Home Page",
			contents: `계열사(소드원) 홈페이지 리뉴얼 프로젝트 입니다.<br>
			셀러봇캐시의 정산 예정금 데이터를 활용하여 금융서비스를 제공합니다.`,
			skills: [phpLogo, jsLogo, sassLogo],
			skillStacks: ["php", "js", "scss"],
			link: "/manage_mall",
			titleImgSrc: sellerbotLogo,
			sampleImg: manageMallSample,
			externalLink: null,
			clicked: false,
		},
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
			title: "What's Next?",
			contents: "컨텐츠 추가 예정입니다.",
			skills: null,
			skillStacks: ["Content is being prepared"],
			link: null,
			titleImgSrc: null,
			sampleImg: null,
			externalLink: null,
			clicked: false,
		},
	];

	$: overflowHidden = false;
</script>

<div class="gridArea {overflowHidden ? 'no-overflow' : ''}" out:fade>
	{#each grids as item, i}
		<Grid {i} {loading} bind:overflowHidden {item}></Grid>
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
		// position: relative;

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
