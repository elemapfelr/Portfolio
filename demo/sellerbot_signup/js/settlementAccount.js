import createElement from "./import/createElement.js";

//정산계좌 목록 테이블 만들기
const settlementAccData = await fetch("./json/settlementAccounts.json").then(
  (res) => res.json()
);
const tableTbody = document.querySelector(
  "#settlementAccList .tableWrap table tbody"
);
if (settlementAccData) {
  for (let data of settlementAccData) {
    let keys = [
      "상태",
      "은행명",
      "뱅크봇 계좌",
      "계좌번호",
      "계좌잔액",
      "최종가입일",
      "정산몰",
      "기능",
    ];
    let tr = createElement("tr");
    for (let key of keys) {
      let td = createElement("td");
      if (key == "상태") {
        let span = createElement("span");
        if (data[key] == "정상") span.classList.add("blue");
        else if (data[key] == "계좌 조회 중") span.classList.add("yellow");
        else if (data[key] == "인증정보 오류") span.classList.add("red");
        else if (data[key] == "관리자 문의 필요") span.classList.add("gray");
        td.append(span);
      } else if (key == "뱅크봇 계좌" || key == "정산몰") {
        if (data[key].length > 2) {
          let othersLength = data[key].length - 1;
          td.innerHTML = `${data[key][0]} 외 <b>${othersLength}개</b>`;
        } else if (data[key].length == 2) {
          td.innerText = `${data[key][0]}, ${data[key][1]}`;
        } else {
          td.innerText = data[key][0] ?? "";
        }
      } else if (key == "기능") {
        let select = createElement("select");
        let options = ["선택"];
        for (let option of options) {
          let optHtml = createElement("option", {
            innerText: option,
            value: option,
          });
          select.append(optHtml);
        }
        td.append(select);
      } else {
        td.innerText = data[key];
      }
      if (key == "은행명" || key == "뱅크봇 계좌") {
        td.style.textAlign = "left";
      }
      tr.append(td);
      tableTbody.append(tr);
    }
  }
}

// 계좌등록 버튼 클릭시
document.querySelector("#addAccount").addEventListener("click", () => {
  let url = "./registerAccount_01.html";
  window.open(url, "register_account", "width=551px, height=810px");
});
