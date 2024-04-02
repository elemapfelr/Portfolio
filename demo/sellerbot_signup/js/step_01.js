import modalShow from "./import/modalShow.js";
import numberWithCommas from "./import/numberWithCommas.js";

document.querySelector("#nextStep").addEventListener("click", () => {
  if (document.querySelector("#nextStep").classList.contains("active")) {
    location.href = "./step_02.html";
  } else {
    // 셀러봇캐시 alert으로 변경 필요
    alert("이용권을 선택해주세요");
  }
});
document.querySelector("#pay").addEventListener("click", () => {
  if (document.querySelector(".ticketFixed").classList.contains("active")) {
    location.href = "./step_02.html";
  } else {
    // 셀러봇캐시 alert으로 변경 필요
    alert("이용권을 선택해주세요");
  }
});

// 이용권 클릭시
document.querySelectorAll("#ticket").forEach((el, idx, arg) => {
  el.addEventListener("click", () => {
    if (el.dataset.itemname.includes("뱅크봇")) {
      if (Math.random() > 0.5) {
        // 임의로 넣은 값
        // 카페24 연동이 안되어 있을경우
        let popupHtml = `
				<div class="head">
					<h5>카페24 연동 안내</h5>
					<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
				</div>
				<div class="body">
					<p>카페24 ID가 있어야만 뱅크봇(자동입금 대사 서비스) 신청이 가능합니다.</p>
					<p>카페24에서 뱅크봇 앱 설치 후 ID 연동을 먼저 진행해주세요.</p>
					<p>(메가/기가/테라봇 구독 시 뱅크봇 무료제공)</p>
					<button id="cafe24Go">카페24 ID 연동하기</button>
				</div>
				`;
        modalShow({
          id: "modal_04",
          content: popupHtml,
          function: () => {
            document
              .querySelector("#modal_04 #cafe24Go")
              .addEventListener("click", () => {
                let url = "https://store.cafe24.com/kr/apps/5050";
                window.open(url, "_blank");
              });
          },
        });
        return;
      }
    }
    arg.forEach((el2) => el2.classList.remove("active"));
    el.classList.add("active");
    if (el.dataset.period) {
      document.querySelector("#periodTitle").classList.add("show");
      document.querySelector("#period").classList.add("show");
      document.querySelector("#periodLine").classList.add("show");
    } else {
      document.querySelector("#periodTitle").classList.remove("show");
      document.querySelector("#period").classList.remove("show");
      document.querySelector("#periodLine").classList.remove("show");
    }

    document.querySelector(".fixed").classList.add("active");
    document.querySelector(".ticketFixed").classList.add("active");
    document.querySelector("#selectedTicket").innerText = el.dataset.itemname;
    document.querySelector("#period").innerText = el.dataset.period;
    document.querySelector("#price").innerText =
      numberWithCommas(el.dataset.price) + "원";
  });
});

// 테라봇 은행 클릭시
document.querySelectorAll(".item.tera .flexArea .flexItem").forEach((el) => {
  el.addEventListener("click", function () {
    // 2023.12.11 수정
    if (el.dataset.loanSvc == "SCB") {
      // SC제일은행 이동 로직
      const form = document.querySelector("form");
      form.querySelector("#goodsSeqNo").value = "";
      form.querySelector("#goodsOptSeqNo").value = "";
      form.querySelector("#goodsTypCd").value = "";
      form.querySelector("#loanSvc").value = el.dataset.loanSvc;

      document.getElementById("form").submit();
    } else {
      let activeProfiles = el.dataset.activeProfiles;
      let url = el.dataset.url;

      if (activeProfiles != "prod") {
        url = el.dataset.devUrl;
      }

      window.open("", "popupView");

      let form = document.createElement("form"); // form 엘리멘트 생성
      form.setAttribute("method", "post"); // method 속성 설정
      form.setAttribute("action", url); // action 속성 설정
      document.body.appendChild(form); // 현재 페이지에 form 엘리멘트 추가

      let insert = document.createElement("input"); // input 엘리멘트 생성
      insert.setAttribute("type", "hidden"); // type 속성을 hidden으로 설정
      insert.setAttribute("name", "hidInfCd");
      insert.setAttribute("value", "sellerbot");
      form.appendChild(insert); // form 엘리멘트에 input 엘리멘트 추가
      form.target = "popupView";
      form.submit();
    }
  });
});

// 이용권 안내 팝업
document.querySelector("#ticketInfo").addEventListener("click", () => {
  let popupHtml = `
    <div class="head">
		<h5>셀러봇캐시 이용권 안내</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<p>셀러봇캐시 이용권 선택 시 무료체험 14일이 제공되며 체험종료 후 매월 자동 정기결제가 진행됩니다.</p>
		<p class="red">체험 종료 전 해지가 가능하며, 셀러봇캐시는 자동정기 결제가 되기 7일 전 고객님께 알림을 보내드리고 있는 점 참고해주세요.</p>
		<span class="line"></span>
		<p class="btmTxt">*해지 경로 : [ 셀러봇캐시 페이지 → 마이페이지 → 결제정보 → (이용권 우측) 해지 ]</p>
	</div>
    `;
  modalShow({
    id: "modal_01",
    content: popupHtml,
    function: () => {},
  });
});

// 아코디언 🎵
let acc = document.querySelectorAll(".accordion");
acc.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    let panel = el.querySelector(".panel");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

//화면에 보이면 숫자 올라가는 애니메이션
let ioCallback = (entries) => {
  entries.forEach((entry) => {
    let num = entry.target.dataset.number;
    let intersected = entry.target.dataset.intersected;
    if (entry.isIntersecting && intersected == "false") {
      entry.target.dataset.intersected = "true";
      if (entry.target.classList.contains("decimal")) {
        decimalCounterAnimate(entry.target, num);
      } else {
        counterAnimate(entry.target, num);
      }
    }
  });
};
let io = new IntersectionObserver(ioCallback);
let target = document.querySelectorAll(".serviceBanner h4");
target.forEach((el) => {
  io.observe(el);
});

const counter = ($counter, max) => {
  let now = max;

  const handle = setInterval(() => {
    // 아이폰에서 구동안되는 문제 때문에 추가
    $counter.innerHTML = numberWithCommas(Math.ceil(max - now).toString());

    // 목표수치에 도달하면 정지
    if (now < 1) {
      clearInterval(handle);
    }

    // 증가되는 값이 계속하여 작아짐
    const step = now / 10;

    // 값을 적용시키면서 다음 차례에 영향을 끼침
    now -= step;
  }, 10);
};

function counterAnimate(target, max) {
  setTimeout(() => counter(target, max), 0);
}

const decimalCounter = ($counter, max) => {
  let now = max;

  const handle = setInterval(() => {
    let str = Math.ceil(max - now).toString();
    str = str.slice(0, 1) + "." + str.slice(1);

    $counter.innerHTML = str + "<small>조원↑</small>";

    if (now < 1) {
      clearInterval(handle);
    }

    const step = now / 54;

    now -= step;
  }, 5);
};

function decimalCounterAnimate(target, max) {
  setTimeout(() => decimalCounter(target, max), 0);
}

// document.querySelector('#viewAllInOneTable').addEventListener('click', () => {
// 	let popupHtml = `
//     <div class="head">
// 		<h5>셀러봇캐시 이용권 안내</h5>
// 		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
// 	</div>
// 	<div class="body">
// 		<h5>1. 정산예정금 서비스 : 메가/기가/테라봇 이용권</h5>
// 		<p>(50개 이상의 판매몰의 정산예정금 조회, 판매분석, 동종업계 매출추이, 일일 리포팅 서비스를 제공합니다.)</p>
// 		<div class="tableWrap">
// 		<table>
// 			<thead>
// 				<tr>
// 					<td class="gray_1">구분</td>
// 					<td class="gray_1">메가봇</td>
// 					<td class="gray_1">기가봇</td>
// 					<td class="gray_1">테라봇(*금융사 고객 전용 이용권)</td>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td class="gray_1">판매몰 계좌</td>
// 					<td>5개 등록</td>
// 					<td>무제한 등록</td>
// 					<td>무제한 등록</td>
// 				</tr>
// 				<tr>
// 					<td class="gray_1">판매몰 ID</td>
// 					<td>5개 등록</td>
// 					<td>무제한 등록</td>
// 					<td>무제한 등록</td>
// 				</tr>
// 				<tr>
// 					<td class="gray_1">월 결제금액</td>
// 					<td>50,000원</td>
// 					<td>100,000원</td>
// 					<td>50,000원</td>
// 				</tr>
// 			</tbody>
// 		</table>
// 		</div>
// 		<h5>2. 자동입금 대사 서비스 : 뱅크봇 이용권</h5>
// 		<p>무통장으로 입금한 입금자명과 주문금액을 자동으로 비교하여, 실시간으로 입금 처리하는 서비스입니다. (입금확인 주기 5~10분)</p>
// 		<div class="tableWrap">
// 		<table>
// 			<thead>
// 				<tr>
// 					<td class="gray_1">구분</td>
// 					<td class="gray_1">1개월</td>
// 					<td class="gray_1">3개월</td>
// 					<td class="gray_1">6개월</td>
// 					<td class="gray_1">1년</td>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td class="gray_1">뱅크봇 1계좌</td>
// 					<td>5,000원</td>
// 					<td>15,000원</td>
// 					<td>30,000원</td>
// 					<td>60,000원</td>
// 				</tr>
// 				<tr>
// 					<td class="gray_1">뱅크봇 3계좌</td>
// 					<td>20,000원</td>
// 					<td>60,000원</td>
// 					<td>120,000원</td>
// 					<td>
// 						<i style="position:relative; font-style:normal; margin-right:10px;">
// 							<img src="./img/red_rightArrow_10x.svg" alt="dcArrow" style="width:54.3px; position:absolute; top:50%; left:0; transform:translateY(-50%);">
// 							240,000원
// 						</i>
// 						180,000원
// 					</td>
// 				</tr>
// 				<tr>
// 					<td class="gray_1">프리미엄 뱅크봇</td>
// 					<td>40,000원</td>
// 					<td>120,000원</td>
// 					<td>240,000원</td>
// 					<td>
// 						<i style="position:relative; font-style:normal; margin-right:10px;">
// 							<img src="./img/red_rightArrow_10x.svg" alt="dcArrow" style="width:54.3px; position:absolute; top:50%; left:0; transform:translateY(-50%);">
// 							480,000원
// 						</i>
// 						300,000원
// 					</td>
// 				</tr>
// 			</tbody>
// 		</table>
// 		</div>
// 		<h5>3. 정산예정금 + 자동입금 대사 서비스 : 패키지 이용권</h5>
// 		<p>정산예정금 서비스는 무제한 상품인 기가봇과 자동입금 대사 서비스인 뱅크봇을 모두 이용하실 수 있는 이용권입니다.</p>
// 		<div class="tableWrap">
// 		<table class="packageTable">
// 			<thead>
// 				<tr>
// 					<td class="gray_1">판매몰 ID / 계좌</td>
// 					<td class="gray_1">자동입금 계좌수</td>
// 					<td class="gray_1">월 결제금액</td>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				<tr>
// 					<td>무제한</td>
// 					<td>무제한</td>
// 					<td>99,000원</td>
// 				</tr>
// 			</tbody>
// 		</table>
// 		</div>
// 		<h5>*VAT 미포함 금액입니다.</h5>
// 		<p>*첫 결제수단 등록 및 14일 무료체험 종료 후 정기결제가 진행됩니다.</p>
// 	</div>
//     `;
// 	modalShow({
// 		id: 'modal_02',
// 		content: popupHtml,
// 		function: () => {},
// 	});
// });

document.querySelector("#noticeBtn").addEventListener("click", async () => {
  let popupHtml = `
	<div class="head">
		<h5>구매시 유의사항</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<table>
			<thead>
				<tr>
					<td class="gray_1">구분</td>
					<td class="gray_1">내용</td>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="gray_1" style="text-align: center;">무료체험</td>
					<td>
					<ul style="list-style:disc; padding-left:20px">
						<li style="list-style:inherit;">14일 무료체험 이후 가입시 등록한 자동이체 방법으로 이용요금을 결제합니다.</li>
						<li style="list-style:inherit;">셀러봇캐시는 무료체험 기간 종료 7일 전 고객님께 알림톡을 보내드립니다.
							- 무료 이용기간 내 해지 하시면, 유료 결제가 되지 않습니다.</li>
						<li style="list-style:inherit;">14일 무료 체험은 정산예정금 조회와 뱅크봇 서비스 이용 시 각각 1회만 제공되며, 중도 해지하여 환불 받으신 경우에는 다시 적용되지 않습니다.
							<br>※ 단, 한 번이라도 같은 서비스를 14일 무료체험을 한 경우 제외</li>
					</ul>
					</td>
				</tr>
				<tr>
					<td class="gray_1" style="text-align: center;">이용권 소개</td>
					<td>
						<b>[정산예정금 조회 서비스- 메가봇/기가봇/테라봇]</b>
						<div class="tableWrap">
						<table>
							<thead>
								<tr>
									<td class="gray_1">구분</td>
									<td class="gray_1">메가봇</td>
									<td class="gray_1">기가봇</td>
									<td class="gray_1">테라봇(금융사 고객전용)</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>판매몰 계좌 / ID 등록 수</td>
									<td>5개 등록</td>
									<td>무제한 등록</td>
									<td>무제한 등록</td>
								</tr>
								<tr>
									<td style="padding:6px 0 7px;">자동입금확인 서비스(뱅크봇)</td>
									<td>5개 계좌</td>
									<td>무제한 등록</td>
									<td>무제한 등록</td>
								</tr>
								<tr>
									<td>월 결제금액(VAT 별도)</td>
									<td>5만원</td>
									<td>10만원</td>
									<td>5만원</td>
								</tr>
								<tr>
									<td>서비스 내용</td>
									<td colspan="3" style="text-align: left;">
										정산예정금 조회 서비스<br>
										뱅크봇 자동입금 대사 서비스 포함
									</td>
								</tr>
							</tbody>
						</table>
						</div>
						<br>
						<p>셀러봇캐시의 요금제는 해당 대상과 데이터 제공량에 따라 구분됩니다.</p>
						<br>
						<p>*<b>메가봇</b>은 판매몰 계좌와 판매몰 ID를 각각 5개씩 등록 가능합니다.</p>
						<p>*<b>기가봇</b>은 판매몰 계좌와 판매몰 ID를 무제한으로 등록 가능합니다.</p>
						<p class="blue">*<b>테라봇</b>은 판매몰 계좌와 판매몰 ID를 무제한으로 등록 가능하며 KB국민은행, 신한은행, SC제일은행,키움저축은행 금융사 이용 고객을 위한 전용 요금제입니다.</p>
						<p>*해당 이용권은 제공 되는 내용은 기가봇 요금제와 동일하나 이용 요금은 메가봇 요금제로 적용됩니다.</p>
						<b style="margin-top: 40px; display: block;">자동입금 대사 서비스 [뱅크봇]</b>
						<div class="tableWrap">
						<table>
							<thead>
								<tr>
									<td class="gray_1">계좌수</td>
									<td class="gray_1">1개월</td>
									<td class="gray_1">1년</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1개</td>
									<td>5,000원</td>
									<td>60,000원</td>
								</tr>
								<tr>
									<td>3개</td>
									<td>20,000원</td>
									<td>180,000원</td>
								</tr>
								<tr>
									<td><b class="red">무제한</b></td>
									<td>40,000원</td>
									<td>300,000원</td>
								</tr>
								<tr>
									<td colspan="3" style="text-align:left; padding:20px;">
										<b class="red">*자동입금 대사 서비스에 한해 이용가능</b><br>
										*VAT 미포함 금액
									</td>
								</tr>
							</tbody>
						</table>
						</div>
						<br>
						<b>*자동입금 대사 서비스- 뱅크봇</b>은 무통장으로 입금한 입금자명과 주문금액을 자동으로 비교하여,<br>
						실시간으로 입금 처리하는 서비스입니다. (입금 확인 주기 5~10분 이내)<br>
						*셀러봇캐시에 주문/입금 확인-뱅크봇 계좌를 등록한 후부터 서비스 이용이 가능합니다.<br>
						*카페24회원 전용으로 제공되고 있습니다. (추후 확대될 예정)
						<br><br>
						<b>[뱅크봇 이용 시 유의사항]</b><br>
						*제휴사(카페24)의 ID를 연동해 놓아야 뱅크봇 이용권을 구매하실 수 있습니다. (제휴사와 셀러봇캐시 가입 사업자번호 미일치 시 일부 이용에 제한이 있을 수 있습니다.)<br>
						*계좌 등록 시 구체적인 거래내역(적요정보)이 조회되므로 보안·관리에 각별히 주의바랍니다.<br>
						*뱅크봇 요금제는 계좌수와 기간에 따라 요금이 달라집니다.<br>
						*뱅크봇 서비스만 결제 시 정산예정금 조회 서비스는 제공되지 않습니다.<br>
						*주문 취소, 중복주문 등의 사유로 입금 매칭이 잘못 될 수 있어 반드시 관리를 해주셔야 합니다.<br>
						*자동매칭이 된건은 취소,수정이 불가합니다.<br>
						<b class="red">*주문일로부터 7일 경과 후에 입금되는 경우, ‘자동입금 확인’이 되지 않으니 유의바랍니다.</b>
						<br>
						</div>
					</td>
				</tr>
				<tr>
					<td class="gray_1" style="text-align: center;">결제방식</td>
					<td>
						1. 신용카드를 등록해 놓으면 월 1회 정기결제가 진행됩니다.<br>
						<b class="red">2. 결제주기 (월 또는 연간)마다 최초 가입하신 일자에 정기결제가 발생합니다. 동일한 일자가 없는 달은 말일에 결제됩니다.</b><br>
						3. 모든 이용권은 부가가치세(10%)가 별도로 부과됩니다.<br>
						<br>
						<b>결제수단 등록 중 오류가 발생하시는 경우, 아래의 사항을 확인해주세요.</b><br>
						1) 개인/법인 구분이 잘 되었는지 확인을 해주세요.<br>
						-실물 카드의 겉면에 '성함'만 표시되어 있는 경우 '개인' 카드일 가능성이 높아요. 반대로 '성함+법인명' 또는 '법인명'만 표시되어 있는 경우에는 '법인'으로 등록해주세요.<br>
						2) 카드 정보와 명의자 정보가 제대로 입력되어있는지 확인해주세요.<br>
						- 카드번호나 비밀번호 등 카드 정보와 성함, 생년월일 등 명의자 정보가 일치하지 않는 경우 오류가 나타날 수 있어요.
					</td>
				</tr>
				<tr>
					<td class="gray_1" style="text-align: center;">환불안내</td>
					<td>
						*환불 수수료 10% 를 제외한 나머지 금액에서 일할 계산 후 환불해 드립니다.<br>
						*환불금액이 1만원 이하인 경우 환불 수수료는 천원 공제 후 환불해 드립니다.<br>
						<b class="red">*연간 단위의 상품은 1년의 가입을 유지하는 조건으로 할인 가격에 제공됩니다. 1년이 경과하기 전에 구독을 중도 해지하면 정상가(ex. 240,000원, 월 20,000원)를 기준으로 사용한 금액을 공제하고 환불됩니다.</b><br>
						*선불 결제한 서비스 이용요금 중 가입비는 환불금액에서 제외되며 회사가 무상으로 제공한 서비스 이용기간은 잔여기간에 포함하지 않습니다.<br>
						*정확한 환불금액이 궁금하시면 홈페이지 우측 하단에 있는 [1:1상담톡]으로 문의바랍니다.
					</td>
				</tr>
				<tr>
					<td class="gray_1" style="text-align: center;">이용권 변경</td>
					<td>
						이용권을 변경하시길 원하시면 마이페이지에서 변경이 가능합니다.<br>
						이용권은 즉시 변경되며, 변경된 이용권은 결제는 다음달 결제일에 진행됩니다.
					</td>
				</tr>
				<tr>
					<td class="gray_1" style="text-align: center;">해지</td>
					<td>
						*셀러봇캐시 이용권 선택 시 무료체험 14일이 제공되며 체험종료 후 매월 자동 정기결제가 진행됩니다.<br>
						<b class="red">*체험 종료 전 해지가 가능하며, 자동정기 결제되기 7일 전 알림톡을 보내드립니다.</b><br>
						*해지 경로 : [ 셀러봇캐시 페이지 → 마이페이지 → 결제정보 → (이용권 우측) 해지 ]
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	`;
  modalShow({
    id: "modal_03",
    content: popupHtml,
    function: () => {},
  });
});
