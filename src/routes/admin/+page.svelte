<script>
	import InfoBoard from "$lib/components/common/InfoBoard.svelte";
	import galleryImg_0 from "$lib/img/admin/0.png";
	import galleryImg_1 from "$lib/img/admin/1.png";
	import galleryImg_2 from "$lib/img/admin/2.png";
	import galleryImg_3 from "$lib/img/admin/3.png";
	import galleryImg_4 from "$lib/img/admin/4.png";
	import galleryImg_5 from "$lib/img/admin/5.png";
	import galleryImg_6 from "$lib/img/admin/6.png";
	import galleryImg_7 from "$lib/img/admin/7.png";

	let galleryImg = [
		galleryImg_0,
		galleryImg_1,
		galleryImg_2,
		galleryImg_3,
		galleryImg_4,
		galleryImg_5,
		galleryImg_6,
		galleryImg_7,
	];

	let title = "Admin Dashboard";
	let simpleDesc =
		"본 프로젝트는 Docker를 활용하여 빌드되는 내부 서비스 관리용 대시보드로, Node.js 웹 서버와 EJS 템플릿 엔진을 기반으로 구축되었습니다.";
	let galleryType = "multi";
	let skillStacks = [
		"docker",
		"gitlab",
		"nodejs",
		"js",
		"scss",
		"npm",
		"ejs",
		"ssh",
		"sftp",
	];
	let desc = [
		{
			title: "Docker",
			desc: "Docker를 사용하여 애플리케이션의 환경을 격리하고, GitLab CI/CD와 연동하여 코드 변경 사항이 있을 때마다 자동으로 빌드 및 배포를 진행합니다.",
		},
		{
			title: "Node.js 및 EJS",
			desc: "Node.js 웹 서버를 기반으로 하며, 동적 웹 페이지를 구성하기 위해 EJS 템플릿 엔진을 사용합니다.",
		},
		{
			title: "Log",
			desc: "프로세스 환경 변수(process env)를 활용한 로깅 기능을 통해, 운영 환경에 따른 상세 로그 관리를 제공합니다.",
		},
		{
			title: "GitLab CI/CD",
			desc: "Git 저장소에 코드를 푸시할 때마다 자동으로 애플리케이션의 빌드 및 배포가 이루어집니다.",
		},
		{
			title: "Axios",
			desc: "클라이언트와 서버 간의 API 요청 및 처리를 위해 Axios 라이브러리를 사용, 비동기 HTTP 요청을 효율적으로 관리합니다.",
		},
		{
			title: "파일 업로드 및 전송",
			desc: "클라이언트에서 파일을 업로드하면, Node.js 서버가 SFTP 프로토콜을 사용하여 파일을 메인 데이터베이스 서버로 안전하게 전송합니다.",
		},
		{
			title: "클라이언트 측 모듈화",
			desc: "자주 사용되는 컴포넌트들을 함수와 클래스로 모듈화하여, 클라이언트 측에서의 재사용성을 높이고 코드의 유지보수를 용이하게 합니다.",
		},
	];
	let link = null;
</script>

<InfoBoard
	{title}
	{simpleDesc}
	{galleryType}
	{galleryImg}
	{skillStacks}
	{desc}
	{link}
/>
