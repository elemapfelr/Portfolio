<script>
  import InfoBoard from "$lib/components/common/InfoBoard.svelte";
  import galleryImg from "$lib/img/only1/only1_capture.png";

  let title = "Only1 Home Page";
  let simpleDesc = "온리원 홈페이지 입니다.";
  let galleryType = "vertical";
  let skillStacks = ["docker", "gitlab", "nodejs", "js", "scss"];
  let desc = [
    {
      title: "스크롤 애니메이션",
      desc: "Javascript의 내장 API인 Intersection Observer를 이용하여 뷰포트 진입 시 작동하는 스크롤 애니메이션을 구현하였습니다.",
    },
    {
      title: "반응형 미디어 쿼리",
      desc: "뷰포트의 너비에 따라 변화하는 반응형 레이아웃을 적용하였습니다.",
    },
    {
      title: "메일 전송 API",
      desc: "자사 API를 이용하여 이메일 양식을 폼(form)객체로 전송할 수 있습니다.",
    },
  ];
  let link = "https://only1fs.com/";
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
