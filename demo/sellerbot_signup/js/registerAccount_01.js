import createElement from './import/createElement.js';
import modalShow from './import/modalShow.js';

document.querySelectorAll('#bankList .gridItem').forEach((el) => {
	// 하단에 들어가는 내용은 은행마다 다름
	el.addEventListener('click', function () {
		let selectedBank = el.querySelector('p').innerText;
		let url = 'http://www.kebhana.com';

		let contents = createElement('div', {
			className: 'contents',
		});
		let p_0 = createElement('p', {
			innerText:
				'정산계좌 통합관리 서비스를 이용하시려면 각 은행별 홈페이지에서 빠른 조회 서비스 등록을 진행하신 후 계좌정보를 입력하셔야 합니다. 하단의 은행명을 선택해주시면 은행별 빠른조회서비스 등록 절차를 확인할 수 있습니다.',
		});
		let bank_name = createElement('h4', {
			innerText: selectedBank,
		});

		let individual = createElement('h5', {
			innerHTML: '<i class="fa-solid fa-user"></i> 개인뱅킹',
		});
		let ul_1 = createElement('ul');
		let li_1 = createElement('li', {
			innerHTML: `1. KEB하나은행 홈페이지(<u>${url}</u>)에 접속`,
		});
		let li_2 = createElement('li', {
			innerHTML: `2. 공인인증서를 통한 인터넷뱅킹에 로그인`,
		});
		let li_3 = createElement('li', {
			innerHTML: `3. <b>마이하나 > 계좌정보관리 > 빠른조회관리</b>에서 신청`,
		});
		ul_1.append(li_1, li_2, li_3);

		let spanLine = createElement('span', {
			className: 'line',
		});

		let company = createElement('h5', {
			innerHTML: '<i class="fa-solid fa-users"></i> 기업뱅킹',
		});
		let ul_2 = createElement('ul');
		let li_4 = createElement('li', {
			innerHTML: `1. KEB하나은행 홈페이지(<u>${url}</u>)에 접속`,
		});
		let li_5 = createElement('li', {
			innerHTML: `2. 공인인증서를 통한 인터넷뱅킹에 로그인 - 기업/CMS로 분류되며, CMS인 경우 지점방문 후 신청해야 합니다.`,
		});
		let li_6 = createElement('li', {
			innerHTML: `3. <b>뱅킹관리 > 계좌관리 > 빠른조회계좌관리</b>에서 신청`,
		});
		ul_2.append(li_4, li_5, li_6);

		let nextBtn = createElement('button', {
			id: 'nextProcess',
			innerText: '다음',
		});
		contents.append(p_0, bank_name, individual, ul_1, spanLine, company, ul_2);

		modalShow({
			id: 'bankSelect',
			content: contents.outerHTML + nextBtn.outerHTML,
			function: () => {
				document.querySelectorAll('#bankSelect .popupBody u').forEach((el) => {
					el.addEventListener('click', () => {
						window.open(url, '_blank');
					});
				});
				document.querySelector('#bankSelect #nextProcess').addEventListener('click', () => {
					location.href = `./registerAccount_02.html?bank=${selectedBank}`;
				});
			},
		});
	});
});
