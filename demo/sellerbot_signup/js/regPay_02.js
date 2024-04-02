import numberWithCommas from "./import/numberWithCommas.js";
import createElement from "./import/createElement.js";
import modalShow from "./import/modalShow.js";
import searchParam from "./import/searchParam.js";

document.querySelector("#nextStep").addEventListener("click", () => {
  location.href = "./regPay_03.html";
});

let tickets = [
  {
    ticketName: "메가봇",
    price: 50000,
    payInterval: "월",
    bankbot: "자동입금 대사계좌 5개 등록",
    textRows: [
      "판매몰 계좌 : 5개 등록",
      "판매몰 ID : 5개 등록",
      "뱅크봇 계좌 : 5계좌 이용가능",
      "제공서비스 : 일자별 상세 정산내역, 판매 통계 분석 및 그래프, 자동입금대사 서비스(뱅크봇) 제공",
      "리포팅 서비스 : 매영업일 정산예정금 알림톡 리포트 발송",
    ],
  },
  {
    ticketName: "기가봇",
    price: 100000,
    payInterval: "월",
    bankbot: "자동입금 대사계좌 무제한 등록",
    textRows: [
      "판매몰 계좌 : 무제한 등록",
      "판매몰 ID : 무제한 등록",
      "뱅크봇 계좌 : 무제한 등록",
      "제공서비스 : 일자별 상세 정산내역, 판매 통계 분석 및 그래프, 자동입금대사 서비스(뱅크봇) 제공",
      "리포팅 서비스 : 매영업일 정산예정금 알림톡 리포트 발송",
    ],
  },
  {
    ticketName: "테라봇",
    price: 50000,
    payInterval: "월",
    bankbot: "자동입금 대사계좌 무제한 등록",
    textRows: [
      "판매몰 계좌 : 무제한 등록",
      "판매몰 ID : 무제한 등록",
      "뱅크봇 계좌 : 무제한 등록",
      "제공서비스 : 일자별 상세 정산내역, 판매 통계 분석 및 그래프, 자동입금대사 서비스(뱅크봇) 제공",
      "리포팅 서비스 : 매영업일 정산예정금 알림톡 리포트 발송",
    ],
  },
  {
    ticketName: "뱅크봇 1계좌 1개월",
    price: 5000,
    payInterval: "월",
    bankbot: "자동입금 대사계좌 1개 등록",
    textRows: [
      "계좌등록 : 1개 등록",
      "입금주기 : 5~10분 주기 조회",
      "지원은행 : 20개 이상",
      "제공 서비스 : 주문과 입금 내역 자동 대사 실행, 은행별, 날짜별 자동대사 현황 조회, 엑셀 다운로드, 월별통계내역 제공",
      "알림톡 서비스 : 매영업일 자동대사 계좌현황 발송",
    ],
  },
  {
    ticketName: "뱅크봇 3계좌 1개월",
    price: 20000,
    payInterval: "월",
    bankbot: "자동입금 대사계좌 3개 등록",
    textRows: [
      "계좌등록 : 3개 등록",
      "입금주기 : 5~10분 주기 조회",
      "지원은행 : 20개 이상",
      "제공 서비스 : 주문과 입금 내역 자동 대사 실행, 은행별, 날짜별 자동대사 현황 조회, 엑셀 다운로드, 월별통계내역 제공",
      "알림톡 서비스 : 매영업일 자동대사 계좌현황 발송",
    ],
  },
  {
    ticketName: "뱅크봇 무제한계좌 1개월",
    price: 40000,
    payInterval: "월",
    bankbot: "자동입금 대사계좌 무제한 등록",
    textRows: [
      "계좌등록 : 무제한 등록",
      "입금주기 : 5~10분 주기 조회",
      "지원은행 : 20개 이상",
      "제공 서비스 : 주문과 입금 내역 자동 대사 실행, 은행별, 날짜별 자동대사 현황 조회, 엑셀 다운로드, 월별통계내역 제공",
      "알림톡 서비스 : 매영업일 자동대사 계좌현황 발송",
    ],
  },
  {
    ticketName: "뱅크봇 1계좌 1년",
    price: 60000,
    payInterval: "연간",
    bankbot: "자동입금 대사계좌 1개 등록",
    textRows: [
      "계좌등록 : 1개 등록",
      "입금주기 : 5~10분 주기 조회",
      "지원은행 : 20개 이상",
      "제공 서비스 : 주문과 입금 내역 자동 대사 실행, 은행별, 날짜별 자동대사 현황 조회, 엑셀 다운로드, 월별통계내역 제공",
      "알림톡 서비스 : 매영업일 자동대사 계좌현황 발송",
    ],
  },
  {
    ticketName: "뱅크봇 3계좌 1년",
    price: 180000,
    payInterval: "연간",
    bankbot: "자동입금 대사계좌 3개 등록",
    textRows: [
      "계좌등록 : 3개 등록",
      "입금주기 : 5~10분 주기 조회",
      "지원은행 : 20개 이상",
      "제공 서비스 : 주문과 입금 내역 자동 대사 실행, 은행별, 날짜별 자동대사 현황 조회, 엑셀 다운로드, 월별통계내역 제공",
      "알림톡 서비스 : 매영업일 자동대사 계좌현황 발송",
    ],
  },
  {
    ticketName: "뱅크봇 무제한계좌 1년",
    price: 300000,
    payInterval: "연간",
    bankbot: "자동입금 대사계좌 무제한 등록",
    textRows: [
      "계좌등록 : 무제한 등록",
      "입금주기 : 5~10분 주기 조회",
      "지원은행 : 20개 이상",
      "제공 서비스 : 주문과 입금 내역 자동 대사 실행, 은행별, 날짜별 자동대사 현황 조회, 엑셀 다운로드, 월별통계내역 제공",
      "알림톡 서비스 : 매영업일 자동대사 계좌현황 발송",
    ],
  },
];

let galleryDesc = [
  {
    title: "정산예정금 조회",
    imgUrl: "./img/step_06_img_01.png",
  },
  {
    title: "판매 분석",
    imgUrl: "./img/step_06_img_02.png",
  },
  {
    title: "리포팅 서비스",
    imgUrl: "./img/step_06_img_03.png",
  },
  {
    title: "자동 대사 목록",
    imgUrl: "./img/step_06_img_04.png",
  },
  {
    title: "월별 통계내역",
    imgUrl: "./img/step_06_img_05.png",
  },
  {
    title: "알림톡 서비스",
    imgUrl: "./img/step_06_img_06.png",
  },
];

// 이용권 수에 따라서 롤링 배너 (티켓 선택창) 너비 조절
document.querySelector("#payInfo .ticket_gallery ul").style.width =
  tickets.length * 100 + "%";

function ticketMaker() {
  document.querySelector("#payInfo .ticket_gallery ul").append(
    ...tickets.map((v) => {
      let li = createElement("li", { className: "items" });
      let center = createElement("div", { className: "center" });
      let h5 = createElement("h5", { innerText: v.ticketName });
      let flex = createElement("div", { className: "flex" });
      let mid = createElement("div", { className: "mid" });
      let h4 = createElement("h4", {
        innerText: `${v.payInterval} ${numberWithCommas(v.price)} 원`,
      });
      let small = createElement("small", { innerText: "(VAT 별도)" });
      let span = createElement("span", {
        innerText: "무료체험 14일 이후 정기결제",
      });
      mid.append(h4, small);
      flex.append(mid);
      center.append(h5, flex, span);
      let bottom = createElement("div", { className: "bottom" });
      bottom.append(
        ...v.textRows.map((text) => {
          let row = createElement("div", { className: "row" });
          let check = createElement("span", { className: "check" });
          let p = createElement("p", { innerText: text });
          row.append(check, p);
          return row;
        })
      );
      li.append(center, bottom);
      // li width 동적으로 조절
      li.style.width = 100 / tickets.length + "%";
      return li;
    })
  );
}
ticketMaker();

// 이용권 좌 우 클릭
function ticketSelect() {
  let index = 0;
  let galleryItem = document.querySelectorAll(".ticket_gallery ul li");

  function ticketSelectCallback(index) {
    document.querySelector(".ticket_gallery ul ").style.left =
      index * -100 + "%";

    document.querySelector("#totalPrice").innerHTML =
      numberWithCommas(tickets[index]["price"]) + "원";
    document.querySelector("#ticketName").innerHTML =
      tickets[index]["ticketName"];
    document.querySelector("#bankBotName").innerHTML =
      tickets[index]["bankbot"];

    // 뱅크봇이면 우측 롤링배너 3개로 변경
    if (tickets[index]["ticketName"].includes("뱅크봇")) {
      let galleryDescCopy = galleryDesc.slice(3);
      galleryMaker(galleryDescCopy);
      slideGallery(galleryDescCopy);
      document.querySelector(".gallery ul").style.left = "0%";
      document.querySelector("#payInfo .right .bottomText h5").innerText =
        galleryDescCopy[0]["title"];
    } else {
      galleryMaker(galleryDesc);
      slideGallery(galleryDesc);
      document.querySelector(".gallery ul").style.left = "0%";
      document.querySelector("#payInfo .right .bottomText h5").innerText =
        galleryDesc[0]["title"];
    }
  }

  if (document.querySelector("#prevTicket").clickHandler) {
    document
      .querySelector("#prevTicket")
      .removeEventListener(
        "click",
        document.querySelector("#prevTicket").clickHandler
      );
  }
  document.querySelector("#prevTicket").clickHandler = () => {
    index - 1 < 0 ? (index = galleryItem.length - 1) : index--;
    ticketSelectCallback(index);
  };
  document
    .querySelector("#prevTicket")
    .addEventListener(
      "click",
      document.querySelector("#prevTicket").clickHandler
    );

  if (document.querySelector("#nextTicket").clickHandler) {
    document
      .querySelector("#nextTicket")
      .removeEventListener(
        "click",
        document.querySelector("#nextTicket").clickHandler
      );
  }
  document.querySelector("#nextTicket").clickHandler = () => {
    index + 1 > galleryItem.length - 1 ? (index = 0) : index++;
    ticketSelectCallback(index);
  };
  document
    .querySelector("#nextTicket")
    .addEventListener(
      "click",
      document.querySelector("#nextTicket").clickHandler
    );
}
ticketSelect();

function galleryMaker(galleryDesc) {
  // 배너 수에 따라서 롤링 배너 너비 조절
  document.querySelector("#payInfo .right .gallery ul").style.width =
    galleryDesc.length * 100 + "%";
  document.querySelector("#payInfo .right .gallery ul").innerHTML = "";
  document.querySelector("#payInfo .right .gallery ul").append(
    ...galleryDesc.map((v) => {
      let li = createElement("li");
      li.style.background = `center / contain no-repeat url(${v.imgUrl})`;
      // li width 동적으로 조절
      li.style.width = 100 / galleryDesc.length + "%";
      return li;
    })
  );
  document.querySelector("#payInfo .right ul.bottomUl").innerHTML = "";
  document.querySelector("#payInfo .right ul.bottomUl").append(
    ...galleryDesc.map((v, idx) => {
      let li = createElement("li");
      if (idx == 0) {
        li.classList.add("active");
      }
      return li;
    })
  );
}
galleryMaker(galleryDesc);

// 갤러리 좌 우 클릭
function slideGallery(galleryDesc) {
  let index = 0;
  let galleryItem = document.querySelectorAll(".gallery ul li");

  function slideGalleryCallback(index) {
    document.querySelector(".gallery ul").style.left = index * -100 + "%";
    document
      .querySelectorAll("ul.bottomUl li")
      .forEach((el) => el.classList.remove("active"));
    document.querySelectorAll("ul.bottomUl li")[index].classList.add("active");
    document.querySelector("#payInfo .right .bottomText h5").innerText =
      galleryDesc[index]["title"];
  }

  if (document.querySelector("#galleryLeft").clickHandler) {
    document
      .querySelector("#galleryLeft")
      .removeEventListener(
        "click",
        document.querySelector("#galleryLeft").clickHandler
      );
  }
  document.querySelector("#galleryLeft").clickHandler = () => {
    index - 1 < 0 ? (index = galleryItem.length - 1) : index--;
    slideGalleryCallback(index);
  };
  document
    .querySelector("#galleryLeft")
    .addEventListener(
      "click",
      document.querySelector("#galleryLeft").clickHandler
    );

  if (document.querySelector("#galleryRight").clickHandler) {
    document
      .querySelector("#galleryRight")
      .removeEventListener(
        "click",
        document.querySelector("#galleryRight").clickHandler
      );
  }
  document.querySelector("#galleryRight").clickHandler = () => {
    index + 1 > galleryItem.length - 1 ? (index = 0) : index++;
    slideGalleryCallback(index);
  };
  document
    .querySelector("#galleryRight")
    .addEventListener(
      "click",
      document.querySelector("#galleryRight").clickHandler
    );
}
slideGallery(galleryDesc);

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
      if (panel.scrollHeight < 200) {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } else {
        panel.style.maxHeight = "200px";
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

// 약관 동의 시 결제수단 활성화
document.querySelector("#terms_01").addEventListener("change", () => {
  if (document.querySelector("#terms_01").checked) {
    document.querySelector("#creditCard").classList.add("active");
    document.querySelector(".fixed").classList.add("active");
    document.querySelector("#terms_01_1").checked = true;
  } else {
    document.querySelector("#creditCard").classList.remove("active");
    document.querySelector(".fixed").classList.remove("active");
    document.querySelector("#terms_01_1").checked = false;
  }
});

// 모바일 한정 bottomSticky 클릭시 약관 체크박스 클릭
document.querySelector("#terms_01_1").addEventListener("change", () => {
  if (document.querySelector("#terms_01_1").checked) {
    document.querySelector("#terms_01").checked == false
      ? document.querySelector("#terms_01").click()
      : null;
  } else {
    document.querySelector("#terms_01").checked == true
      ? document.querySelector("#terms_01").click()
      : null;
  }
});
// bottomSticky 자세히보기 클릭
document.querySelector(".bottomSticky span").addEventListener("click", () => {
  let offsetY = document.querySelector("#terms").offsetTop;
  scrollTo({ top: offsetY, behavior: "smooth" });
  document.querySelector("#terms .accordion").classList.contains("active")
    ? null
    : document.querySelector("#terms .accordion span").click();
});

//화면에 약관동의 나오면 bottomSticky 숨김
let ioCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      document.querySelector(".bottomSticky").classList.add("hide");
    } else {
      document.querySelector(".bottomSticky").classList.remove("hide");
    }
  });
};
let io = new IntersectionObserver(ioCallback);
let target = document.querySelectorAll("#terms");
target.forEach((el) => {
  io.observe(el);
});

//결제수단 등록 완료 시
document.querySelector("#creditCard").addEventListener("click", () => {
  location.href = "./regPay_03.html";
});

// 유료 결제 약관
fetch("./txt/pay_term.txt")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("#termContent").innerHTML = data;
  });

// 금융사전용 결제수단 선택 시
function terabotAlert() {
  let popupHtml = `
    <div class="head">
        <h5>무료체험 안내 (결제수단 등록 안내)</h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <h4>금융사 전용 고객이시군요!</h4>
        <h4>선택한 이용권은 '테라봇'입니다.</h4>
		<span class="line"></span>
		<div class="row">
		<span class="check"></span>
		<p>가입을 위해서는 결제수단 등록이 필수이며, <br>결제수단 등록 시 무료체험 14일이 제공됩니다.</p>
		</div>
		<br>
		<div class="row">
		<span class="check"></span>
		<p>체험 종료 후 매월 자동 정기결제가 되며, <br>해지는 언제든지 가능합니다.</p>
		</div>
        <div class="btnFlex">
            <button class="blue" id="modalConfirm">확인</button>
        </div>
    </div>
    `;
  modalShow({
    id: "modal_terabot",
    content: popupHtml,
    function: () => {
      const closeModal = () => {
        document.querySelector("#modal_terabot").remove();
        document.querySelector("body").style.overflow = "";
      };

      document
        .querySelector("#modal_terabot #modalConfirm")
        .addEventListener("click", closeModal);
    },
  });
}

switch (searchParam("subscribe")) {
  case "메가봇":
    while (document.querySelector("#ticketName").innerHTML !== "메가봇") {
      document.querySelector("#nextTicket").click();
    }
    break;

  case "기가봇":
    while (document.querySelector("#ticketName").innerHTML !== "기가봇") {
      document.querySelector("#nextTicket").click();
    }
    break;

  case "테라봇":
    terabotAlert();
    while (document.querySelector("#ticketName").innerHTML !== "테라봇") {
      document.querySelector("#nextTicket").click();
    }
    break;

  case "뱅크봇 1계좌":
    if (searchParam("period") == "1개월") {
      while (
        document.querySelector("#ticketName").innerHTML !== "뱅크봇 1계좌 1개월"
      ) {
        document.querySelector("#nextTicket").click();
      }
    } else {
      while (
        document.querySelector("#ticketName").innerHTML !== "뱅크봇 1계좌 1년"
      ) {
        document.querySelector("#nextTicket").click();
      }
    }
    break;

  case "뱅크봇 3계좌":
    if (searchParam("period") == "1개월") {
      while (
        document.querySelector("#ticketName").innerHTML !== "뱅크봇 3계좌 1개월"
      ) {
        document.querySelector("#nextTicket").click();
      }
    } else {
      while (
        document.querySelector("#ticketName").innerHTML !== "뱅크봇 3계좌 1년"
      ) {
        document.querySelector("#nextTicket").click();
      }
    }
    break;

  case "프리미엄 뱅크봇":
    if (searchParam("period") == "1개월") {
      while (
        document.querySelector("#ticketName").innerHTML !==
        "뱅크봇 무제한계좌 1개월"
      ) {
        document.querySelector("#nextTicket").click();
      }
    } else {
      while (
        document.querySelector("#ticketName").innerHTML !==
        "뱅크봇 무제한계좌 1년"
      ) {
        document.querySelector("#nextTicket").click();
      }
    }
    break;

  default:
    break;
}

// 무료체험지급안내팝업
function freeTicketPopup() {
  let popupHtml = `
    <div class="head">
        <h5>셀러봇캐시 이용권 무료체험지급 안내</h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>셀러봇캐시의 회원이 되어주신 셀러님께 감사의 의미로 테라봇 무료체험 14일을 제공해드립니다</p>
		<p class="red">체험종료 후 결제를 원하시는 경우 아래의 경로를 이용해주세요.</p>
		<span class="line"></span>
		<p>*결제 경로 : [셀러봇캐시 → 이용요금 안내 → 셀러봇캐시 정기구독]</p>
        <div class="btnFlex">
            <button class="blue" id="modalConfirm">대시보드 이동</button>
        </div>
    </div>
    `;
  modalShow({
    id: "modal_free",
    content: popupHtml,
    function: () => {
      const goDashBoard = () => {
        location.href = "https://www.sellerbot.co.kr/";
      };

      document
        .querySelector("#modal_free #modalConfirm")
        .addEventListener("click", goDashBoard);
    },
  });
}

document.querySelector("#skipStep").addEventListener("click", () => {
  if (searchParam("subscribe") == "테라봇") {
    freeTicketPopup();
  }
});
