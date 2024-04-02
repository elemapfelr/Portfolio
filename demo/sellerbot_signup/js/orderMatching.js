import createElement from './import/createElement.js';

// 지원 은행 클릭시 팝업
document.querySelector('#supportingBank').addEventListener('click',()=>{
	let url = './registerAccount_01.html';
	window.open(url, 'register_account', 'width=551px, height=810px');
})

document.querySelector('#update').addEventListener('click', function () {
	// 업데이트 로직 여기에!

	this.classList.add('rotate');
	setTimeout(() => {
		this.classList.remove('rotate');
		this.querySelector('#updateTime').innerText = nowTime();
	}, 1000);
});

function nowTime() {
	// 현재 날짜와 시간을 가져옵니다.
	let now = new Date();

	// 월, 일, 시간, 분을 각각 두 자리 숫자로 맞추기 위해 함수를 정의합니다.
	function padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}

	// 월, 일, 시간, 분을 형식에 맞게 가져옵니다.
	let month = padTo2Digits(now.getMonth() + 1); // getMonth()는 0부터 시작하므로 1을 더합니다.
	let day = padTo2Digits(now.getDate());
	let hours = padTo2Digits(now.getHours());
	let minutes = padTo2Digits(now.getMinutes());

	// 형식에 맞게 문자열을 조합합니다.
	let formattedTime = month + '-' + day + ' ' + hours + ':' + minutes;

	return formattedTime;
}

function calculateBytes(str) {
	let bytes = 0;
	for (let i = 0; i < str.length; i++) {
		const charCode = str.charCodeAt(i);
		if (charCode >= 0xac00 && charCode <= 0xd7a3) {
			// 한글 범위 (0xAC00 ~ 0xD7A3)
			bytes += 2;
		} else if (charCode < 128) {
			// ASCII 범위 (0x00 ~ 0x7F)
			bytes += 1;
		} else {
			// 그 외 문자 범위 (기타 등등)
			bytes += 2; // 가장 안전한 방법은 3바이트로 가정하는 것
		}
	}
	return bytes;
}

let lastValidText = '';
function updateByteCount(textarea, byteText) {
	let text = textarea.value;
	let byteCount = calculateBytes(text);
	if (byteCount <= 20) {
		lastValidText = text;
		byteText.innerText = byteCount + '/20';
	} else {
		textarea.value = lastValidText;
	}
}

document.querySelectorAll('#memo').forEach((el) => {
	el.addEventListener('click', () => {
		if (document.querySelector('#memoPopup')) {
			document.querySelector('#memoPopup').cancelMemo();
			if (!document.querySelector('#cancelMemoPopup')) {
				memoFunction();
			} else {
				document.querySelector('#cancelYes').addEventListener('click', memoFunction);
			}
		} else {
			memoFunction();
		}
		function memoFunction() {
			el.parentNode.style.position = 'relative';
			let popup = createElement('div', {
				id: 'memoPopup',
			});
			let topDiv = createElement('div', {
				className: 'topDiv',
			});
			let cancelBtn = createElement('button', {
				id: 'cancelMemo',
				innerText: '닫기',
			});
			let saveBtn = createElement('button', {
				id: 'saveMemo',
				innerText: '저장',
			});
			topDiv.append(cancelBtn, saveBtn);
			let textArea = createElement('textarea', {
				id: 'memoContent',
				placeholder: '내용을 입력해주세요',
			});
			let byteText = createElement('span', {
				id: 'byteText',
				innerText: '0/20',
			});
			popup.append(topDiv, textArea, byteText);
			el.parentNode.append(popup);
			textArea.addEventListener('input', () => {
				updateByteCount(textArea, byteText);
			});

			function cancelMemo() {
				if (textArea.value) {
					let cancelMemoPopup = createElement('div', {
						id: 'cancelMemoPopup',
					});
					let p = createElement('p', {
						innerText: '메모 입력을 취소할까요?',
					});
					let bottomDiv = createElement('div', {
						className: 'bottomDiv',
					});
					let noBtn = createElement('button', {
						id: 'cancelNo',
						innerText: '[아니오]',
					});
					let yesBtn = createElement('button', {
						id: 'cancelYes',
						innerText: '[네]',
					});
					bottomDiv.append(noBtn, yesBtn);
					noBtn.addEventListener('click', () => {
						cancelMemoPopup.remove();
					});
					yesBtn.addEventListener('click', () => {
						popup.remove();
					});
					cancelMemoPopup.append(p, bottomDiv);
					popup.append(cancelMemoPopup);
				} else {
					popup.remove();
				}
			}
			popup.cancelMemo = cancelMemo;
			cancelBtn.addEventListener('click', cancelMemo);
			saveBtn.addEventListener('click', () => {
				console.log(textArea.value); // 메모 내용
				// 메모를 저장하는 로직 여기에!
				popup.remove();
			});
		}
	});
});
