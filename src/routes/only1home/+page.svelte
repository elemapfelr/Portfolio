<script>
	import InfoBoard from '$lib/components/common/InfoBoard.svelte';
	import galleryImg from '$lib/img/only1_capture.png';

	let title = 'Only1 Home Page';
	let simpleDesc = '온리원 홈페이지 입니다.';
	let galleryType = 'vertical';
	let skillStacks = ['docker', 'gitlab', 'nodejs', 'js', 'scss'];
	let desc = [
		{
			title: '제목1',
			desc: '내용 내용 내용'
		}
	];
</script>

<InfoBoard {title} {simpleDesc} {galleryType} {galleryImg} {skillStacks} {desc} />
