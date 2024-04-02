// 상세내역 옆 도움말 팝업
let hoverTarget = document.querySelector('#detailHoverBtn');
let popup = document.querySelector('.detailHoverPopup');
let timeoutId;

// 지원 은행 클릭시 팝업
document.querySelector('#supportingBank').addEventListener('click',()=>{
	let url = './registerAccount_01.html';
	window.open(url, 'register_account', 'width=551px, height=810px');
})

hoverTarget.addEventListener('mouseenter', function () {
	// 팝업을 표시합니다.
	popup.classList.add('show');
	setTimeout(() => {
		popup.style.opacity = 1;
	}, 300);
});

hoverTarget.addEventListener('mouseleave', function () {
	// 0.3초 후에 팝업을 숨깁니다.
	timeoutId = setTimeout(function () {
		popup.style.opacity = 0;
		setTimeout(() => {
			popup.classList.remove('show');
		}, 300);
	}, 300);
});

popup.addEventListener('mouseenter', function () {
	// 팝업에 마우스가 있으면 사라지지 않도록 합니다.
	clearTimeout(timeoutId);
	popup.classList.add('show');
	popup.style.opacity = 1;
});

popup.addEventListener('mouseleave', function () {
	// 팝업에서 마우스가 벗어나면 팝업을 숨깁니다.
	popup.style.opacity = 0;
	setTimeout(() => {
		popup.classList.remove('show');
	}, 300);
});

popup.querySelector('.popupHead button').addEventListener('click', () => {
	popup.style.opacity = 0;
	popup.classList.remove('show');
});

document.querySelectorAll('ul#period li').forEach((el) => {
	el.addEventListener('click', function () {
		let periodFrom = document.querySelector('input#periodFrom');
		let periodTo = document.querySelector('input#periodTo');
		const toDate = new Date();
		const fromDate = new Date(toDate.getFullYear(), toDate.getMonth() + 1 - this.value, 1);
		if (el.value == 1) {
			periodTo.valueAsDate = fromDate;
		} else {
			periodTo.valueAsDate = toDate;
		}
		periodFrom.valueAsDate = fromDate;
	});
});
