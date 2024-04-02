<script>
	import InfoBoard from "$lib/components/common/InfoBoard.svelte";
	import galleryImg_0 from "$lib/img/fast_settled/0.png";
	import galleryImg_1 from "$lib/img/fast_settled/1.png";
	import galleryImg_2 from "$lib/img/fast_settled/2.png";
	import galleryImg_3 from "$lib/img/fast_settled/3.png";
	import galleryImg_4 from "$lib/img/fast_settled/4.png";
	import galleryImg_5 from "$lib/img/fast_settled/5.png";
	import galleryImg_6 from "$lib/img/fast_settled/6.png";

	let galleryImg = [
		galleryImg_0,
		galleryImg_1,
		galleryImg_2,
		galleryImg_3,
		galleryImg_4,
		galleryImg_5,
		galleryImg_6,
	];

	let title = "Sellerbot Cash Fast Settle";
	let simpleDesc = "셀러봇캐시의 신규 서비스 런칭 프로젝트입니다. 빠른정산 서비스 소개 및 계약, 신청 등의 페이지를 제작하였습니다.";
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
			title: '객체 상태 관리',
			desc: '자바스크립트 내장 객체인 Proxy를 활용하여 데이터 상태 관리'
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
