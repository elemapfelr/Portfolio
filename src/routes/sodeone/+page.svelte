<script>
	import InfoBoard from "$lib/components/common/InfoBoard.svelte";
	import galleryImg from "$lib/img/sodeone/sodeone_capture.png";

	let title = "Sodeone Home Page";
	let simpleDesc = `소드원은 온라인 쇼핑몰 운영자를 위한 금융 서비스 플랫폼으로,
  온라인 쇼핑몰 운영자의 특성을 이해하고 필요한 금융 상품을 제공하는 것에 중점을 두고 있어
  정산예정금을 바탕으로 한 대출 등을 통해 운영 자금을 확보할 수 있도록 지원합니다.
  이를 통해 쇼핑몰 운영자는 현금 흐름 관리, 결제 예측 서비스, 물류 지원 등의 다양한 혜택을 받을 수 있습니다.`;
	let galleryType = "vertical";
	let skillStacks = ["php", "js", "scss", "curl"];
	let desc = [
		{
			title: "통합 로그인 서비스",
			desc: "셀러봇캐시의 계정을 이용하여 로그인",
		},
		{
			title: "커스텀 엘리먼트",
			desc: "Checkbox, Calendar 등 스타일 변경이 어려운 HTML 요소들을 웹사이트 컨셉에 맞도록 수정하여 사용",
		},
		{
			title: "반응형 미디어 쿼리",
			desc: "뷰포트의 너비에 따라 변화하는 반응형 레이아웃을 적용하였습니다.",
		},
		{
			title: "크로스 브라우징 지원",
			desc: "Chrome, Edge, Firefox, Safari 등 다양한 브라우저에서 정상적으로 작동하도록 호환성 확보",
		},
		{
			title: "제플린 사용",
			desc: "디자이너와의 협업을 위해 제플린을 사용하여 UI와 화면 디자인을 구성하였습니다.",
		},
		{
			title: "JSON 데이터 처리",
			desc: "사용자의 서비스 이용 내역을 JSON으로 불러와 테이블 또는 그리드 형태로 조회 가능",
		},
	];
	let link = "https://1st.sode.co.kr/";
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
