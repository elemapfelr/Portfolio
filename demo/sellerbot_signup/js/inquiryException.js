import createElement from './import/createElement.js';

// 지원 은행 클릭시 팝업
document.querySelector('#supportingBank').addEventListener('click',()=>{
	let url = './registerAccount_01.html';
	window.open(url, 'register_account', 'width=551px, height=810px');
})

let wordsCount = 0;
function wordsCountCalc(operator) {
	if (operator == '+') {
		wordsCount++;
		document.querySelector('#currentWordsCount').innerText = wordsCount
			.toString()
			.padStart(3, '0');
	} else if (operator == '-') {
		wordsCount--;
		document.querySelector('#currentWordsCount').innerText = wordsCount
			.toString()
			.padStart(3, '0');
	} else {
		console.error('Invalid operator');
	}
}

// 대사 제외 단어 불러오기
let exceptionWordsData = await fetch('./json/exceptionWords.json').then((res) => res.json());
if (exceptionWordsData) {
	for (let word of exceptionWordsData.result) {
		createWordsLi(word);
	}
}

// 대사 제외 단어 추가
document.querySelector('#addException').addEventListener('click', () => {
	let inputVal = document.querySelector('#exceptionInput').value;
	if (inputVal && inputVal.replace(/\s/g, '') !== '') {
		createWordsLi(inputVal);
		document.querySelector('#exceptionInput').value = '';
	}
});

function createWordsLi(wordVal) {
	wordsCountCalc('+');
	let li = createElement('li', {
		innerText: wordVal,
	});
	let delBtn = createElement('button', {
		id: 'delete',
	});
	li.append(delBtn);
	delBtn.addEventListener('click', () => {
		// 대사제외 단어 삭제하는 로직 여기에
		wordsCountCalc('-');
		li.remove();
	});
	document.querySelector('#exceptionWordsList').append(li);
}
