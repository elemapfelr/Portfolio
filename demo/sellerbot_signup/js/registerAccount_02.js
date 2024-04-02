import createElement from "./import/createElement.js";
import modalShow from "./import/modalShow.js";

let selectedBank = new URL(location.href).searchParams.get("bank");
document.querySelector("#selectedBank").innerText = selectedBank;

document.querySelectorAll("#businessAcc li").forEach((el, idx, arg) => {
  el.addEventListener("click", () => {
    arg.forEach((el2) => el2.classList.remove("active"));
    el.classList.add("active");
    flagChecker("businessAcc", true);
    if (el.dataset.bizyn == "Y") {
      document.querySelector("#businessNumTitle").innerText = "사업자 번호";
      document
        .querySelector("#businessNum")
        .setAttribute("placeholder", "사업자 번호 10자리만 입력");
    } else {
      document.querySelector("#businessNumTitle").innerText = "생년월일 6자리";
      document
        .querySelector("#businessNum")
        .setAttribute("placeholder", "생년월일(주민번호 앞) 6자리 입력");
    }
  });
});

document.querySelectorAll("#bankbotAcc li").forEach((el, idx, arg) => {
  el.addEventListener("click", () => {
    // arg.forEach((el2) => el2.classList.remove('active'));
    el.classList.toggle("active");
  });
});

document.querySelector("#prev").addEventListener("click", () => {
  location.href = "./registerAccount_01.html";
});

// 숫자만 입력 가능 🔢
document.querySelectorAll(".onlyNumber").forEach((el) => {
  el.addEventListener("input", () => {
    el.value = el.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  });
});

// 다음 버튼 활성화용 플래그
let flagObj = {
  accOwner: false,
  accNum: false,
  accPw: false,
  businessAcc: false,
  businessNum: false,
};
function flagChecker(flag, bool) {
  flagObj[flag] = bool;

  let notChecked = Object.keys(flagObj).find((key) => flagObj[key] === false);

  if (!notChecked) {
    document.querySelector("#confirm").removeAttribute("disabled");
  } else {
    document.querySelector("#confirm").setAttribute("disabled", true);
  }
}

document.querySelectorAll(".contents .row input").forEach((el) => {
  if (el.getAttribute("id") !== "accNickname") {
    el.addEventListener("input", function () {
      if (this.value) {
        flagChecker(el.getAttribute("id"), true);
      } else {
        flagChecker(el.getAttribute("id"), false);
      }
    });
  }
});

document.querySelector("#confirm").addEventListener("click", () => {
  // 계좌 등록 로직 여기에
  alert(
    "고객님은 [뱅크봇-자동입금 대사서비스-3계좌] 이용 회원으로 뱅크봇 계좌는 3개까지 등록하실 수 있습니다.\n(프리미엄 이용 시 무제한 이용)"
  );
});
