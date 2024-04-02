import createElement from "./import/createElement.js";
import modalShow from "./import/modalShow.js";
import { currDate, calcDate } from "./import/date.js";
import searchParam from "./import/searchParam.js";

if (searchParam("cafe24") == "N") {
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
    id: "modal_cafe24Alert",
    content: popupHtml,
    function: () => {
      document
        .querySelector("#modal_cafe24Alert #cancelModal")
        .addEventListener("click", () => {
          history.back();
        });
      document
        .querySelector("#modal_cafe24Alert #cafe24Go")
        .addEventListener("click", () => {
          location.href = "https://store.cafe24.com/kr/apps/5050";
        });
    },
  });
}

// 지원 은행 클릭시 팝업
document.querySelector("#supportingBank").addEventListener("click", () => {
  let url = "./registerAccount_01.html";
  window.open(url, "register_account", "width=551px, height=810px");
});

// 뱅크봇계좌+ 버튼 클릭시
document.querySelector("#addBankbotAcc").addEventListener("click", () => {
  let url = "./registerAccount_01.html";
  window.open(url, "register_account", "width=551px, height=810px");
});

document.querySelectorAll("ul#period li").forEach((el) => {
  el.addEventListener("click", function () {
    let periodFrom = document.querySelector("input#periodFrom");
    let periodTo = document.querySelector("input#periodTo");
    switch (this.value) {
      case 1:
        periodFrom.value = currDate();
        periodTo.value = currDate();
        break;

      case 3:
        periodFrom.value = calcDate("-", 2);
        periodTo.value = currDate();
        break;

      case 7:
        periodFrom.value = calcDate("-", 6);
        periodTo.value = currDate();
        break;

      case 30:
        periodFrom.value = calcDate("-", 29);
        periodTo.value = currDate();
        break;

      case 60:
        periodFrom.value = calcDate("-", 59);
        periodTo.value = currDate();
        break;

      case 90:
        periodFrom.value = calcDate("-", 89);
        periodTo.value = currDate();
        break;

      default:
        periodFrom.value = currDate();
        periodTo.value = currDate();
        break;
    }
  });
});

const inquiryData = await fetch("./json/inquiryList.json").then((res) =>
  res.json()
);
const tableTbody = document.querySelector(
  "#result .tableWrap table#resultTable tbody"
);
// m 은 모바일용
const tableTbody_m = document.querySelector(
  "#result .tableWrap table#resultTable_m tbody"
);
if (inquiryData) {
  for (let data of inquiryData) {
    let tr = createElement("tr");
    let tr_m1 = createElement("tr");
    let tr_m2 = createElement("tr");
    let tr_m3 = createElement("tr");
    let tr_m4 = createElement("tr");

    let order_key = ["주문일시", "주문번호", "은행", "주문자명", "주문금액"];
    let deposit_key = ["입금일시", "은행", "입금자명", "입금금액", "메모"];
    let state = data["현황/처리"];

    for (let key of order_key) {
      let td = createElement("td", {
        innerText: data["주문내역"][key],
      });
      tr.append(td);

      let tr_m1_td = createElement("td", {
        innerText: key,
        className: "gray_1",
      });
      tr_m1.append(tr_m1_td);
      let tr_m2_td = td.cloneNode(true);
      tr_m2.append(tr_m2_td);
    }
    for (let key of deposit_key) {
      let td = createElement("td");
      //입금내역이 있을경우만 생성
      if (data["입금내역"]) {
        if (key == "메모") {
          let memoBtn = createElement("button", {
            innerHTML: '<i class="fa-solid fa-plus"></i>',
            id: "memo",
          });
          if (data["입금내역"][key]) {
            memoBtn.classList.add("preview");
            memoBtn.innerHTML = data["입금내역"][key].slice(0, 2);
            memoBtn.dataset.memoContent = data["입금내역"][key];
          }
          td.append(memoBtn);
        } else {
          td.innerText = data["입금내역"][key];
        }
      }
      tr.append(td);

      let tr_m3_td = createElement("td", {
        innerText: key,
        className: "gray_2",
      });
      tr_m3.append(tr_m3_td);
      let tr_m4_td = td.cloneNode(true);
      tr_m4.append(tr_m4_td);
      tr_m4_td.style.borderBottom = "1px solid #abadb7";
    }
    let state_td = createElement("td", {
      innerText: state,
    });
    if (state == "자동확인") {
      let span = createElement("span", {
        className: "blue",
      });
      state_td.insertBefore(span, state_td.firstChild);
    } else if (state == "수동확인") {
      let span = createElement("span", {
        className: "green",
      });
      state_td.insertBefore(span, state_td.firstChild);
    } else if (state == "대사제외") {
      let span = createElement("span", {
        className: "gray",
      });
      state_td.insertBefore(span, state_td.firstChild);
    } else if (state == "미확인") {
      let unCheckedBtn = createElement("button", {
        id: "unCheckedBtn",
        innerText: "미확인",
      });
      state_td.innerHTML = "";
      state_td.append(unCheckedBtn);
      unCheckedBtn.addEventListener("click", unCheckedBtnClick);
    } else {
      // 현황이 없으면
      tr.querySelectorAll("td").forEach((el) => el.classList.add("gray_1"));
      state_td.classList.add("gray_1");
    }
    tr.append(state_td);
    tableTbody.append(tr);

    tr_m1.append(
      createElement("td", { innerText: "현황/처리", className: "gray_3" })
    );
    let state_td_m = state_td.cloneNode(true);
    state_td_m.setAttribute("rowspan", 3);
    state_td_m.style.borderBottom = "1px solid #abadb7";
    state_td_m
      .querySelector("#unCheckedBtn")
      ?.addEventListener("click", unCheckedBtnClick);
    tr_m2.append(state_td_m);
    tableTbody_m.append(tr_m1, tr_m2, tr_m3, tr_m4);

    function unCheckedBtnClick() {
      let popupHtml = `
			<div class="head">
				<h5>수동입금 입금 처리하기</h5>
				<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
			</div>
			<div class="body">
				<div class="top">
					<h4>선택한 내역</h4>
					<div class="flex">
						<div class="summary gridArea">
							<div class="title">주문</div>
							<div id="orderDate">${data["주문내역"]["주문일시"].split("/")[0] || ""}</div>
							<div id="orderAcc">${data["주문내역"]["은행"] || ""}(${
        data["주문내역"]["계좌번호"] || ""
      })</div>
							<div id="orderName">${data["주문내역"]["주문자명"] || ""}</div>
							<div id="orderAmount">${data["주문내역"]["주문금액"] || ""}</div>
							<div id="orderNumber">${data["주문내역"]["주문번호"] || ""}</div>
							<div>
								<button id="deleteSelectedOrder">
									<img src="./img/xmark.svg" alt="xmark">
								</button>
							</div>
							<div class="title">입금</div>
							<div id="depositDate">${data["입금내역"]["입금일시"].split("/")[0] || ""}</div>
							<div id="depositAcc">${data["입금내역"]["은행"] || ""}(${
        data["입금내역"]["계좌번호"] || ""
      })</div>
							<div id="depositName">${data["입금내역"]["입금자명"] || ""}</div>
							<div id="depositAmount">${data["입금내역"]["입금금액"] || ""}</div>
							<div id="depositNumber">-</div>
							<div>
								<button id="deleteSelectedDeposit">
									<img src="./img/xmark.svg" alt="xmark">
								</button>
							</div>
						</div>
						<button id="checkDeposit" disabled>입금확인</button>
					</div>
				</div>
				<div class="contents">
					<div class="flexItem">
						<h4>주문내역</h4>
						<div class="flexRow">
							<div class="item">
								<h5 class="title">판매몰</h5>
								<select>
									<option>카페24</option>
								</select>
							</div>
							<div class="item">
								<h5 class="title">판매몰</h5>
								<input type="text" placeholder="검색어"></input>
								<button>검색</button>
							</div>
						</div>
						<p><b class="blue">1. 주문내역 정보를 확인 후 입금내역과 일치하는 주문을 '선택'해주세요.</b></p>
						<p>※ 7일 이내 발생한 주문 중 입금 확인되지 않은 주문내역입니다.</p>
						<div class="tableTop">
							<h5>총 7건</h5>
							<button class="update" id="updateOrderList">
								<i class="fa-solid fa-rotate"></i>
								<p>업데이트하기 (<b id="orderUpdateTime">12-31 12:55</b>)</p>
							</button>
						</div>
						<div class="tableWrap" id="unCheckedOrderListTable" style="max-height: 235px;">
							<table>
								<thead>
									<tr>
										<td class="gray_1">선택</td>
										<td class="gray_1">주문번호</td>
										<td class="gray_1">은행</td>
										<td class="gray_1">주문자명</td>
										<td class="gray_1">주문금액</td>
										<td class="gray_1">삭제</td>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
					<div class="flexItem">
						<h4>입금내역</h4>
						<div class="rightFlex">
							<input type="text" placeholder="입금자명"></input>
							<button>검색</button>
						</div>
						<p><b class="blue">2. 주문내역에 맞는 입금내역을 '선택'하여 '입금확인'을 하면 수동으로 입금처리됩니다.</b></p>
						<p>※ 주문과 상관없는 입금내역은 "대사제외 하기" 시, 해당리스트에서 사라집니다.</p>
						<div class="tableTop">
							<h5>총 7건</h5>
							<button class="update" id="updateDepositList">
								<i class="fa-solid fa-rotate"></i>
								<p>업데이트하기 (<b id="depositUpdateTime">12-31 12:55</b>)</p>
							</button>
						</div>
						<div class="tableWrap" id="unCheckedDepositListTable" style="max-height: 157px;">
							<table>
								<thead>
									<tr>
										<td class="gray_1">선택</td>
										<td class="gray_1">입금일자</td>
										<td class="gray_1">은행</td>
										<td class="gray_1">입금자명</td>
										<td class="gray_1">입금금액</td>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
						<div class="rightBtn">
							<button id="excludeBtn">대사제외 하기</button>
						</div>
					</div>
				</div>
			</div>`;
      modalShow({
        id: "manualDeposit",
        content: popupHtml,
        function: async () => {
          document
            .querySelector("#manualDeposit #deleteSelectedOrder")
            .addEventListener("click", () => {
              // 선택된 주문내역 X 버튼 클릭
              document.querySelector("#manualDeposit #orderDate").innerText =
                "";
              document.querySelector("#manualDeposit #orderAcc").innerText = "";
              document.querySelector("#manualDeposit #orderName").innerText =
                "";
              document.querySelector("#manualDeposit #orderAmount").innerText =
                "";
              document.querySelector("#manualDeposit #orderNumber").innerText =
                "";
              document
                .querySelector(
                  "#manualDeposit #unCheckedOrderListTable tbody tr.active"
                )
                ?.classList.remove("active");

              document
                .querySelector("#checkDeposit")
                .setAttribute("disabled", true);
            });
          document
            .querySelector("#manualDeposit #deleteSelectedDeposit")
            .addEventListener("click", () => {
              // 선택된 입금내역 X 버튼 클릭
              document.querySelector("#manualDeposit #depositDate").innerText =
                "";
              document.querySelector("#manualDeposit #depositAcc").innerText =
                "";
              document.querySelector("#manualDeposit #depositName").innerText =
                "";
              document.querySelector(
                "#manualDeposit #depositAmount"
              ).innerText = "";
              document
                .querySelector(
                  "#manualDeposit #unCheckedDepositListTable tbody tr.active"
                )
                ?.classList.remove("active");
              document
                .querySelector("#checkDeposit")
                .setAttribute("disabled", true);
              document
                .querySelector("#excludeBtn")
                .setAttribute("disabled", true);
            });

          function nowTime() {
            // 현재 날짜와 시간을 가져옵니다.
            let now = new Date();

            // 월, 일, 시간, 분을 각각 두 자리 숫자로 맞추기 위해 함수를 정의합니다.
            function padTo2Digits(num) {
              return num.toString().padStart(2, "0");
            }

            // 월, 일, 시간, 분을 형식에 맞게 가져옵니다.
            let month = padTo2Digits(now.getMonth() + 1); // getMonth()는 0부터 시작하므로 1을 더합니다.
            let day = padTo2Digits(now.getDate());
            let hours = padTo2Digits(now.getHours());
            let minutes = padTo2Digits(now.getMinutes());

            // 형식에 맞게 문자열을 조합합니다.
            let formattedTime = month + "-" + day + " " + hours + ":" + minutes;

            return formattedTime;
          }

          document
            .querySelector("#updateOrderList")
            .addEventListener("click", function () {
              // 주문내역 업데이트 로직 여기에!
              this.classList.add("rotate");
              setTimeout(() => {
                this.classList.remove("rotate");
                this.querySelector("#orderUpdateTime").innerText = nowTime();
              }, 1000);
            });

          document
            .querySelector("#updateDepositList")
            .addEventListener("click", function () {
              // 입금내역 업데이트 로직 여기에!
              this.classList.add("rotate");
              setTimeout(() => {
                this.classList.remove("rotate");
                this.querySelector("#depositUpdateTime").innerText = nowTime();
              }, 1000);
            });

          let unCheckedOrderList = await fetch(
            "./json/unCheckedOrderList.json"
          ).then((res) => res.json());
          if (unCheckedOrderList) {
            for (let order of unCheckedOrderList["주문내역"]) {
              let tr = createElement("tr");
              tr.dataset.orderNum = order["주문번호"];
              tr.dataset.orderAcc = order["은행"] + " " + order["계좌번호"];
              tr.dataset.orderName = order["주문자명"];
              tr.dataset.orderAmount = order["주문금액"];
              let selectTd = createElement("td", {
                innerText: "선택",
              });
              let orderNum = createElement("td", {
                innerText: order["주문번호"],
              });
              let orderAcc = createElement("td", {
                innerHTML: order["은행"] + "<br>" + order["계좌번호"],
              });
              let orderName = createElement("td", {
                innerText: order["주문자명"],
              });
              let orderAmount = createElement("td", {
                innerText: order["주문금액"],
              });
              let delOrder = createElement("td", {
                className: "delOrder",
                innerText: "삭제",
              });
              tr.append(
                selectTd,
                orderNum,
                orderAcc,
                orderName,
                orderAmount,
                delOrder
              );
              document
                .querySelector("#manualDeposit #unCheckedOrderListTable tbody")
                .append(tr);
              tr.addEventListener("click", function (e) {
                if (!e.target.classList.contains("delOrder")) {
                  this.parentNode
                    .querySelectorAll("tr")
                    .forEach((el2) => el2.classList.remove("active"));
                  this.classList.add("active");
                  document.querySelector("#orderDate").innerText =
                    order["주문일시"].split("/")[0];
                  document.querySelector(
                    "#orderAcc"
                  ).innerText = `${order["은행"]}(${order["계좌번호"]})`;
                  document.querySelector("#orderName").innerText =
                    order["주문자명"];
                  document.querySelector("#orderAmount").innerText =
                    order["주문금액"];
                  document.querySelector("#orderNumber").innerText =
                    order["주문번호"] || "-";

                  if (
                    document.querySelector(
                      "#manualDeposit #unCheckedDepositListTable tbody tr.active"
                    )
                  ) {
                    document
                      .querySelector("#checkDeposit")
                      .removeAttribute("disabled");
                  }
                }
              });
              delOrder.addEventListener("click", () => {
                // 주문내역 삭제 버튼 클릭
                let delOrderHtml = `
								<div class="body">
									<h4>주문내역 삭제하기</h4>
									<h5>주문내역</h5>
									<table>
										<thead>
											<tr>
												<td>주문일자</td>
												<td>주문자명</td>
												<td>주문금액</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>${order["주문일시"]}</td>
												<td>${order["주문자명"]}</td>
												<td>${order["주문금액"]}</td>
											</tr>
										</tbody>
									</table>
									<p>삭제한 주문건은 다시 복귀되지 않습니다.<br>정말 삭제하시겠습니까?</p>
								</div>
								<div class="btnFlex">
									<button id="cancel">취소</button>
									<button class="blue" id="confirm">확인</button>
								</div>
							`;

                modalShow({
                  id: "delOrderPopup",
                  content: delOrderHtml,
                  function: () => {
                    document
                      .querySelector("#delOrderPopup #cancel")
                      .addEventListener("click", () => {
                        document.querySelector("#delOrderPopup").remove();
                      });
                    document
                      .querySelector("#delOrderPopup #confirm")
                      .addEventListener("click", () => {
                        //주문내역 삭제 로직 여기에
                        alert("주문내역 삭제 로직");
                      });
                  },
                });
              });
            }
          }
          let unCheckedDepositList = await fetch(
            "./json/unCheckedDepositList.json"
          ).then((res) => res.json());
          if (unCheckedDepositList) {
            for (let i = 0; i < unCheckedDepositList["입금내역"].length; i++) {
              let deposit = unCheckedDepositList["입금내역"][i];
              let tr = createElement("tr");
              tr.dataset.depositDate = deposit["입금일시"];
              tr.dataset.depositAcc =
                deposit["은행"] + " " + deposit["계좌번호"];
              tr.dataset.depositName = deposit["입금자명"];
              tr.dataset.depositAmount = deposit["입금금액"];
              let selectTd = createElement("td", {
                innerText: "선택",
              });
              let depositDate = createElement("td", {
                innerText: deposit["입금일시"],
              });
              let depositAcc = createElement("td", {
                innerHTML: deposit["은행"] + "<br>" + deposit["계좌번호"],
              });
              let depositName = createElement("td", {
                innerText: deposit["입금자명"],
              });
              let depositAmount = createElement("td", {
                innerText: deposit["입금금액"],
              });
              tr.append(
                selectTd,
                depositDate,
                depositAcc,
                depositName,
                depositAmount
              );
              document
                .querySelector(
                  "#manualDeposit #unCheckedDepositListTable tbody"
                )
                .append(tr);

              tr.addEventListener("click", function () {
                this.parentNode
                  .querySelectorAll("tr")
                  .forEach((el2) => el2.classList.remove("active"));
                this.classList.add("active");
                document.querySelector("#depositDate").innerText =
                  deposit["입금일시"].split("/")[0];
                document.querySelector(
                  "#depositAcc"
                ).innerText = `${deposit["은행"]}(${deposit["계좌번호"]})`;
                document.querySelector("#depositName").innerText =
                  deposit["입금자명"];
                document.querySelector("#depositAmount").innerText =
                  deposit["입금금액"];
                document.querySelector("#depositNumber").innerText =
                  deposit["주문번호"] || "-";

                document
                  .querySelector("#excludeBtn")
                  .removeAttribute("disabled");

                if (
                  document.querySelector(
                    "#manualDeposit #unCheckedOrderListTable tbody tr.active"
                  )
                ) {
                  document
                    .querySelector("#checkDeposit")
                    .removeAttribute("disabled");
                }
              });

              if (i == 0) {
                tr.click(); // 임시로 첫번째 입금내역 선택
                // 이후 해당하는 입금내역을 선택하도록 변경 필요
              }
            }
          }
          document
            .querySelector("#manualDeposit #checkDeposit")
            .addEventListener("click", () => {
              let checkDepositHtml = `
								<div class="body">
									<h4>수동입금 처리안내</h4>
									<h5>입금내역</h5>
									<table>
										<thead>
											<tr>
												<td>입금계좌번호</td>
												<td>입금자명</td>
												<td>입금금액</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													${
                            document
                              .querySelector(
                                "#unCheckedOrderListTable tr.active"
                              )
                              .dataset.orderAcc.split(" ")[0]
                          }
													<br>
													${
                            document
                              .querySelector(
                                "#unCheckedOrderListTable tr.active"
                              )
                              .dataset.orderAcc.split(" ")[1]
                          }
												</td>
												<td>${
                          document.querySelector(
                            "#unCheckedOrderListTable tr.active"
                          ).dataset.orderName
                        }</td>
												<td>${
                          document.querySelector(
                            "#unCheckedOrderListTable tr.active"
                          ).dataset.orderAmount
                        }</td>
											</tr>
										</tbody>
									</table>
									<h5>주문내역</h5>
									<table>
										<thead>
											<tr>
												<td>주문계좌번호</td>
												<td>주문자명</td>
												<td>주문금액</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													${
                            document
                              .querySelector(
                                "#unCheckedDepositListTable tr.active"
                              )
                              .dataset.depositAcc.split(" ")[0]
                          }
													<br>
													${
                            document
                              .querySelector(
                                "#unCheckedDepositListTable tr.active"
                              )
                              .dataset.depositAcc.split(" ")[1]
                          }
												</td>
												<td>${
                          document.querySelector(
                            "#unCheckedDepositListTable tr.active"
                          ).dataset.depositName
                        }</td>
												<td>${
                          document.querySelector(
                            "#unCheckedDepositListTable tr.active"
                          ).dataset.depositAmount
                        }</td>
											</tr>
											<tr>
												<td colspan="3">주문번호 : ${
                          document.querySelector(
                            "#unCheckedOrderListTable tr.active"
                          ).dataset.orderNum
                        }</td>
											</tr>
										</tbody>
									</table>
									<p>해당 거래건을 수동입금 처리하시겠습니까?<br><b class="red">수동입금이 처리된 건은 변경이 불가합니다.</b></p>
								</div>
								<div class="btnFlex">
									<button id="cancel">취소</button>
									<button class="blue" id="confirm">입금 처리하기</button>
								</div>
							`;

              modalShow({
                id: "manualDepositCheck",
                content: checkDepositHtml,
                function: () => {
                  document
                    .querySelector("#manualDepositCheck #cancel")
                    .addEventListener("click", () => {
                      document.querySelector("#manualDepositCheck").remove();
                    });

                  document
                    .querySelector("#manualDepositCheck #confirm")
                    .addEventListener("click", () => {
                      //수동입금 처리 로직 여기에
                      alert("수동입금 처리 로직");
                    });
                },
              });
            });
          document
            .querySelector("#manualDeposit #excludeBtn")
            .addEventListener("click", () => {
              let excludeHtml = `
								<div class="body">
									<h4>대사제외 처리안내</h4>
									<h5>입금내역</h5>
									<table>
										<thead>
											<tr>
												<td>입금일자</td>
												<td>입금자명</td>
												<td>입금금액</td>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>${
                          document.querySelector(
                            "#unCheckedDepositListTable tr.active"
                          ).dataset.depositDate
                        }</td>
												<td>${
                          document.querySelector(
                            "#unCheckedDepositListTable tr.active"
                          ).dataset.depositName
                        }</td>
												<td>${
                          document.querySelector(
                            "#unCheckedDepositListTable tr.active"
                          ).dataset.depositAmount
                        }</td>
											</tr>
										</tbody>
									</table>
									<p>해당 거래건을 대사제외 처리하시겠습니까?<br><b class="red">대사제외 처리된 입금건은 변경이 불가합니다.</b></p>
								</div>
								<div class="btnFlex">
									<button id="cancel">취소</button>
									<button class="blue" id="confirm">대사제외하기</button>
								</div>
							`;
              modalShow({
                id: "excludeDepositCheck",
                content: excludeHtml,
                function: () => {
                  document
                    .querySelector("#excludeDepositCheck #cancel")
                    .addEventListener("click", () => {
                      document.querySelector("#excludeDepositCheck").remove();
                    });

                  document
                    .querySelector("#excludeDepositCheck #confirm")
                    .addEventListener("click", () => {
                      //대사제외 처리 로직 여기에
                      alert("대사제외 처리 로직");
                    });
                },
              });
            });
        },
      });
    }
  }
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

let lastValidText = "";
function updateByteCount(textarea, byteText) {
  let text = textarea.value;
  let byteCount = calculateBytes(text);
  if (byteCount <= 50) {
    lastValidText = text;
    byteText.innerText = byteCount + "/50";
  } else {
    textarea.value = lastValidText;
  }
}

document.querySelectorAll("#memo").forEach((el) => {
  el.addEventListener("click", () => {
    if (document.querySelector("#memoPopup")) {
      document.querySelector("#memoPopup").cancelMemo();
      if (!document.querySelector("#cancelMemoPopup")) {
        memoFunction();
      } else {
        document
          .querySelector("#cancelYes")
          .addEventListener("click", memoFunction);
      }
    } else {
      memoFunction();
    }
    function memoFunction() {
      el.parentNode.style.position = "relative";
      let popup = createElement("div", {
        id: "memoPopup",
      });
      let topDiv = createElement("div", {
        className: "topDiv",
      });
      let cancelBtn = createElement("button", {
        id: "cancelMemo",
        innerText: "닫기",
      });
      let saveBtn = createElement("button", {
        id: "saveMemo",
        innerText: "저장",
      });
      topDiv.append(cancelBtn, saveBtn);
      let textArea = createElement("textarea", {
        id: "memoContent",
        value: el.dataset.memoContent || "",
        placeholder: "내용을 입력해주세요",
      });
      let byteText = createElement("span", {
        id: "byteText",
        innerText: "0/50",
      });
      popup.append(topDiv, textArea, byteText);
      el.parentNode.append(popup);
      textArea.addEventListener("input", () => {
        updateByteCount(textArea, byteText);
      });

      function cancelMemo() {
        if (textArea.value) {
          let cancelMemoPopup = createElement("div", {
            id: "cancelMemoPopup",
          });
          let p = createElement("p", {
            innerText: "메모 입력을 취소할까요?",
          });
          let bottomDiv = createElement("div", {
            className: "bottomDiv",
          });
          let noBtn = createElement("button", {
            id: "cancelNo",
            innerText: "[아니오]",
          });
          let yesBtn = createElement("button", {
            id: "cancelYes",
            innerText: "[네]",
          });
          bottomDiv.append(noBtn, yesBtn);
          noBtn.addEventListener("click", () => {
            cancelMemoPopup.remove();
          });
          yesBtn.addEventListener("click", () => {
            popup.remove();
          });
          cancelMemoPopup.append(p, bottomDiv);
          popup.append(cancelMemoPopup);
        } else {
          popup.remove();
        }
      }
      popup.cancelMemo = cancelMemo;
      cancelBtn.addEventListener("click", cancelMemo);
      saveBtn.addEventListener("click", () => {
        console.log(textArea.value); // 메모 내용
        // 메모를 저장하는 로직 여기에!
        popup.remove();
      });
    }
  });
});

document.querySelector("#printBtn").addEventListener("click", () => {
  function getBrowserName() {
    var userAgent = navigator.userAgent;
    var browserName;

    if (userAgent.match(/chrome|chromium|crios/i)) {
      browserName = "Chrome";
    } else if (userAgent.match(/firefox|fxios/i)) {
      browserName = "Firefox";
    } else if (userAgent.match(/safari/i)) {
      browserName = "Safari";
    } else if (userAgent.match(/opr\//i)) {
      browserName = "Opera";
    } else if (userAgent.match(/edg/i)) {
      browserName = "Edge";
    } else if (userAgent.match(/msie|trident/i)) {
      browserName = "Internet Explorer";
    } else {
      browserName = "Unknown";
    }

    return browserName;
  }
  let head = createElement("div", {
    className: "head",
  });
  let headH5 = createElement("h5", {
    innerText: `셀러봇캐시-${getBrowserName()}`,
  });
  let img = createElement("img", {
    src: "./img/sellerbotLogo.svg",
    alt: "sellerbot cash",
  });
  head.append(headH5, img);

  let body = createElement("div", {
    className: "body",
  });
  let bodyH5 = createElement("h5", {
    innerText: "뱅크봇 자동입금 대사 이용 현황",
  });
  let h5Small = createElement("small", {
    innerText: "23.08.09 15:45",
  });
  bodyH5.append(h5Small);
  let tableTop = createElement("div", {
    className: "tableTop",
  });
  let left = createElement("div");
  let 상호명 = "(주)온리원";
  let 조회기간 = "2023.08.01 ~ 2023.08.01";
  let 계좌정보 = "국민은행 8075******";
  let p1 = createElement("p", { innerText: `상호명: ${상호명}` });
  let p2 = createElement("p", { innerText: `조회기간: ${조회기간}` });
  let p3 = createElement("p", { innerText: `계좌정보: ${계좌정보}` });
  left.append(p1, p2, p3);
  let right = createElement("div");
  let printOptionBtn = createElement("button", {
    innerText: "출력 설정",
    id: "printOption",
  });
  right.append(printOptionBtn);
  tableTop.append(left, right);
  let tableContent = createElement("div", {
    className: "tableContent",
    innerHTML: document.querySelector("#resultTable").outerHTML,
  });
  body.append(bodyH5, tableTop, tableContent);

  modalShow({
    id: "modal_print",
    content: head.outerHTML + body.outerHTML,
    function: () => {
      let account = false;
      let orderNum = true;
      let memo = true;
      let nextTime = false;
      document.querySelector("#printOption").addEventListener("click", () => {
        let h5 = createElement("h5", {
          innerText: "출력설정",
        });
        let contents = createElement("div", {
          className: "contents",
        });

        let row_1 = createElement("div", {
          className: "row",
        });
        let p_1 = createElement("p", {
          innerText: "계좌정보",
        });
        let checkBoxWrap_1 = createElement("div", {
          className: "checkBoxWrap",
        });
        let acc_y = createElement("radio", {
          id: "account_y",
          innerText: "출력",
          name: "account_yn",
          value: "Y",
        });
        let acc_n = createElement("radio", {
          id: "account_n",
          innerText: "출력안함",
          name: "account_yn",
          value: "N",
        });
        checkBoxWrap_1.append(acc_y, acc_n);
        row_1.append(p_1, checkBoxWrap_1);

        let row_2 = createElement("div", {
          className: "row",
        });
        let p_2 = createElement("p", {
          innerText: "주문번호",
        });
        let checkBoxWrap_2 = createElement("div", {
          className: "checkBoxWrap",
        });
        let orderNum_y = createElement("radio", {
          id: "orderNum_y",
          innerText: "출력",
          name: "orderNum_yn",
          value: "Y",
        });
        let orderNum_n = createElement("radio", {
          id: "orderNum_n",
          innerText: "출력안함",
          name: "orderNum_yn",
          value: "N",
        });
        checkBoxWrap_2.append(orderNum_y, orderNum_n);
        row_2.append(p_2, checkBoxWrap_2);

        let row_3 = createElement("div", {
          className: "row",
        });
        let p_3 = createElement("p", {
          innerText: "메모",
        });
        let checkBoxWrap_3 = createElement("div", {
          className: "checkBoxWrap",
        });
        let memo_y = createElement("radio", {
          id: "memo_y",
          innerText: "출력",
          name: "memo_yn",
          checked: true,
          value: "Y",
        });
        let memo_n = createElement("radio", {
          id: "memo_n",
          innerText: "출력안함",
          name: "memo_yn",
          value: "N",
        });
        checkBoxWrap_3.append(memo_y, memo_n);
        row_3.append(p_3, checkBoxWrap_3);

        let bottomDiv = createElement("div", {
          className: "bottomDiv",
        });
        let nextTimeCheckBox = createElement("checkbox", {
          id: "nextTime",
          innerHTML: "다음에도 이 설정대로 인쇄하기",
        });
        nextTimeCheckBox.classList.add("square");
        bottomDiv.append(nextTimeCheckBox);

        let btnDiv = createElement("div", {
          className: "btnDiv",
        });
        let cancelBtn = createElement("button", {
          id: "printOptionCancel",
          innerText: "취소",
        });
        let confirmBtn = createElement("button", {
          id: "printOptionConfirm",
          innerText: "확인",
        });
        btnDiv.append(cancelBtn, confirmBtn);

        contents.append(row_1, row_2, row_3, bottomDiv);
        modalShow({
          id: "modal_printOption",
          content: h5.outerHTML + contents.outerHTML + btnDiv.outerHTML,
          function: () => {
            account
              ? document
                  .querySelector("#account_y")
                  .setAttribute("checked", true)
              : document
                  .querySelector("#account_n")
                  .setAttribute("checked", true);

            orderNum
              ? document
                  .querySelector("#orderNum_y")
                  .setAttribute("checked", true)
              : document
                  .querySelector("#orderNum_n")
                  .setAttribute("checked", true);

            memo
              ? document.querySelector("#memo_y").setAttribute("checked", true)
              : document.querySelector("#memo_n").setAttribute("checked", true);

            nextTime
              ? document
                  .querySelector("#nextTime")
                  .setAttribute("checked", true)
              : null;

            document
              .querySelector("#printOptionCancel")
              .addEventListener("click", () => {
                document.querySelector("#modal_printOption").remove();
              });
            document
              .querySelector("#printOptionConfirm")
              .addEventListener("click", () => {
                let 계좌정보 = document.querySelector(
                  'input[name="account_yn"][checked]'
                ).value;
                let 주문번호 = document.querySelector(
                  'input[name="orderNum_yn"][checked]'
                ).value;
                let 메모 = document.querySelector(
                  'input[name="memo_yn"][checked]'
                ).value;
                let 설정저장 = document.querySelector("#nextTime").checked
                  ? "Y"
                  : "N";
                console.log(계좌정보, 주문번호, 메모, 설정저장);
                // 여기에 출력 설정 옵션 로직
                document.querySelector("#modal_printOption").remove();
              });
          },
        });
      });
    },
  });
});
