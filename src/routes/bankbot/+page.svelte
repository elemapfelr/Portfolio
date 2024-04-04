<script>
	import InfoBoard from "$lib/components/common/InfoBoard.svelte";
	import galleryImg_0 from "$lib/img/bankbot/0.png";
	import galleryImg_1 from "$lib/img/bankbot/1.png";
	import galleryImg_2 from "$lib/img/bankbot/2.png";
	import galleryImg_3 from "$lib/img/bankbot/3.png";
	import galleryImg_4 from "$lib/img/bankbot/4.png";
	import galleryImg_5 from "$lib/img/bankbot/5.png";
	import galleryImg_6 from "$lib/img/bankbot/6.png";

	let galleryImg = [
		galleryImg_0,
		galleryImg_1,
		galleryImg_2,
		galleryImg_3,
		galleryImg_4,
		galleryImg_5,
		galleryImg_6,
	];

	let title = "Sellerbot Cash Bankbot";
	let simpleDesc = "판매몰 주문내역과 등록된 계좌의 입금내역을 자동으로 매칭 시켜주는 자동입금대사 서비스입니다.";
	let galleryType = "multi";
	let skillStacks = ["html", "js", "scss"];
	let desc = [
		{
			title: "반응형 레이아웃",
			desc: "뷰포트 너비에 따라 최적화된 레이아웃 적용",
		},
		{
			title: '협업툴 활용',
			desc: '피그마와 제플린을 통해 프로젝트 기획서 작성 및 디자인 공유'
		},
		{
			title: '동적 DOM 조작',
			desc: 'DOM API를 활용하여 페이지의 요소를 동적으로 조작하고 이벤트 핸들링을 구현'
		},
		{
			title: '비동기 통신',
			desc: 'fetch API를 사용하여 비동기적으로 서버로부터 데이터를 요청하고 응답 처리'
		},
		{
			title: '상태 관리',
			desc: '사용자 인터페이스의 상태(예: 팝업의 표시/숨김)를 JavaScript 변수와 조건부 논리를 통해 관리'
		},
	];
	let link = 'http://duknock.xyz:81/sellerbot_signup/inquiryList.html';
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
