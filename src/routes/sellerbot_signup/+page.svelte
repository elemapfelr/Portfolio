<script>
	import InfoBoard from "$lib/components/common/InfoBoard.svelte";
	import galleryImg_0 from "$lib/img/sellerbot_signup/0.png";
	import galleryImg_1 from "$lib/img/sellerbot_signup/1.png";
	import galleryImg_2 from "$lib/img/sellerbot_signup/2.png";
	import galleryImg_3 from "$lib/img/sellerbot_signup/3.png";
	import galleryImg_4 from "$lib/img/sellerbot_signup/4.png";
	import galleryImg_5 from "$lib/img/sellerbot_signup/5.png";
	import galleryImg_6 from "$lib/img/sellerbot_signup/6.png";
	import galleryImg_7 from "$lib/img/sellerbot_signup/7.png";

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

	let title = "Sellerbot Cash Sign-up Renewal";
	let simpleDesc = "셀러봇캐시 회원가입 리뉴얼 프로젝트 입니다.";
	let galleryType = "multi";
	let skillStacks = ["html", "js", "scss"];
	let desc = [
		{
			title: "반응형 레이아웃",
			desc: "뷰포트 너비에 따라 최적화된 레이아웃 적용",
		},
		{
			title: "본인 인증",
			desc: "이메일과 휴대폰 인증 모듈을 활용한 본인 인증 프로세스 구축",
		},
		{
			title: "상태 관리",
			desc: "값 변환이 잦은 페이지마다 지역적 상태 관리용 객체를 선언하여 변화 감지",
		},
		{
			title: "사용자 경험",
			desc: "상호작용 시 더 나은 사용자 경험을 위한 트랜지션과 애니메이션 추가",
		},
	];
	let link = "https://www.sellerbot.co.kr/pub/member/step1";
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
