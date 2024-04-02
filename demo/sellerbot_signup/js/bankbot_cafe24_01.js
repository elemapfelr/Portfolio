import modalShow from "./import/modalShow.js";

// 아코디언 🎵
let acc = document.querySelectorAll(".accordion");
acc.forEach((el) => {
  el.querySelector(".title span").addEventListener("click", () => {
    el.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    let panel = el.querySelector(".panel");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      if (panel.scrollHeight < 300) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = "300px";
      }
    }
  });
});

// 약관 텍스트 클릭 시 체크박스 클릭됨
document.querySelectorAll(".text_checkBox").forEach((el) => {
  el.addEventListener("click", () => {
    el.parentNode.querySelector("input.chkBox").click();
  });
});

document.querySelector("#confirm").addEventListener("click", () => {
  if (!document.querySelector("#cp_name").value) {
    document.querySelector("#cp_name").focus();
    return false;
  }
  if (!document.querySelector("#owner_name").value) {
    document.querySelector("#owner_name").focus();
    return false;
  }
  if (!document.querySelector("#cp_num").value) {
    document.querySelector("#cp_num").focus();
    return false;
  }
  if (!document.querySelector("#email").value) {
    document.querySelector("#email").focus();
    return false;
  }
  if (!document.querySelector("#phone").value) {
    document.querySelector("#phone").focus();
    return false;
  }
  if (!document.querySelector("#terms_01").checked) {
    alert("필수 약관에 동의해주세요");
    document.querySelector("#terms_01").focus();
    return false;
  }
  if (!document.querySelector("#terms_02").checked) {
    alert("필수 약관에 동의해주세요");
    document.querySelector("#terms_02").focus();
    return false;
  }
  if (!document.querySelector("#confirm").getAttribute("disabled")) {
    modalShow({
      id: "confirmed",
      content: `
		<h1>온리원01님<br>회원가입을 축하드립니다.</h1>
		<p>카페24 뿐만 아니라, 셀러봇캐시 웹사이트를<br>통해서도 서비스 이용이 가능합니다.</p>
		<span class="line"></span>
		<u>아이디 : 이메일 주소</u>
		<u>비밀번호 : 이메일 주소로 비밀번호 발송</u>`,
      btns: [
        {
          text: "확인",
          callback: () => {
            // location.href = "./bankbot_cafe24_03.html";
            location.href =
              "./regPay_01.html?subscribing=null&cafe24=Y&bankbotSelect=Y#bankbot";
          },
        },
      ],
      function: () => {
        document.querySelector("#confirmed .btnBox button").focus();
      },
    });
  }
});

// 다음 버튼 활성화용 플래그
let flagObj = {
  terms1Flag: false,
  terms2Flag: false,
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

// 필수 약관 체크
document.querySelector("#terms_01").addEventListener("change", function () {
  if (this.checked) {
    flagChecker("terms1Flag", true);
  } else {
    flagChecker("terms1Flag", false);
  }
});

document.querySelector("#terms_02").addEventListener("change", function () {
  if (this.checked) {
    flagChecker("terms2Flag", true);
  } else {
    flagChecker("terms2Flag", false);
  }
});

// 숫자만 입력 가능 🔢
document.querySelectorAll(".onlyNumber").forEach((el) => {
  el.addEventListener("input", () => {
    el.value = el.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  });
});
