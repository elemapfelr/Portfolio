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
	let simpleDesc = "내부 서비스 관리를 위한 대시보드 입니다.";
	let galleryType = "multi";
	let skillStacks = [
		"docker",
		"gitlab",
		"nodejs",
		"js",
		"scss",
		"npm",
		"chartjs",
		"ejs",
		"ssh",
		"sftp",
	];
	let desc = [
		{
			title: "",
			desc: "Javascript의 내장 API인 Intersection Observer를 이용하여 뷰포트 진입 시 작동하는 스크롤 애니메이션을 구현하였습니다.",
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
