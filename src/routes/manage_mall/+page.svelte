<script>
	import InfoBoard from "$lib/components/common/InfoBoard.svelte";
	import galleryImg_0 from "$lib/img/manage_mall/0.png";
	import galleryImg_1 from "$lib/img/manage_mall/1.png";
	import galleryImg_2 from "$lib/img/manage_mall/2.png";
	import galleryImg_3 from "$lib/img/manage_mall/3.png";
	import galleryImg_4 from "$lib/img/manage_mall/4.png";
	import galleryImg_5 from "$lib/img/manage_mall/5.png";
	import galleryImg_6 from "$lib/img/manage_mall/6.png";
	import galleryImg_7 from "$lib/img/manage_mall/7.png";
	import galleryImg_8 from "$lib/img/manage_mall/8.png";

	let galleryImg = [
		galleryImg_0,
		galleryImg_1,
		galleryImg_2,
		galleryImg_3,
		galleryImg_4,
		galleryImg_5,
		galleryImg_6,
		galleryImg_7,
		galleryImg_8,
	];

	let title = "Sellerbot Cash Mall Management";
	let simpleDesc = "셀러봇캐시 고객들의 판매몰 관리용 페이지 입니다.";
	let galleryType = "multi";
	let skillStacks = ["html", "js", "scss"];
	let desc = [
		{
			title: "반응형 레이아웃",
			desc: "뷰포트 너비에 따라 최적화된 레이아웃 적용",
		},
		{
			title: "동적 요소 생성",
			desc: "API를 통해 판매몰 데이터를 불러와 동적으로 HTML 요소 생성",
		},
		{
			title: "비동기 데이터 처리",
			desc: "API 요청을 비동기로 처리하여 결과가 반환되는 시간 동안 기다리지 않고 다른 작업 수행 가능",
		},
		{
			title: "필터링",
			desc: "필터링 조건을 추가하여 등록한 판매몰의 상태에 따라 리스트에 아이템 표시",
		},
		{
			title: "상태 관리",
			desc: "지역적 상태 관리용 객체를 선언하여 변화 감지",
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
